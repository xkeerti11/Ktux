import type { Response } from 'express';
import { env } from '../config/env';

export const REFRESH_COOKIE = 'ktux_refresh';

export function setRefreshCookie(res: Response, token: string): void {
  const isSecure = env.COOKIE_SECURE || env.NODE_ENV === 'production';
  const sameSitePolicy = isSecure ? (env.COOKIE_DOMAIN ? 'strict' : 'none') : 'lax';
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: sameSitePolicy,
    domain: env.COOKIE_DOMAIN || undefined,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth'
  });
}

export function clearRefreshCookie(res: Response): void {
  const isSecure = env.COOKIE_SECURE || env.NODE_ENV === 'production';
  const sameSitePolicy = isSecure ? (env.COOKIE_DOMAIN ? 'strict' : 'none') : 'lax';
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: isSecure,
    sameSite: sameSitePolicy,
    domain: env.COOKIE_DOMAIN || undefined,
    path: '/api/v1/auth'
  });
}
