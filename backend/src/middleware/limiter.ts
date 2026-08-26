import rateLimit from 'express-rate-limit';
import { ipKeyGenerator } from 'express-rate-limit';
import type { Request, Response } from 'express';

const rateLimitError = {
  success: false,
  error: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests. Please try again later.'
  }
} as const;

const rateLimitHandler = (_req: Request, res: Response) => {
  res.status(429).json(rateLimitError);
};

const clientIpKey = (req: { ip?: string }) => `ip:${ipKeyGenerator(req.ip ?? '0.0.0.0')}`;

export const globalLimiter = rateLimit({
  windowMs: 60_000,
  limit: 100,
  skip: (req) => ['/health', '/ready'].includes(req.originalUrl.split('?')[0]),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const authLimiter = rateLimit({
  windowMs: 60_000,
  limit: 10,
  keyGenerator: (req) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    return email ? `email:${email}` : clientIpKey(req);
  },
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const formLimiter = rateLimit({
  windowMs: 60 * 60_000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const publicLimiter = rateLimit({
  windowMs: 60 * 60_000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 60_000,
  limit: 1000,
  keyGenerator: (req) => req.auth?.id ? `user:${req.auth.id}` : clientIpKey(req),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler
});

export const aiRateLimiter = rateLimit({
  windowMs: 60_000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: rateLimitHandler
});
