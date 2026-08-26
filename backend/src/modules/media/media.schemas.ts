import { z } from 'zod';

export const uploadSignatureSchema = z.object({
  folder: z.string().regex(/^[a-zA-Z0-9/_-]{1,100}$/).default('uploads'),
  resourceType: z.enum(['image', 'raw']).default('image')
});
