import crypto from 'node:crypto';
import type { RequestHandler, Response } from 'express';
import { env } from '../config/env';
import { AppError } from '../utils/errors';
import { safeCompare } from '../utils/auth';
import { REFRESH_COOKIE } from '../utils/cookies';

export const CSRF_COOKIE = 'ktux_csrf';

const cookieDomain = env.COOKIE_DOMAIN &&
  env.NODE_ENV === 'production' &&
  !['localhost', '.localhost'].includes(env.COOKIE_DOMAIN.toLowerCase())
  ? env.COOKIE_DOMAIN
  : undefined;

export const ensureCsrfCookie: RequestHandler = (req, res, next) => {
  if (!req.cookies?.[CSRF_COOKIE]) {
    res.cookie(CSRF_COOKIE, crypto.randomBytes(32).toString('hex'), {
      httpOnly: false,
      secure: env.COOKIE_SECURE,
      sameSite: env.COOKIE_SECURE ? 'strict' : 'lax',
      domain: cookieDomain,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/v1'
    });
  }
  next();
};

export function csrfToken(res: Response, token: string): void {
  res.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SECURE ? 'strict' : 'lax',
    domain: cookieDomain,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/v1'
  });
}

export const requireCsrf: RequestHandler = (req, _res, next) => {
  const cookieToken = req.cookies?.[CSRF_COOKIE] as string | undefined;
  const headerToken = req.header('x-csrf-token');
  if (!cookieToken || !headerToken || !safeCompare(cookieToken, headerToken)) {
    return next(new AppError(403, 'CSRF_TOKEN_INVALID', 'CSRF token missing or invalid'));
  }
  next();
};
