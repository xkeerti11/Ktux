import { Schema, model } from 'mongoose';

export interface IIntegrationEvent {
  type: string;
  idempotencyKey: string;
  payload: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  attempts: number;
  nextAttemptAt: Date;
  processedAt?: Date;
  lastError?: string;
}

const schema = new Schema<IIntegrationEvent>({
  type: { type: String, required: true, index: true },
  idempotencyKey: { type: String, required: true, unique: true },
  payload: { type: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending', index: true },
  attempts: { type: Number, default: 0 },
  nextAttemptAt: { type: Date, default: Date.now, index: true },
  processedAt: Date,
  lastError: String
}, { timestamps: true });

export const IntegrationEvent = model<IIntegrationEvent>('IntegrationEvent', schema);
