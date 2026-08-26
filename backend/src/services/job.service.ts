import { IntegrationEvent } from '../models/IntegrationEvent';
import { logger } from '../config/logger';
import { isDatabaseReady } from '../config/db';
import { processIntegrationEvent } from './integration.service';

let timer: NodeJS.Timeout | undefined;
let processing = false;

async function processPendingEvents(): Promise<void> {
  if (!isDatabaseReady()) return;
  if (processing) return;
  processing = true;
  try {
    const event = await IntegrationEvent.findOneAndUpdate(
      { status: 'pending', nextAttemptAt: { $lte: new Date() } },
      { $set: { status: 'processing' }, $inc: { attempts: 1 } },
      { sort: { createdAt: 1 }, returnDocument: 'after' }
    );
    if (!event) return;
    try {
      await processIntegrationEvent(event.type, event.payload);
      event.status = 'completed';
      event.processedAt = new Date();
      await event.save();
    } catch (error) {
      event.status = event.attempts >= 8 ? 'failed' : 'pending';
      event.lastError = error instanceof Error ? error.message.slice(0, 500) : 'Unknown integration error';
      event.nextAttemptAt = new Date(Date.now() + Math.min(60 * 60 * 1000, 2 ** event.attempts * 1000));
      await event.save();
      logger.error('Integration event failed', { eventId: event.id, type: event.type, attempts: event.attempts, error: event.lastError });
    }
  } finally {
    processing = false;
  }
}

export function startJobs(): void {
  timer = setInterval(() => { void processPendingEvents(); }, 5000);
}

export function stopJobs(): void {
  if (timer) clearInterval(timer);
}
