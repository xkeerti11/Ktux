import { Router } from 'express';
import { requireAdmin, requireAuth } from '../../middleware/auth';
import { apiLimiter, publicLimiter } from '../../middleware/limiter';
import { validate } from '../../middleware/validate';
import { adminCancelController, listController, webhookController } from './consultations.controller';
import { consultationIdParamsSchema, consultationQuerySchema } from './consultations.schemas';

export const consultationsRouter = Router();
consultationsRouter.post('/webhook', publicLimiter, webhookController);
consultationsRouter.use(requireAuth, apiLimiter, requireAdmin);
consultationsRouter.get('/', validate({ query: consultationQuerySchema }), listController);
consultationsRouter.delete('/:id', validate({ params: consultationIdParamsSchema }), adminCancelController);
