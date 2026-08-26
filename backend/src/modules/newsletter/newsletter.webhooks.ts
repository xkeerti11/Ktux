import crypto from 'node:crypto';
import type { Request, Response } from 'express';
import { env } from '../../config/env';
import { NewsletterSubscription } from '../../models/NewsletterSubscription';
import { AppError } from '../../utils/errors';

function isValidSignature(req: Request): boolean {
  if (!env.RESEND_WEBHOOK_SECRET) return env.NODE_ENV !== 'production';
  const signature = req.header('x-webhook-signature');
  if (!signature) return false;
  const expected = crypto.createHmac('sha256', env.RESEND_WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest('hex');
  return signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function resendWebhook(req: Request, res: Response): Promise<void> {
  if (!isValidSignature(req)) throw new AppError(401, 'WEBHOOK_SIGNATURE_INVALID', 'Invalid webhook signature');
  const email = typeof req.body?.data?.to === 'string' ? req.body.data.to.toLowerCase() : undefined;
  if (email && req.body.type === 'email.bounced') await NewsletterSubscription.updateOne({ email }, { $set: { status: 'unsubscribed', unsubscribedAt: new Date() } });
  res.status(204).send();
}
