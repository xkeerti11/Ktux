import request from 'supertest';
import express from 'express';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';
import { globalLimiter, authLimiter, formLimiter, aiRateLimiter } from '../src/middleware/limiter';

describe('Rate Limiting Suite', () => {
  it('includes standard rate limit headers on throttled routes', async () => {
    const app = express();
    app.use(express.json());
    app.use('/test-rate', globalLimiter, (_req, res) => res.json({ ok: true }));

    const response = await request(app).get('/test-rate');
    expect(response.status).toBe(200);
    const hasRateLimitHeader = Boolean(
      response.headers['ratelimit'] ||
      response.headers['ratelimit-policy'] ||
      response.headers['ratelimit-limit']
    );
    expect(hasRateLimitHeader).toBe(true);
  });

  it('enforces auth rate limiting after exceeding threshold', async () => {
    const app = express();
    app.use(express.json());
    app.post('/login-test', authLimiter, (_req, res) => {
      res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid' } });
    });

    const testEmail = 'ratelimit-target@example.com';
    let lastResponse: request.Response | undefined;

    // authLimiter limit is 10
    for (let i = 0; i < 11; i++) {
      lastResponse = await request(app)
        .post('/login-test')
        .send({ email: testEmail, password: 'WrongPassword123!' });
    }

    expect(lastResponse).toBeDefined();
    expect(lastResponse?.status).toBe(429);
    expect(lastResponse?.body).toEqual({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.'
      }
    });
  });

  it('enforces form rate limiting on public submissions', async () => {
    const app = express();
    app.use(express.json());
    app.post('/form-test', formLimiter, (_req, res) => res.status(201).json({ success: true }));

    let lastResponse: request.Response | undefined;

    // formLimiter limit is 5
    for (let i = 0; i < 6; i++) {
      lastResponse = await request(app)
        .post('/form-test')
        .send({ name: 'Lead Test', email: 'test@example.com' });
    }

    expect(lastResponse?.status).toBe(429);
    expect(lastResponse?.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('enforces AI endpoint rate limits', async () => {
    const app = express();
    app.use(express.json());
    app.post('/ai-test', aiRateLimiter, (_req, res) => res.json({ success: true }));

    let lastResponse: request.Response | undefined;

    // aiRateLimiter limit is 10
    for (let i = 0; i < 11; i++) {
      lastResponse = await request(app).post('/ai-test').send({ message: 'Hello AI' });
    }

    expect(lastResponse?.status).toBe(429);
    expect(lastResponse?.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('never throttles /health or /ready healthcheck endpoints', async () => {
    const app = createApp();
    const requests = Array.from({ length: 50 }, () => request(app).get('/health'));
    const responses = await Promise.all(requests);
    expect(responses.every((res) => res.status === 200)).toBe(true);
  });
});
