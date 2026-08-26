import { Types } from 'mongoose';
import { ActivityEvent } from '../models/ActivityEvent';

export async function recordActivity(input: {
  entityType: string;
  entityId: string | Types.ObjectId;
  action: string;
  actorId?: string | Types.ObjectId;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  await ActivityEvent.create({
    entityType: input.entityType,
    entityId: new Types.ObjectId(input.entityId),
    action: input.action,
    actorId: input.actorId ? new Types.ObjectId(input.actorId) : undefined,
    metadata: input.metadata
  });
}
