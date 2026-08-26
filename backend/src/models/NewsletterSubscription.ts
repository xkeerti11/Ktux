import { Schema, model } from 'mongoose';

export interface INewsletterSubscription {
  email: string;
  status: 'pending' | 'subscribed' | 'unsubscribed';
  source: string;
  consentAt: Date;
  confirmationTokenHash?: string;
  unsubscribeTokenHash: string;
  tokenExpiresAt?: Date;
  confirmedAt?: Date;
  unsubscribedAt?: Date;
  providerContactId?: string;
}

const schema = new Schema<INewsletterSubscription>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  status: { type: String, enum: ['pending', 'subscribed', 'unsubscribed'], default: 'pending', index: true },
  source: { type: String, default: 'website' },
  consentAt: { type: Date, required: true },
  confirmationTokenHash: String,
  unsubscribeTokenHash: { type: String, required: true, unique: true },
  tokenExpiresAt: Date,
  confirmedAt: Date,
  unsubscribedAt: Date,
  providerContactId: String
}, { timestamps: true });

export const NewsletterSubscription = model<INewsletterSubscription>('NewsletterSubscription', schema);
