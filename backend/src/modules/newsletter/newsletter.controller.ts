import type { Request, Response } from 'express';
import { NewsletterSubscription } from '../../models/NewsletterSubscription';
import { generateOpaqueToken, hashOpaqueToken } from '../../utils/auth';
import { sendEmail } from '../../services/email.service';
import { AppError } from '../../utils/errors';
import { env } from '../../config/env';
import { validated } from '../../utils/validated';

export async function subscribe(req: Request, res: Response): Promise<void> {
  const email = req.body.email.toLowerCase().trim();
  const confirmationToken = generateOpaqueToken();
  const unsubscribeToken = generateOpaqueToken();
  const existing = await NewsletterSubscription.findOne({ email });
  const subscription = existing ?? new NewsletterSubscription({ email, unsubscribeTokenHash: hashOpaqueToken(unsubscribeToken) });
  subscription.source = req.body.source;
  subscription.consentAt = new Date();
  subscription.status = 'pending';
  subscription.confirmationTokenHash = hashOpaqueToken(confirmationToken);
  subscription.tokenExpiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
  subscription.unsubscribedAt = undefined;
  await subscription.save();
  const confirmationUrl = `${env.CLIENT_URL}/newsletter/confirm?token=${confirmationToken}`;
  await sendEmail({ to: email, subject: 'Confirm your Ktux newsletter subscription', text: `Confirm your subscription: ${confirmationUrl}` });
  res.status(202).json({ success: true, data: { message: 'Check your email to confirm your subscription' } });
}

export async function confirm(req: Request, res: Response): Promise<void> {
  const query = validated<{ token: string }>(req, 'query');
  const subscription = await NewsletterSubscription.findOne({ confirmationTokenHash: hashOpaqueToken(query.token), tokenExpiresAt: { $gt: new Date() } });
  if (!subscription) throw new AppError(400, 'CONFIRMATION_TOKEN_INVALID', 'Invalid or expired confirmation token');
  subscription.status = 'subscribed';
  subscription.confirmedAt = new Date();
  subscription.confirmationTokenHash = undefined;
  subscription.tokenExpiresAt = undefined;
  await subscription.save();
  res.json({ success: true, data: { message: 'Newsletter subscription confirmed' } });
}

export async function unsubscribe(req: Request, res: Response): Promise<void> {
  const query = validated<{ token: string }>(req, 'query');
  const subscription = await NewsletterSubscription.findOne({ unsubscribeTokenHash: hashOpaqueToken(query.token) });
  if (!subscription) throw new AppError(404, 'NOT_FOUND', 'Subscription not found');
  subscription.status = 'unsubscribed';
  subscription.unsubscribedAt = new Date();
  await subscription.save();
  res.json({ success: true, data: { message: 'You have been unsubscribed' } });
}
