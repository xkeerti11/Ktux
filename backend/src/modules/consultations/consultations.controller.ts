import { timingSafeEqual } from 'node:crypto';
import type { Request, Response } from 'express';
import { env } from '../../config/env';
import { AppError } from '../../utils/errors';
import { adminCancel, listConsultations, processWebhook } from './consultations.service';
import { paginationMeta } from '../../utils/pagination';
import { stringParam } from '../../utils/request';
import { validated } from '../../utils/validated';

function matchesSecret(provided: string, expected: string): boolean {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return providedBuffer.length === expectedBuffer.length && timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function webhookController(req: Request, res: Response): Promise<void> {
  if (!env.ZAPIER_WEBHOOK_SECRET) throw new AppError(500, 'WEBHOOK_NOT_CONFIGURED', 'Zapier webhook secret is not configured');
  const expected = env.ZAPIER_WEBHOOK_SECRET;
  const provided = req.header('x-zapier-webhook-secret') ?? '';
  if (!matchesSecret(provided, expected)) throw new AppError(401, 'WEBHOOK_UNAUTHORIZED', 'Invalid Zapier webhook secret');
  const result = await processWebhook(req.body);
  res.status(200).json({ success: true, data: result });
}

export async function listController(req: Request, res: Response): Promise<void> {
  const q = validated<{ page: number; limit: number; status?: 'scheduled' | 'completed' | 'cancelled' }>(req, 'query');
  const result = await listConsultations(q.page, q.limit, q.status);
  res.json({ success: true, data: result.data, pagination: paginationMeta(result.page, result.limit, result.total) });
}

export async function adminCancelController(req: Request, res: Response): Promise<void> {
  res.json({ success: true, data: await adminCancel(stringParam(req.params.id, 'id')) });
}
