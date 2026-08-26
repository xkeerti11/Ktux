import http from 'node:http';
import { createApp } from './app';
import { connectDatabase, disconnectDatabase } from './config/db';
import { env } from './config/env';
import { logger } from './config/logger';
import { initializeObservability } from './config/observability';
import { ensureAdmin } from './services/auth.service';
import { startJobs, stopJobs } from './services/job.service';

async function start(): Promise<void> {
  initializeObservability();

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, '0.0.0.0', () => {
    logger.info('Ktux API listening', { port: env.PORT, environment: env.NODE_ENV });
  });

  // Connect database in background so server opens port 5000 instantly
  void connectDatabase().then(async (connected) => {
    if (!connected) {
      logger.warn('Startup completed without a database connection. Health endpoint remains available; database features will return errors until MongoDB is restored.');
      return;
    }
    await ensureAdmin().catch((err) => logger.warn('Admin seed skipped', { error: err?.message }));
    startJobs();
  }).catch((error) => {
    logger.error('Database startup task failed', { error });
  });

  const shutdown = async (signal: string) => {
    logger.info('Shutdown requested', { signal });
    stopJobs();
    await new Promise<void>((resolve) => server.close(() => resolve()));
    await disconnectDatabase();
    process.exit(0);
  };
  process.on('SIGTERM', () => { void shutdown('SIGTERM'); });
  process.on('SIGINT', () => { void shutdown('SIGINT'); });
}

void start().catch((error) => {
  logger.error('Server failed to start', { error });
  process.exit(1);
});
