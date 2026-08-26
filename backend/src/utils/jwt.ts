import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AccessTokenPayload extends jwt.JwtPayload {
  sub: string;
  email: string;
  role: 'admin';
  name?: string;
  type: 'access';
}

export interface RefreshTokenPayload extends jwt.JwtPayload {
  sub: string;
  jti: string;
  type: 'refresh';
}

const algorithm: jwt.Algorithm = 'HS256';

export function createJti(): string {
  return crypto.randomUUID();
}

export function generateAccessToken(user: { id: string; email: string; role: 'admin'; name?: string }): string {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role, ...(user.name ? { name: user.name } : {}), type: 'access' },
    env.JWT_ACCESS_SECRET,
    { algorithm, expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );
}

export function generateRefreshToken(userId: string, jti = createJti()): string {
  return jwt.sign(
    { sub: userId, jti, type: 'refresh' },
    env.JWT_REFRESH_SECRET,
    { algorithm, expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET, { algorithms: [algorithm] });
    if (typeof payload === 'string' || payload.type !== 'access' || !payload.sub || !payload.email || payload.role !== 'admin') return null;
    return payload as AccessTokenPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET, { algorithms: [algorithm] });
    if (typeof payload === 'string' || payload.type !== 'refresh' || !payload.sub || !payload.jti) return null;
    return payload as RefreshTokenPayload;
  } catch {
    return null;
  }
}

export function extractBearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const match = /^Bearer\s+([^\s]+)$/i.exec(header.trim());
  return match?.[1] ?? null;
}

export const extractTokenFromHeader = extractBearerToken;
export const getBearerToken = extractBearerToken;
