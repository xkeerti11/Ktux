import express, { type Express, type RequestHandler } from 'express';
import helmet from 'helmet';
import cors, { type CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoSanitizePackage from 'express-mongo-sanitize';
import { env, corsOrigins } from './env';
import { logger } from '../utils/logger';
import { ApiError } from '../middleware/errorHandler';
import { ensureCsrfCookie } from '../middleware/csrf';
import { globalLimiter } from '../middleware/limiter';

export const helmetConfig: Parameters<typeof helmet>[0] = {
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
};

const allowedOrigins = env.NODE_ENV === 'development' || env.NODE_ENV === 'test'
  ? ['http://localhost:5173']
  : corsOrigins;

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new ApiError(403, 'CORS_ORIGIN_NOT_ALLOWED', 'Origin is not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Request-Id',
    'Idempotency-Key',
    'X-CSRF-Token',
    'X-Zapier-Webhook-Secret'
  ]
};

export const mongoSanitizeConfig = {
  replaceWith: '_',
  onSanitize: ({ key }: { key: string }) => logger.warn('Mongo operator sanitized', { key })
};

// Express 5 exposes `req.query` as a read-only getter. The package's default
// middleware reassigns that property, so use its sanitizer in-place instead.
export const mongoSanitize: RequestHandler = (req, _res, next) => {
  for (const key of ['body', 'params', 'headers', 'query'] as const) {
    const target = req[key] as Record<string, unknown> | undefined;
    if (!target) continue;
    const wasSanitized = mongoSanitizePackage.has(target, false);
    mongoSanitizePackage.sanitize(target, mongoSanitizeConfig);
    if (wasSanitized) mongoSanitizeConfig.onSanitize({ key });
  }
  next();
};
export const morganConfig = env.NODE_ENV === 'production' ? 'combined' : 'dev';

export const requestLogger: RequestHandler = (req, res, next) => {
  const startedAt = process.hrtime.bigint();
  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    logger.info('HTTP request', {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      ip: req.ip
    });
  });
  next();
};

export const customSecurityHeaders: RequestHandler = (_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  if (env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
};

export function configureSecurity(app: Express): void {
  if (env.TRUST_PROXY) app.set('trust proxy', 1);
  app.use(helmet(helmetConfig));
  app.use(cors(corsConfig));
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));
  app.use(cookieParser());
  app.use(ensureCsrfCookie);
  app.use(mongoSanitize);
  app.use(morgan(morganConfig, { stream: { write: (message) => logger.info('Morgan request', { request: message.trim() }) } }));
  app.use(requestLogger);
  app.use(customSecurityHeaders);
  app.use('/api', globalLimiter);
  logger.info('Security middleware configured');
}
