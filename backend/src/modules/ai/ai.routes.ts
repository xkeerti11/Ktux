import { Router } from 'express';
import { aiRateLimiter, publicLimiter } from '../../middleware/limiter';
import { validate } from '../../middleware/validate';
import { audit, chat, estimate } from './ai.controller';
import { auditSchema, chatSchema, estimateQuerySchema } from './ai.schemas';
import { createCloudinaryUploadSignature } from '../../services/media.service';
import { uploadSignatureSchema } from '../media/media.schemas';

export const aiRouter = Router();
aiRouter.use(publicLimiter, aiRateLimiter);
aiRouter.post('/chat', validate({ body: chatSchema }), chat);
aiRouter.post('/audit', validate({ body: auditSchema }), audit);
aiRouter.get('/estimate', validate({ query: estimateQuerySchema }), estimate);
aiRouter.post('/uploads/presign', validate({ body: uploadSignatureSchema }), (req, res) => {
  res.json({ success: true, data: createCloudinaryUploadSignature({ folder: 'ai-uploads', timestamp: Math.floor(Date.now() / 1000), resourceType: req.body.resourceType }) });
});
