import 'dotenv/config';
import { z } from 'zod';

const booleanFromEnv = z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  return value.toLowerCase() === 'true';
}, z.boolean());

const numberFromEnv = z.preprocess((value) => {
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return value;
}, z.number().finite());

const optionalUrl = z.preprocess((value) => value === '' ? undefined : value, z.string().url().optional());

const baseSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: numberFromEnv.default(5000),
  MONGODB_URI: z.string().min(1).default('mongodb://127.0.0.1:27017/ktux'),
  JWT_ACCESS_SECRET: z.string().min(32).default('development-access-secret-change-me-please'),
  JWT_REFRESH_SECRET: z.string().min(32).default('development-refresh-secret-change-me-please'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  COOKIE_SECURE: booleanFromEnv.default(false),
  COOKIE_DOMAIN: z.string().optional(),
  TRUST_PROXY: booleanFromEnv.default(false),
  BODY_LIMIT: z.string().default('100kb'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
  SENTRY_DSN: optionalUrl,
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(12).optional(),
  EMAIL_FROM: z.string().min(3).default('Ktux <noreply@example.com>'),
  RESEND_API_KEY: z.string().optional(),
  RESEND_WEBHOOK_SECRET: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_UPLOAD_FOLDER: z.string().default('ktux'),
  GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON: z.string().optional(),
  GOOGLE_SHEETS_ID: z.string().optional(),
  GOOGLE_SHEETS_TAB: z.string().default('Leads'),
  ZAPIER_WEBHOOK_SECRET: z.string().optional(),
  SLACK_WEBHOOK_URL: optionalUrl,
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL: z.string().default('llama-3.3-70b-versatile'),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default('gemini-2.5-flash'),
  AI_MAX_MESSAGE_LENGTH: numberFromEnv.default(4000),
  AI_SESSION_RETENTION_DAYS: numberFromEnv.default(30),
  AI_AUDIT_RETENTION_DAYS: numberFromEnv.default(7),
  AI_FETCH_TIMEOUT_MS: numberFromEnv.default(8000),
  AI_FETCH_MAX_BYTES: numberFromEnv.default(200000),
  ALLOW_MOCK_INTEGRATIONS: booleanFromEnv.default(false)
});

const parsed = baseSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

if (parsed.data.NODE_ENV === 'production') {
  const shortSecrets = [
    ['JWT_ACCESS_SECRET', parsed.data.JWT_ACCESS_SECRET],
    ['JWT_REFRESH_SECRET', parsed.data.JWT_REFRESH_SECRET]
  ].filter(([, value]) => value.length < 32).map(([key]) => key);
  if (shortSecrets.length > 0) {
    console.error(`Production JWT secrets must be at least 32 characters: ${shortSecrets.join(', ')}`);
    process.exit(1);
  }
  const productionRequired = [
    ['JWT_ACCESS_SECRET', parsed.data.JWT_ACCESS_SECRET],
    ['JWT_REFRESH_SECRET', parsed.data.JWT_REFRESH_SECRET],
    ['ADMIN_EMAIL', parsed.data.ADMIN_EMAIL],
    ['ADMIN_PASSWORD', parsed.data.ADMIN_PASSWORD]
  ];
  const missing = productionRequired.filter(([, value]) => !value).map(([key]) => key);
  if (missing.length > 0) {
    console.error(`Missing production environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}

export const env = parsed.data;
export const corsOrigins = env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean);

export type Environment = typeof env;
