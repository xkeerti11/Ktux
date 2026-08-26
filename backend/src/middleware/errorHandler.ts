import type { ErrorRequestHandler, RequestHandler } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly fields?: Record<string, string[]>;

  constructor(statusCode: number, code: string, message: string, fields?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.fields = fields;
  }
}

export const asyncHandler = (handler: RequestHandler): RequestHandler => {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
};

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new ApiError(404, 'NOT_FOUND', 'Resource not found'));
};

function fieldsFromZod(error: z.ZodError): Record<string, string[]> {
  const fields: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'request';
    fields[key] ??= [];
    fields[key].push(issue.message);
  }
  return fields;
}

function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (error instanceof z.ZodError) return new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', fieldsFromZod(error));
  if (error instanceof mongoose.Error.ValidationError) {
    const fields: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(error.errors)) fields[key] = [value.message];
    return new ApiError(400, 'VALIDATION_ERROR', 'Validation failed', fields);
  }
  if (error instanceof mongoose.Error.CastError) return new ApiError(400, 'INVALID_ID', 'Invalid resource identifier');
  if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
    return new ApiError(409, 'CONFLICT', 'A resource with those values already exists');
  }
  if (error && typeof error === 'object' && ('type' in error && (error as { type: string }).type === 'entity.too.large' || 'status' in error && (error as { status: number }).status === 413)) {
    return new ApiError(413, 'PAYLOAD_TOO_LARGE', 'Payload size exceeds the allowable limit');
  }
  if (error instanceof jwt.TokenExpiredError) return new ApiError(401, 'TOKEN_EXPIRED', 'Authentication token expired');
  if (error instanceof jwt.JsonWebTokenError) return new ApiError(401, 'TOKEN_INVALID', 'Invalid authentication token');
  if (error instanceof SyntaxError || (error && typeof error === 'object' && 'type' in error && (error as { type: string }).type === 'entity.parse.failed')) {
    return new ApiError(400, 'INVALID_JSON', 'Invalid JSON request body');
  }
  return new ApiError(500, 'INTERNAL_ERROR', 'An unexpected error occurred');
}

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const appError = normalizeError(error);
  if (appError.statusCode >= 500) {
    const detail = error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : error;
    logger.error('Unhandled request error', { requestId: req.requestId, error: detail });
  } else {
    logger.warn('Request failed', {
      requestId: req.requestId,
      code: appError.code,
      statusCode: appError.statusCode
    });
  }

  res.status(appError.statusCode).json({
    success: false,
    error: {
      code: appError.code,
      message: appError.message,
      ...(appError.fields ? { fields: appError.fields } : {}),
      requestId: req.requestId
    }
  });
};
