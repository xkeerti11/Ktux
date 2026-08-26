import { z } from 'zod';
import { loginSchema, passwordSchema } from '../../schemas/validation';

export { loginSchema };

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  password: passwordSchema
}).strict();

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase())
});

export const resetPasswordSchema = z.object({
  token: z.string().min(32).max(200),
  password: passwordSchema
});
