import { Schema, model, Types } from 'mongoose';

export interface IActivityEvent {
  entityType: string;
  entityId: Types.ObjectId;
  action: string;
  actorId?: Types.ObjectId;
  metadata?: Record<string, unknown>;
}

const schema = new Schema<IActivityEvent>({
  entityType: { type: String, required: true, index: true },
  entityId: { type: Schema.Types.ObjectId, required: true, index: true },
  action: { type: String, required: true },
  actorId: { type: Schema.Types.ObjectId, ref: 'User' },
  metadata: Schema.Types.Mixed
}, { timestamps: true });

schema.index({ entityType: 1, entityId: 1, createdAt: -1 });
export const ActivityEvent = model<IActivityEvent>('ActivityEvent', schema);
