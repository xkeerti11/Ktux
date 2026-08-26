import { Router } from 'express';
import { requireAdmin, requireAuth } from '../../middleware/auth';
import { apiLimiter } from '../../middleware/limiter';
import { validate } from '../../middleware/validate';
import { createCloudinaryUploadSignature } from '../../services/media.service';
import { uploadSignatureSchema } from './media.schemas';

export const mediaRouter = Router();
mediaRouter.post('/presign', requireAuth, apiLimiter, requireAdmin, validate({ body: uploadSignatureSchema }), (req, res) => {
  const folder = `${req.body.folder === 'uploads' ? 'uploads' : req.body.folder}`;
  res.json({ success: true, data: createCloudinaryUploadSignature({ folder, timestamp: Math.floor(Date.now() / 1000), resourceType: req.body.resourceType }) });
});
