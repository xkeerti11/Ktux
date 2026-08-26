import { Router } from 'express';
import { requireAdmin, requireAuth } from '../../middleware/auth';
import { apiLimiter, formLimiter } from '../../middleware/limiter';
import { validate } from '../../middleware/validate';
import { createLeadController, deleteLeadController, exportLeadsController, getLeadController, listLeadsController, statusController, updateLeadController, analyticsController } from './leads.controller';
import { createLeadSchema, idParamsSchema, leadsQuerySchema, statusSchema, updateLeadSchema } from './leads.schemas';

export const leadsRouter = Router();
leadsRouter.post('/', formLimiter, validate({ body: createLeadSchema }), createLeadController);
leadsRouter.use(requireAuth, apiLimiter, requireAdmin);
leadsRouter.get('/', validate({ query: leadsQuerySchema }), listLeadsController);
leadsRouter.get('/analytics/summary', analyticsController);
leadsRouter.get('/export', validate({ query: leadsQuerySchema }), exportLeadsController);
leadsRouter.get('/:id', validate({ params: idParamsSchema }), getLeadController);
leadsRouter.patch('/:id', validate({ params: idParamsSchema, body: updateLeadSchema }), updateLeadController);
leadsRouter.delete('/:id', validate({ params: idParamsSchema }), deleteLeadController);
leadsRouter.patch('/:id/status', validate({ params: idParamsSchema, body: statusSchema }), statusController);
