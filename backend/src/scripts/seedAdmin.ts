import { connectDatabase, disconnectDatabase } from '../config/db';
import { ensureAdmin } from '../services/auth.service';
import { logger } from '../config/logger';

async function run(): Promise<void> {
  const connected = await connectDatabase();
  if (!connected) throw new Error('MongoDB connection is required to seed the admin');
  await ensureAdmin();
  logger.info('Admin seed completed');
  await disconnectDatabase();
}

void run().catch(async (error) => {
  logger.error('Admin seed failed', { error });
  await disconnectDatabase();
  process.exit(1);
});
