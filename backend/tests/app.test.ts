import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';

const app = createApp();

describe('platform endpoints', () => {
  it('returns a fast health response without requiring MongoDB', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
    expect(response.headers['x-request-id']).toBeTruthy();
  });

  it('reports not ready when MongoDB is unavailable', async () => {
    const response = await request(app).get('/ready');
    expect(response.status).toBe(503);
    expect(response.body.status).toBe('not_ready');
  });

  it('rejects invalid login input with the standard error shape', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({ email: 'not-an-email', password: '' });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects invalid public lead input before touching the database', async () => {
    const response = await request(app).post('/api/v1/leads').send({ email: 'not-an-email' });
    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('coerces validated estimate query parameters', async () => {
    const response = await request(app).get('/api/v1/ai/estimate?pages=10&ecommerce=true&aiFeatures=false');
    expect(response.status).toBe(200);
    expect(response.body.data.assumptions).toEqual({ pages: 10, ecommerce: true, aiFeatures: false });
  });

  it('requires the double-submit CSRF token for cookie-authenticated logout', async () => {
    const agent = request.agent(app);
    const csrf = await agent.get('/api/v1/auth/csrf');
    expect(csrf.status).toBe(200);
    const rejected = await agent.post('/api/v1/auth/logout');
    expect(rejected.status).toBe(403);
    const accepted = await agent.post('/api/v1/auth/logout').set('x-csrf-token', csrf.body.data.csrfToken);
    expect(accepted.status).toBe(204);
  });
});
