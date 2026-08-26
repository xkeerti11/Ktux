import { Schema, model, Types } from 'mongoose';

export interface IAiConversation {
  sessionId: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string; createdAt: Date }>;
  leadId?: Types.ObjectId;
  expiresAt: Date;
}

const schema = new Schema<IAiConversation>({
  sessionId: { type: String, required: true, unique: true, index: true },
  messages: { type: [{ role: String, content: String, createdAt: Date }], default: [] },
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const AiConversation = model<IAiConversation>('AiConversation', schema);
