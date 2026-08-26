import crypto from 'node:crypto';
import { ApiError } from '../middleware/errorHandler';
import {
  createJti,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken as verifyAccessTokenToken,
  verifyRefreshToken as verifyRefreshTokenToken,
  type AccessTokenPayload,
  type RefreshTokenPayload
} from './jwt';
import { comparePassword, hashPassword } from './password';

export function safeCompare(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin';
  name?: string;
}

export { AccessTokenPayload, RefreshTokenPayload };

export const hashSecret = hashPassword;
export const compareSecret = comparePassword;

export function signAccessToken(user: AuthUser): string {
  return generateAccessToken(user);
}

export function signRefreshToken(userId: string, jti: string): string {
  return generateRefreshToken(userId, jti);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const payload = verifyAccessTokenToken(token);
  if (!payload) throw new ApiError(401, 'TOKEN_INVALID', 'Invalid authentication token');
  return payload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const payload = verifyRefreshTokenToken(token);
  if (!payload) throw new ApiError(401, 'REFRESH_TOKEN_INVALID', 'Invalid refresh token');
  return payload;
}

export { createJti };

export function generateOpaqueToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashOpaqueToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}
