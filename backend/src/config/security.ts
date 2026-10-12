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

export function isAllowedOrigin(origin?: string): boolean {
  if (!origin) return true;
  const cleanOrigin = origin.trim().replace(/\/$/, '');

  // 1. Explicitly configured origins from env (CORS_ORIGINS and CLIENT_URL)
  if (corsOrigins.some((allowed) => allowed.replace(/\/$/, '').toLowerCase() === cleanOrigin.toLowerCase())) {
    return true;
  }
  if (env.CLIENT_URL && env.CLIENT_URL.replace(/\/$/, '').toLowerCase() === cleanOrigin.toLowerCase()) {
    return true;
  }

  // 2. Production domains: ktux.me and all subdomains (www.ktux.me, etc.)
  if (/^https?:\/\/([a-z0-9-]+\.)*ktux\.me(:\d+)?$/i.test(cleanOrigin)) {
    return true;
  }

  // 3. Render / Netlify / Vercel hosting domains
  if (/^https?:\/\/([a-z0-9-]+\.)*(onrender\.com|netlify\.app|vercel\.app)(:\d+)?$/i.test(cleanOrigin)) {
    return true;
  }

  // 4. Local development / test origins
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(cleanOrigin)) {
    return true;
  }

  return false;
}

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) return callback(null, true);
    logger.warn('CORS request rejected for origin', { origin });
    return callback(new ApiError(403, 'CORS_ORIGIN_NOT_ALLOWED', 'Origin is not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'content-type',
    'Authorization',
    'authorization',
    'X-Request-Id',
    'x-request-id',
    'Idempotency-Key',
    'idempotency-key',
    'X-CSRF-Token',
    'x-csrf-token',
    'X-Zapier-Webhook-Secret',
    'Accept',
    'accept',
    'X-Requested-With',
    'x-requested-with',
    'sentry-trace',
    'baggage'
  ],
  exposedHeaders: ['X-Request-Id', 'X-CSRF-Token'],
  maxAge: 86400,
  optionsSuccessStatus: 204
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
  if (env.TRUST_PROXY || env.NODE_ENV === 'production' || process.env.RENDER) {
    app.set('trust proxy', 1);
  }
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
