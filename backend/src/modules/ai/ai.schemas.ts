import { z } from 'zod';

const queryBoolean = z.preprocess((value) => {
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return value;
}, z.boolean());

export const chatSchema = z.object({ sessionId: z.string().uuid().optional(), message: z.string().trim().min(1).max(4000), lead: z.object({ name: z.string().min(2).max(120), email: z.string().email(), phone: z.string().max(40).optional() }).optional() });
export const auditSchema = z.object({ url: z.string().url() });
export const estimateQuerySchema = z.object({ pages: z.coerce.number().int().min(1).max(100).default(5), ecommerce: queryBoolean.default(false), aiFeatures: queryBoolean.default(false) });
