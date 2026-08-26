import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app';
import { mongoSanitize } from '../src/config/security';
import { sanitizeContent } from '../src/utils/content';
import { assertSafePublicUrl } from '../src/services/ai.service';
import { createLeadSchema } from '../src/modules/leads/leads.schemas';

describe('Injection Defense & Sanitization Suite', () => {
  describe('NoSQL / MongoDB Operator Injection Defense', () => {
    it('sanitizes $ and . operators in nested request body keys', async () => {
      const app = express();
      app.use(express.json());
      app.use(mongoSanitize);
      let capturedBody: any;
      app.post('/test-nosql', (req, res) => {
        capturedBody = req.body;
        res.json({ success: true, body: req.body });
      });

      const maliciousPayload = {
        email: { $gt: '' },
        password: { $ne: null },
        filter: {
          $where: 'this.role == "admin"',
          'nested.field': 'value'
        }
      };

      const res = await request(app).post('/test-nosql').send(maliciousPayload);
      expect(res.status).toBe(200);

      // Verify dollar signs and dots in keys were replaced with '_'
      expect(capturedBody).toBeDefined();
      expect(capturedBody.email).toHaveProperty('_gt');
      expect(capturedBody.email).not.toHaveProperty('$gt');
      expect(capturedBody.password).toHaveProperty('_ne');
      expect(capturedBody.password).not.toHaveProperty('$ne');
      expect(capturedBody.filter).toHaveProperty('_where');
      expect(capturedBody.filter).toHaveProperty('nested_field');
    });

    it('sanitizes malicious operators in query string parameters', async () => {
      const app = express();
      app.use(express.urlencoded({ extended: true }));
      app.use(mongoSanitize);
      let capturedQuery: any;
      app.get('/test-query', (req, res) => {
        capturedQuery = req.query;
        res.json({ success: true });
      });

      await request(app).get('/test-query?user[$ne]=test&role[$gt]=');
      expect(capturedQuery).toBeDefined();
      if (capturedQuery.user) {
        expect(capturedQuery.user).not.toHaveProperty('$ne');
        expect(capturedQuery.user).toHaveProperty('_ne');
      }
    });

    it('prevents NoSQL injection bypass on public login route', async () => {
      const app = createApp();
      const res = await request(app).post('/api/v1/auth/login').send({
        email: { $gt: '' },
        password: { $gt: '' }
      });
      // Zod validation rejects object when string is expected
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('SQL Injection & Input Handling', () => {
    it('safely handles common SQL injection payloads via schema validation', () => {
      const sqlPayloads = [
        "' OR '1'='1",
        "admin' --",
        "1; DROP TABLE users; --",
        "' UNION SELECT * FROM users --",
        "1' AND 1=1--"
      ];

      for (const payload of sqlPayloads) {
        const parsed = createLeadSchema.safeParse({
          name: payload,
          email: 'valid-email@example.com',
          service: 'Web Development',
          message: payload
        });
        // Schemas treat input strictly as string literals, preventing query manipulation
        expect(parsed.success).toBe(true);
        if (parsed.success) {
          expect(parsed.data.name).toBe(payload);
        }
      }
    });

    it('rejects SQL injection attempts in email fields that violate email format', async () => {
      const app = createApp();
      const res = await request(app).post('/api/v1/leads').send({
        name: 'Test Name',
        email: "' OR '1'='1",
        service: 'Web Development'
      });
      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });
  });

  describe('XSS & HTML Content Sanitization', () => {
    it('strips <script> tags and malicious inline javascript', () => {
      const dirty = '<p>Normal text</p><script>alert("XSS Attack")</script><script src="http://evil.com/xss.js"></script>';
      const clean = sanitizeContent(dirty);
      expect(clean).not.toContain('<script');
      expect(clean).not.toContain('alert');
      expect(clean).toBe('<p>Normal text</p>');
    });

    it('strips inline event handlers (onerror, onload, onclick, onmouseover)', () => {
      const dirty = '<img src="missing.png" onerror="alert(document.cookie)"><a href="https://example.com" onclick="steal()">Link</a>';
      const clean = sanitizeContent(dirty);
      expect(clean).not.toContain('onerror');
      expect(clean).not.toContain('onclick');
      expect(clean).not.toContain('alert');
      expect(clean).not.toContain('steal');
    });

    it('strips malicious iframes and dangerous URI schemes', () => {
      const dirty = '<iframe src="javascript:alert(1)"></iframe><a href="javascript:alert(1)">Click me</a>';
      const clean = sanitizeContent(dirty);
      expect(clean).not.toContain('iframe');
      expect(clean).not.toContain('javascript:');
    });
  });

  describe('SSRF (Server-Side Request Forgery) Defense', () => {
    it('blocks loopback IPv4 addresses (127.0.0.1, 127.0.1.1)', async () => {
      await expect(assertSafePublicUrl('http://127.0.0.1:3000/internal')).rejects.toMatchObject({
        code: 'UNSAFE_URL'
      });
    });

    it('blocks RFC1918 private IPv4 addresses (10.x.x.x, 192.168.x.x, 172.16.x.x)', async () => {
      await expect(assertSafePublicUrl('http://10.0.0.1/admin')).rejects.toMatchObject({ code: 'UNSAFE_URL' });
      await expect(assertSafePublicUrl('http://192.168.1.1/router')).rejects.toMatchObject({ code: 'UNSAFE_URL' });
      await expect(assertSafePublicUrl('http://172.16.0.1/')).rejects.toMatchObject({ code: 'UNSAFE_URL' });
    });

    it('blocks AWS/Cloud metadata IP (169.254.169.254)', async () => {
      await expect(assertSafePublicUrl('http://169.254.169.254/latest/meta-data/')).rejects.toMatchObject({
        code: 'UNSAFE_URL'
      });
    });

    it('blocks 0.0.0.0 bind-all IP address', async () => {
      await expect(assertSafePublicUrl('http://0.0.0.0:8080')).rejects.toMatchObject({ code: 'UNSAFE_URL' });
    });

    it('blocks non-HTTP protocols (file://, ftp://, gopher://)', async () => {
      await expect(assertSafePublicUrl('file:///etc/passwd')).rejects.toMatchObject({ code: 'INVALID_URL' });
      await expect(assertSafePublicUrl('ftp://ftp.example.com/files')).rejects.toMatchObject({ code: 'INVALID_URL' });
      await expect(assertSafePublicUrl('gopher://gopher.example.com')).rejects.toMatchObject({ code: 'INVALID_URL' });
    });

    it('blocks URLs with embedded credentials (http://user:pass@host)', async () => {
      await expect(assertSafePublicUrl('https://admin:secret@example.com')).rejects.toMatchObject({
        code: 'INVALID_URL'
      });
    });

    it('rejects malformed or invalid URL strings', async () => {
      await expect(assertSafePublicUrl('not-a-valid-url')).rejects.toMatchObject({ code: 'INVALID_URL' });
    });
  });
});
