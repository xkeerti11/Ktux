import { z } from 'zod';
import { paginationSchema } from '../../utils/pagination';

export const webhookSchema = z.object({
  calComId: z.string().trim().min(1).max(200),
  clientName: z.string().trim().min(2).max(120),
  clientEmail: z.string().email().max(254),
  clientPhone: z.string().trim().max(40).optional(),
  serviceType: z.string().trim().min(1).max(120).default('Consultation'),
  bookingDateTime: z.coerce.date(),
  meetingLink: z.string().trim().max(1000).optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled']).default('scheduled'),
  notes: z.string().trim().max(5000).optional()
});

export const consultationIdParamsSchema = z.object({ id: z.string().regex(/^[a-f\d]{24}$/i) });
export const consultationQuerySchema = paginationSchema.extend({
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional()
});

export type WebhookInput = z.infer<typeof webhookSchema>;
