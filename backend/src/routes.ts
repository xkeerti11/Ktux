import { Router } from 'express';
import { authRouter } from './modules/auth/auth.routes';
import { leadsRouter } from './modules/leads/leads.routes';
import { contentRouter } from './modules/content/content.routes';
import { consultationsRouter } from './modules/consultations/consultations.routes';
import { newsletterRouter } from './modules/newsletter/newsletter.routes';
import { aiRouter } from './modules/ai/ai.routes';
import { analyticsRouter } from './modules/analytics/analytics.routes';
import { mediaRouter } from './modules/media/media.routes';
import { resendWebhook } from './modules/newsletter/newsletter.webhooks';
import { validate } from './middleware/validate';
import { z } from 'zod';

export const apiRouter = Router();
apiRouter.get('/health', (_req, res) => res.json({ status: 'ok' }));
apiRouter.use('/auth', authRouter);
apiRouter.use('/leads', leadsRouter);
apiRouter.use('/consultations', consultationsRouter);
apiRouter.use('/newsletter', newsletterRouter);
apiRouter.use('/ai', aiRouter);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/media', mediaRouter);
apiRouter.post('/webhooks/resend', validate({ body: z.record(z.string(), z.unknown()) }), resendWebhook);
// Mount the catch-all content router last so its admin guard cannot intercept other modules.
apiRouter.use('/', contentRouter);
