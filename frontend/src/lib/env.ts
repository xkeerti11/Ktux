import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url({ message: 'VITE_API_BASE_URL must be a valid URL' }),
  VITE_SITE_URL: z.string().url({ message: 'VITE_SITE_URL must be a valid URL' }).optional(),
  VITE_RECAPTCHA_SITE_KEY: z.string().optional(),
  VITE_SENTRY_DSN: z.string().optional(),
  VITE_CALCOM_BOOKING_URL: z.string().url().default('https://cal.com/yourname/consultation'),
});

const rawEnv = {
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  VITE_SITE_URL: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  VITE_RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  VITE_CALCOM_BOOKING_URL: import.meta.env.VITE_CALCOM_BOOKING_URL || 'https://cal.com/yourname/consultation',
};

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  const errors = parsed.error.flatten().fieldErrors;
  console.error('❌ Invalid environment variables:', errors);
  throw new Error(`Invalid environment configuration: ${JSON.stringify(errors)}`);
}

export const env = parsed.data;
