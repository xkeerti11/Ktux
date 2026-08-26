import express from 'express';
import { configureSecurity } from './middleware/security';
import { requestId } from './middleware/requestId';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiRouter } from './routes';
import { isDatabaseReady } from './config/db';
import { env } from './config/env';
import { Sentry } from './config/observability';

export function createApp() {
  const app = express();
  app.use(requestId);
  configureSecurity(app);
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));
  app.get('/ready', (_req, res) => isDatabaseReady() ? res.json({ status: 'ready' }) : res.status(503).json({ status: 'not_ready' }));
  app.use('/api/v1', apiRouter);
  if (env.SENTRY_DSN) Sentry.setupExpressErrorHandler(app);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
