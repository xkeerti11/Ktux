import { Schema, model, type HydratedDocument, Types } from 'mongoose';

export interface IRefreshSession {
  userId: Types.ObjectId;
  jti: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date;
  replacedByJti?: string;
  userAgent?: string;
  ip?: string;
}

const refreshSessionSchema = new Schema<IRefreshSession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  jti: { type: String, required: true, unique: true, index: true },
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  revokedAt: Date,
  replacedByJti: String,
  userAgent: String,
  ip: String
}, { timestamps: true });

refreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export type RefreshSessionDocument = HydratedDocument<IRefreshSession>;
export const RefreshSession = model<IRefreshSession>('RefreshSession', refreshSessionSchema);
