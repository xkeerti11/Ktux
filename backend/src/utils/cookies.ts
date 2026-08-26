import type { Response } from 'express';
import { env } from '../config/env';

export const REFRESH_COOKIE = 'ktux_refresh';

export function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SECURE ? 'strict' : 'lax',
    domain: env.COOKIE_DOMAIN || undefined,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth'
  });
}

export function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SECURE ? 'strict' : 'lax',
    domain: env.COOKIE_DOMAIN || undefined,
    path: '/api/v1/auth'
  });
}
