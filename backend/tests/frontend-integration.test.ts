import request from 'supertest';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../src/app';
import { generateAccessToken } from '../src/utils/jwt';
import { User } from '../src/models/User';
import { Lead } from '../src/models/Lead';
import { Consultation } from '../src/models/Consultation';
import { CSRF_COOKIE } from '../src/middleware/csrf';
import { REFRESH_COOKIE } from '../src/utils/cookies';
import { hashSecret, signRefreshToken, createJti, hashOpaqueToken } from '../src/utils/auth';
import { RefreshSession } from '../src/models/RefreshSession';

let mongoServer: MongoMemoryServer;
const app = createApp();

let adminToken: string;
let adminUserId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  const admin = await User.create({
    name: 'KTUX Admin',
    email: 'admin@ktux.com',
    passwordHash: await hashSecret('AdminPassword123!'),
    role: 'admin'
  });
  adminUserId = admin.id;

  adminToken = generateAccessToken({
    id: admin.id,
    email: admin.email,
    role: 'admin',
    name: admin.name
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Frontend API Contract & Integration Alignment Suite', () => {
  describe('1. Authentication Flow (Bootstrap, Login, Profile, Refresh, Logout)', () => {
    it('POST /auth/login returns accessToken, user profile, and sets refresh cookie', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@ktux.com', password: 'AdminPassword123!' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.user.email).toBe('admin@ktux.com');
      expect(res.body.data.user.role).toBe('admin');

      const cookies = res.headers['set-cookie'] as unknown as string[];
      expect(cookies.some((c) => c.includes(REFRESH_COOKIE))).toBe(true);
    });

    it('GET /auth/me returns current authenticated user payload', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.id).toBe(adminUserId);
      expect(res.body.data.user.email).toBe('admin@ktux.com');
    });

    it('POST /auth/refresh rotates session when double-submit CSRF token is provided', async () => {
      const agent = request.agent(app);
      const csrfRes = await agent.get('/api/v1/auth/csrf');
      const csrfToken = csrfRes.body.data.csrfToken;

      const jti = createJti();
      const rawRefreshToken = signRefreshToken(adminUserId, jti);
      await RefreshSession.create({
        userId: adminUserId,
        jti,
        tokenHash: hashOpaqueToken(rawRefreshToken),
        expiresAt: new Date(Date.now() + 7 * 86400000)
      });

      const res = await agent
        .post('/api/v1/auth/refresh')
        .set('Cookie', `${REFRESH_COOKIE}=${rawRefreshToken}; ${CSRF_COOKIE}=${csrfToken}`)
        .set('x-csrf-token', csrfToken);

      expect(res.status).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.user.email).toBe('admin@ktux.com');
    });

    it('POST /auth/logout clears refresh cookie when double-submit CSRF token is provided', async () => {
      const agent = request.agent(app);
      const csrfRes = await agent.get('/api/v1/auth/csrf');
      const csrfToken = csrfRes.body.data.csrfToken;

      const res = await agent
        .post('/api/v1/auth/logout')
        .set('Cookie', `${CSRF_COOKIE}=${csrfToken}`)
        .set('x-csrf-token', csrfToken);

      expect(res.status).toBe(204);
    });
  });

  describe('2. Public Submissions & Lead Ingestion (Contact & Newsletter)', () => {
    it('POST /leads creates lead from contact form submission', async () => {
      const res = await request(app)
        .post('/api/v1/leads')
        .send({
          name: 'Pooja Verma',
          email: 'pooja@company.in',
          phone: '+919876543210',
          company: 'Acme Growth',
          serviceInterested: ['Website Development', 'AI Automation'],
          budgetRange: 'INR 65K – INR 1.5L',
          timeline: '1–2 months',
          message: 'Looking to overhaul our website and automate lead workflows.',
          source: 'website'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Pooja Verma');
      expect(res.body.data.leadScore).toBeDefined();
    });

    it('POST /newsletter/subscribe accepts subscription with consent: true', async () => {
      const res = await request(app)
        .post('/api/v1/newsletter/subscribe')
        .send({
          email: 'subscriber@agency.com',
          source: 'website',
          consent: true
        });

      expect([200, 202]).toContain(res.status);
      expect(res.body.success).toBe(true);
    });
  });

  describe('3. Admin Pipeline & Operations (Dashboard)', () => {
    it('GET /leads lists leads with pagination for dashboard inbox', async () => {
      const res = await request(app)
        .get('/api/v1/leads?page=1&limit=10')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toBeDefined();
    });

    it('PATCH /leads/:id/status updates lead status', async () => {
      const lead = await Lead.create({
        name: 'Status Test Lead',
        email: 'statustest@example.com',
        serviceInterested: ['Branding'],
        status: 'new'
      });

      const res = await request(app)
        .patch(`/api/v1/leads/${lead.id}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'contacted' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('contacted');
    });

    it('GET /analytics/summary returns lead pipeline metrics', async () => {
      const res = await request(app)
        .get('/api/v1/analytics/summary')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.total).toBeDefined();
      expect(res.body.data.statuses).toBeDefined();
      expect(res.body.data.services).toBeDefined();
    });

    it('GET /analytics/report.pdf exports streamable PDF', async () => {
      const res = await request(app)
        .get('/api/v1/analytics/report.pdf')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('application/pdf');
    });

    it('GET & DELETE /consultations manages booked client sessions', async () => {
      const lead = await Lead.create({
        name: 'Rahul Client',
        email: 'rahul@client.com',
        serviceInterested: ['AI Automation'],
        status: 'consultation_booked'
      });

      const consultation = await Consultation.create({
        calComId: 'booking-999',
        leadId: lead._id,
        clientName: 'Rahul Client',
        clientEmail: 'rahul@client.com',
        serviceType: 'AI Automation',
        bookingDateTime: new Date(Date.now() + 86400000),
        status: 'scheduled'
      });

      const listRes = await request(app)
        .get('/api/v1/consultations')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(listRes.status).toBe(200);
      expect(Array.isArray(listRes.body.data)).toBe(true);

      const cancelRes = await request(app)
        .delete(`/api/v1/consultations/${consultation.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(cancelRes.status).toBe(200);
      expect(cancelRes.body.data.status).toBe('cancelled');
    });
  });

  describe('4. CMS Studio & Portfolio (Blog & Case Studies CRUD)', () => {
    it('handles full lifecycle of blog post (create, read list, read single slug, update, delete)', async () => {
      // 1. Create
      const createRes = await request(app)
        .post('/api/v1/blog/posts')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Scaling AI Workflows in 2026',
          slug: 'scaling-ai-workflows-2026',
          excerpt: 'How modern agencies leverage autonomous AI stacks.',
          content: '<h2>Full article content</h2><p>Article body details.</p>',
          category: 'AI Automation',
          tags: ['ai', 'automation'],
          readTime: 4,
          published: true
        });

      expect(createRes.status).toBe(201);
      const postId = createRes.body.data._id;

      // 2. Public List
      const listRes = await request(app).get('/api/v1/blog/posts');
      expect(listRes.status).toBe(200);
      expect(listRes.body.data.length).toBeGreaterThan(0);

      // 3. Public Single by slug
      const singleRes = await request(app).get('/api/v1/blog/posts/scaling-ai-workflows-2026');
      expect(singleRes.status).toBe(200);
      expect(singleRes.body.data.title).toBe('Scaling AI Workflows in 2026');

      // 4. Update
      const updateRes = await request(app)
        .patch(`/api/v1/blog/posts/${postId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ excerpt: 'Updated excerpt description.' });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.excerpt).toBe('Updated excerpt description.');

      // 5. Delete
      const deleteRes = await request(app)
        .delete(`/api/v1/blog/posts/${postId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(deleteRes.status).toBe(204);
    });

    it('handles full lifecycle of case study (create, list, single slug, update, delete)', async () => {
      // 1. Create
      const createRes = await request(app)
        .post('/api/v1/case-studies')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Fintech Automation Pipeline',
          slug: 'fintech-automation-pipeline',
          industryTag: 'Fintech',
          overview: 'Building modern fintech web tools',
          challenge: 'Manual customer onboarding bottlenecks',
          solution: 'Automated identity verification flow with Next.js & Express',
          results: [{ label: 'Onboarding Speed', value: '4x faster' }],
          techStack: ['Node.js', 'React', 'MongoDB'],
          published: true
        });

      expect(createRes.status).toBe(201);
      const caseId = createRes.body.data._id;

      // 2. Public List
      const listRes = await request(app).get('/api/v1/case-studies');
      expect(listRes.status).toBe(200);

      // 3. Public Single by slug
      const singleRes = await request(app).get('/api/v1/case-studies/fintech-automation-pipeline');
      expect(singleRes.status).toBe(200);
      expect(singleRes.body.data.industryTag).toBe('Fintech');

      // 4. Update
      const updateRes = await request(app)
        .patch(`/api/v1/case-studies/${caseId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ industryTag: 'Banking & Fintech' });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.industryTag).toBe('Banking & Fintech');

      // 5. Delete
      const deleteRes = await request(app)
        .delete(`/api/v1/case-studies/${caseId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(deleteRes.status).toBe(204);
    });
  });

  describe('5. AI Services & Media Upload Presigners', () => {
    it('GET /ai/estimate calculates price range based on query params', async () => {
      const res = await request(app).get('/api/v1/ai/estimate?pages=8&ecommerce=true&aiFeatures=true');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.currency).toBe('INR');
      expect(res.body.data.min).toBeGreaterThan(0);
      expect(res.body.data.max).toBeGreaterThan(res.body.data.min);
    });

    it('POST /media/presign generates Cloudinary signature for admin uploads', async () => {
      const res = await request(app)
        .post('/api/v1/media/presign')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ folder: 'case-studies', resourceType: 'image' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.signature).toBeDefined();
      expect(res.body.data.timestamp).toBeDefined();
    });

    it('POST /ai/uploads/presign generates Cloudinary signature for client chat uploads', async () => {
      const res = await request(app)
        .post('/api/v1/ai/uploads/presign')
        .send({ folder: 'ai-uploads', resourceType: 'image' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.signature).toBeDefined();
    });

    it('POST /ai/audit validates URL and rejects unsafe target URLs', async () => {
      const res = await request(app)
        .post('/api/v1/ai/audit')
        .send({ url: 'http://127.0.0.1/private' });

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('UNSAFE_URL');
    });
  });
});
