import type { RequestHandler } from 'express';
import { extractBearerToken, verifyAccessToken } from '../utils/jwt';
import { ApiError } from './errorHandler';

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = extractBearerToken(req.header('authorization'));
  if (!token) return next(new ApiError(401, 'UNAUTHORIZED', 'Authentication required'));
  const payload = verifyAccessToken(token);
  if (!payload) return next(new ApiError(401, 'TOKEN_INVALID', 'Invalid authentication token'));
  req.auth = { id: payload.sub, email: payload.email, role: payload.role, ...(payload.name ? { name: payload.name } : {}) };
  next();
};

export function requireRole(roles: string[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.auth) return next(new ApiError(401, 'UNAUTHORIZED', 'Authentication required'));
    if (!roles.includes(req.auth.role)) return next(new ApiError(403, 'FORBIDDEN', 'Insufficient permissions'));
    next();
  };
}

export const requireAdmin: RequestHandler = requireRole(['admin']);
