import { describe, expect, it } from 'vitest';
import request from 'supertest';
import express from 'express';
import { createApp } from '../src/app';
import { createLeadSchema } from '../src/modules/leads/leads.schemas';
import { subscribeSchema } from '../src/modules/newsletter/newsletter.schemas';
import { chatSchema, estimateQuerySchema } from '../src/modules/ai/ai.schemas';
import { blogPostSchema, caseStudySchema } from '../src/modules/content/content.schemas';
import { registerSchema } from '../src/modules/auth/auth.schemas';
import { uploadSignatureSchema } from '../src/modules/media/media.schemas';
import { errorHandler, ApiError } from '../src/middleware/errorHandler';

describe('Validation & Error Handling Suite', () => {
  describe('Schema Validation', () => {
    it('validates lead creation input', () => {
      // Valid
      const valid = createLeadSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        service: 'Web Development',
        message: 'Looking for a redesign',
        budget: '$5,000 - $10,000'
      });
      expect(valid.success).toBe(true);

      // Invalid email
      const invalidEmail = createLeadSchema.safeParse({
        name: 'John',
        email: 'not-an-email',
        service: 'Web Development'
      });
      expect(invalidEmail.success).toBe(false);

      // Missing required name
      const missingName = createLeadSchema.safeParse({
        email: 'john@example.com',
        service: 'Web Development'
      });
      expect(missingName.success).toBe(false);
    });

    it('validates newsletter subscription schema requiring explicit consent', () => {
      expect(subscribeSchema.safeParse({ email: 'valid@subscriber.com', consent: true }).success).toBe(true);
      expect(subscribeSchema.safeParse({ email: 'valid@subscriber.com', consent: false }).success).toBe(false);
      expect(subscribeSchema.safeParse({ email: '' }).success).toBe(false);
      expect(subscribeSchema.safeParse({ email: 'bad-email', consent: true }).success).toBe(false);
      expect(subscribeSchema.safeParse({}).success).toBe(false);
    });

    it('validates AI chat input and length constraints', () => {
      expect(chatSchema.safeParse({ message: 'Hello AI', history: [] }).success).toBe(true);
      expect(chatSchema.safeParse({ message: '' }).success).toBe(false);
      expect(chatSchema.safeParse({ message: 'a'.repeat(5000) }).success).toBe(false);
    });

    it('validates AI estimate query parameters', () => {
      const valid = estimateQuerySchema.safeParse({
        pages: '5',
        ecommerce: 'true',
        aiFeatures: 'false'
      });
      expect(valid.success).toBe(true);
      if (valid.success) {
        expect(valid.data.pages).toBe(5);
        expect(valid.data.ecommerce).toBe(true);
      }
    });

    it('validates blog post schema', () => {
      const valid = blogPostSchema.safeParse({
        title: 'Top Marketing Strategies in 2026',
        slug: 'top-marketing-strategies-2026',
        excerpt: 'An overview of digital marketing strategies in 2026.',
        content: '# Content here with details',
        category: 'Marketing',
        tags: ['seo', 'growth']
      });
      expect(valid.success).toBe(true);

      const invalidSlug = blogPostSchema.safeParse({
        title: 'Title',
        slug: 'Invalid Slug With Spaces!',
        excerpt: 'Excerpt',
        content: 'Content',
        category: 'Marketing'
      });
      expect(invalidSlug.success).toBe(false);
    });

    it('validates case study schema', () => {
      const valid = caseStudySchema.safeParse({
        title: 'Scaling an Ecommerce Brand 300%',
        slug: 'scaling-ecommerce-brand',
        industryTag: 'Ecommerce',
        overview: 'Overview details',
        challenge: 'Low conversion rate',
        solution: 'Custom React & Node.js checkout flow',
        results: [{ label: 'Revenue Growth', value: '+300%' }]
      });
      expect(valid.success).toBe(true);
    });

    it('validates auth registration schema', () => {
      const valid = registerSchema.safeParse({
        name: 'New Admin',
        email: 'admin@ktux.com',
        password: 'ValidPassword123!'
      });
      expect(valid.success).toBe(true);

      const weakPassword = registerSchema.safeParse({
        name: 'New Admin',
        email: 'admin@ktux.com',
        password: '123'
      });
      expect(weakPassword.success).toBe(false);
    });

    it('validates media upload signature schema', () => {
      expect(uploadSignatureSchema.safeParse({ folder: 'blog', resourceType: 'image' }).success).toBe(true);
      expect(uploadSignatureSchema.safeParse({ folder: 'invalid folder with spaces!', resourceType: 'image' }).success).toBe(false);
      expect(uploadSignatureSchema.safeParse({ folder: 'blog', resourceType: 'unsupported' as any }).success).toBe(false);
    });
  });

  describe('Error Handling & Information Leakage Prevention', () => {
    it('returns a clean 404 error shape for non-existent root routes', async () => {
      const app = createApp();
      const res = await request(app).get('/unknown-resource-path');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Resource not found',
          requestId: expect.any(String)
        }
      });
    });

    it('masks internal server errors without leaking stack traces to the client', async () => {
      const app = express();
      app.use((_req, _res, next) => {
        // Trigger an unexpected system exception
        next(new Error('DATABASE_CONNECTION_FAILED: password=supersecret at /var/www/internal/db.ts:42'));
      });
      app.use(errorHandler);

      const res = await request(app).get('/crash');
      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('INTERNAL_ERROR');
      expect(res.body.error.message).toBe('An unexpected error occurred');
      expect(res.body.error).not.toHaveProperty('stack');
      expect(JSON.stringify(res.body)).not.toContain('supersecret');
      expect(JSON.stringify(res.body)).not.toContain('/var/www');
    });

    it('formats custom ApiError with correct HTTP status codes', async () => {
      const app = express();
      app.get('/custom-error', (_req, _res, next) => {
        next(new ApiError(402, 'PAYMENT_REQUIRED', 'Subscription required'));
      });
      app.use(errorHandler);

      const res = await request(app).get('/custom-error');
      expect(res.status).toBe(402);
      expect(res.body.error.code).toBe('PAYMENT_REQUIRED');
      expect(res.body.error.message).toBe('Subscription required');
    });
  });
});
