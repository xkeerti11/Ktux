import { Schema, model } from 'mongoose';

export interface IAiAudit {
  url: string;
  status: 'completed' | 'failed';
  result?: unknown;
  providerRequestId?: string;
  errorCode?: string;
  expiresAt: Date;
}

const schema = new Schema<IAiAudit>({
  url: { type: String, required: true },
  status: { type: String, enum: ['completed', 'failed'], required: true },
  result: Schema.Types.Mixed,
  providerRequestId: String,
  errorCode: String,
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const AiAudit = model<IAiAudit>('AiAudit', schema);
