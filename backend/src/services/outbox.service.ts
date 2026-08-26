import { IntegrationEvent } from '../models/IntegrationEvent';

export async function enqueueIntegrationEvent(type: string, payload: Record<string, unknown>, idempotencyKey: string): Promise<void> {
  await IntegrationEvent.updateOne(
    { idempotencyKey },
    { $setOnInsert: { type, payload, idempotencyKey, status: 'pending', attempts: 0, nextAttemptAt: new Date() } },
    { upsert: true }
  );
}
