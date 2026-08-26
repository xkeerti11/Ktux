import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';
import { assertSafePublicUrl } from '../src/services/ai.service';
import { sanitizeContent } from '../src/utils/content';
import { extractBearerToken, generateAccessToken, verifyAccessToken } from '../src/utils/jwt';
import { comparePassword, hashPassword, validatePasswordStrength } from '../src/utils/password';

const app = createApp();

describe('Security & Protection Suite', () => {
  it('removes executable content and scripts from CMS text', () => {
    expect(sanitizeContent('<p>Hello</p><script>alert(1)</script><img onerror="alert(1)">')).toBe('<p>Hello</p><img>');
  });

  it('blocks local audit targets (SSRF protection)', async () => {
    await expect(assertSafePublicUrl('http://127.0.0.1:8080/admin')).rejects.toMatchObject({ code: 'UNSAFE_URL' });
  });

  it('blocks unsupported audit protocols', async () => {
    await expect(assertSafePublicUrl('file:///etc/passwd')).rejects.toMatchObject({ code: 'INVALID_URL' });
  });

  it('sets helmet and custom security headers', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(response.headers['permissions-policy']).toContain('geolocation=()');
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('rejects an unauthorized CORS origin with 403 Forbidden', async () => {
    const response = await request(app).get('/health').set('Origin', 'https://evil.example');
    expect(response.status).toBe(403);
    expect(response.body.error.code).toBe('CORS_ORIGIN_NOT_ALLOWED');
  });

  it('allows authorized CORS origin with credentials header', async () => {
    const response = await request(app).get('/health').set('Origin', 'http://localhost:5173');
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('enforces the password policy and bcrypt hashing', async () => {
    expect(validatePasswordStrength('weak').isStrong).toBe(false);
    const password = 'StrongPassword!123';
    expect(validatePasswordStrength(password).isStrong).toBe(true);
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
    await expect(comparePassword(password, hash)).resolves.toBe(true);
    await expect(comparePassword('wrong-password', hash)).resolves.toBe(false);
  });

  it('uses an explicit HS256 JWT and rejects invalid tokens', () => {
    const token = generateAccessToken({ id: '507f1f77bcf86cd799439011', email: 'admin@example.com', role: 'admin' });
    expect(JSON.parse(Buffer.from(token.split('.')[0], 'base64url').toString()).alg).toBe('HS256');
    expect(verifyAccessToken(token)?.email).toBe('admin@example.com');
    expect(verifyAccessToken(`${token}tampered`)).toBeNull();
    expect(extractBearerToken(`Bearer ${token}`)).toBe(token);
    expect(extractBearerToken('Basic abc')).toBeNull();
  });

  it('rejects request body exceeding 100kb limit', async () => {
    const hugePayload = {
      name: 'Tester',
      email: 'tester@example.com',
      service: 'Web Development',
      message: 'x'.repeat(150 * 1024) // 150kb
    };
    const response = await request(app).post('/api/v1/leads').send(hugePayload);
    // Express json middleware rejects oversized payloads
    expect([400, 413]).toContain(response.status);
  });

  it('keeps health unthrottled under high request volume', async () => {
    const responses = await Promise.all(Array.from({ length: 50 }, () => request(app).get('/health')));
    expect(responses.every((response) => response.status === 200)).toBe(true);
  });
});
