import { z } from 'zod';
import { leadStatuses } from '../../models/Lead';
import { paginationSchema } from '../../schemas/validation';
import { createLeadSchema } from '../../schemas/validation';

const leadFields = {
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(160).optional(),
  industry: z.string().trim().max(100).optional(),
  serviceInterested: z.array(z.string().trim().min(1).max(80)).max(20).default([]),
  budgetRange: z.string().trim().max(100).optional(),
  timeline: z.string().trim().max(100).optional(),
  message: z.string().trim().max(5000).optional(),
  source: z.string().trim().max(100).default('website'),
  utm: z.record(z.string(), z.string().max(200)).optional()
};

export { createLeadSchema };

export const updateLeadSchema = z.object({
  name: leadFields.name.optional(),
  email: leadFields.email.optional(),
  phone: leadFields.phone,
  company: leadFields.company,
  industry: leadFields.industry,
  serviceInterested: leadFields.serviceInterested.optional(),
  budgetRange: leadFields.budgetRange,
  timeline: leadFields.timeline,
  message: leadFields.message,
  source: leadFields.source.optional()
}).strict();

export const statusSchema = z.object({ status: z.enum(leadStatuses) });
export const idParamsSchema = z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id') });
export const leadsQuerySchema = paginationSchema.extend({
  status: z.enum(leadStatuses).optional(),
  service: z.string().trim().max(80).optional(),
  source: z.string().trim().max(80).optional(),
  search: z.string().trim().max(120).optional(),
  minScore: z.coerce.number().int().min(0).max(100).optional(),
  maxScore: z.coerce.number().int().min(0).max(100).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional()
});
