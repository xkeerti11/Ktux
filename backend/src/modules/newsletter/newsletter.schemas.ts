import { z } from 'zod';

export const subscribeSchema = z.object({ email: z.string().email().max(254), source: z.string().trim().max(100).default('website'), consent: z.literal(true) });
export const tokenQuerySchema = z.object({ token: z.string().min(32).max(200) });
