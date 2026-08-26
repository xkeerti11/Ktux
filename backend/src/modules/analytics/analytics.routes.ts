import { Router } from 'express';
import { requireAdmin, requireAuth } from '../../middleware/auth';
import { apiLimiter } from '../../middleware/limiter';
import { validate } from '../../middleware/validate';
import { leadsQuerySchema } from '../leads/leads.schemas';
import { pdfReport, summary } from './analytics.controller';

export const analyticsRouter = Router();
analyticsRouter.use(requireAuth, apiLimiter, requireAdmin);
analyticsRouter.get('/summary', validate({ query: leadsQuerySchema }), summary);
analyticsRouter.get('/report.pdf', validate({ query: leadsQuerySchema }), pdfReport);
