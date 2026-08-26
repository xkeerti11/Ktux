import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';
import { generateAccessToken } from '../src/utils/jwt';
import jwt from 'jsonwebtoken';
import { env } from '../src/config/env';

const app = createApp();

const adminToken = generateAccessToken({
  id: '507f1f77bcf86cd799439011',
  email: 'admin@ktux.com',
  role: 'admin'
});

// A signed token with non-admin role to verify system rejects non-admin identities
const nonAdminToken = jwt.sign(
  { sub: '507f1f77bcf86cd799439022', email: 'user@ktux.com', role: 'user', type: 'access' },
  env.JWT_ACCESS_SECRET,
  { algorithm: 'HS256', expiresIn: '15m' }
);

describe('Admin & Role-Based Access Control (RBAC) Suite', () => {
  describe('Unauthenticated Access Control (401 Unauthorized)', () => {
    it('blocks unauthenticated access to GET /api/v1/leads', async () => {
      const res = await request(app).get('/api/v1/leads');
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('blocks unauthenticated access to GET /api/v1/consultations', async () => {
      const res = await request(app).get('/api/v1/consultations');
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('blocks unauthenticated access to POST /api/v1/blog/posts', async () => {
      const res = await request(app).post('/api/v1/blog/posts').send({ title: 'Test' });
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('blocks unauthenticated access to POST /api/v1/case-studies', async () => {
      const res = await request(app).post('/api/v1/case-studies').send({ title: 'Test' });
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('blocks unauthenticated access to GET /api/v1/analytics/summary', async () => {
      const res = await request(app).get('/api/v1/analytics/summary');
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('blocks unauthenticated access to POST /api/v1/media/presign', async () => {
      const res = await request(app).post('/api/v1/media/presign').send({ folder: 'uploads', resourceType: 'image' });
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('blocks unauthenticated access to POST /api/v1/auth/register', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: 'New Admin',
        email: 'newadmin@ktux.com',
        password: 'ValidPassword123!'
      });
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });

    it('blocks unauthenticated access to GET /api/v1/auth/me', async () => {
      const res = await request(app).get('/api/v1/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('UNAUTHORIZED');
    });
  });

  describe('Non-Admin Access Rejection', () => {
    it('strictly rejects non-admin role tokens from accessing GET /api/v1/leads', async () => {
      const res = await request(app)
        .get('/api/v1/leads')
        .set('Authorization', `Bearer ${nonAdminToken}`);
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('TOKEN_INVALID');
    });

    it('strictly rejects non-admin role tokens from creating blog posts', async () => {
      const res = await request(app)
        .post('/api/v1/blog/posts')
        .set('Authorization', `Bearer ${nonAdminToken}`)
        .send({
          title: 'Unauthorized Post',
          slug: 'unauthorized-post',
          content: 'Test content',
          excerpt: 'Short excerpt',
          category: 'Strategy'
        });
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('TOKEN_INVALID');
    });

    it('strictly rejects non-admin role tokens from accessing consultations', async () => {
      const res = await request(app)
        .get('/api/v1/consultations')
        .set('Authorization', `Bearer ${nonAdminToken}`);
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('TOKEN_INVALID');
    });

    it('strictly rejects non-admin role tokens from accessing analytics', async () => {
      const res = await request(app)
        .get('/api/v1/analytics/summary')
        .set('Authorization', `Bearer ${nonAdminToken}`);
      expect(res.status).toBe(401);
      expect(res.body.error.code).toBe('TOKEN_INVALID');
    });
  });

  describe('Admin Authorized Access (Allowed)', () => {
    it('permits admin user to access GET /api/v1/auth/me', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
      expect(res.body.data.user.role).toBe('admin');
      expect(res.body.data.user.email).toBe('admin@ktux.com');
    });

    it('permits admin to call POST /api/v1/media/presign with valid signature generation', async () => {
      const res = await request(app)
        .post('/api/v1/media/presign')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ folder: 'uploads', resourceType: 'image' });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('permits admin to reach POST /api/v1/blog/posts and validates request body', async () => {
      // With admin token, route is reached; missing required fields produces 400 VALIDATION_ERROR instead of 401/403
      const res = await request(app)
        .post('/api/v1/blog/posts')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
