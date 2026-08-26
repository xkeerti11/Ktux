import { z } from 'zod';
import { paginationSchema as basePaginationSchema } from '../utils/pagination-base';

const strongPassword = z.string().min(12).max(200).superRefine((password, context) => {
  const rules = [
    [/[A-Z]/, 'Password must contain an uppercase letter'],
    [/[a-z]/, 'Password must contain a lowercase letter'],
    [/\d/, 'Password must contain a number'],
    [/[^A-Za-z0-9]/, 'Password must contain a special character']
  ] as const;
  for (const [rule, message] of rules) {
    if (!rule.test(password)) context.addIssue({ code: 'custom', message });
  }
});

export const passwordSchema = strongPassword;

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: strongPassword
}).strict();

export const loginSchema = z.object({
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: z.string().min(1).max(200)
}).strict();

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

export const createLeadSchema = z.object(leadFields);

export const paginationSchema = basePaginationSchema;

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
