import crypto from 'node:crypto';
import type { Request, Response } from 'express';
import { AiConversation } from '../../models/AiConversation';
import { AiAudit } from '../../models/AiAudit';
import { createLead } from '../leads/leads.service';
import { env } from '../../config/env';
import { AppError } from '../../utils/errors';
import { assertSafePublicUrl, fetchWebsiteText, geminiAudit, groqChat } from '../../services/ai.service';
import { validated } from '../../utils/validated';

export async function chat(req: Request, res: Response): Promise<void> {
  const sessionId = req.body.sessionId ?? crypto.randomUUID();
  const conversation = await AiConversation.findOneAndUpdate(
    { sessionId },
    { $setOnInsert: { sessionId, messages: [], expiresAt: new Date(Date.now() + env.AI_SESSION_RETENTION_DAYS * 86400000) } },
    { upsert: true, returnDocument: 'after' }
  );

  const history = conversation.messages.slice(-12).map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const result = await groqChat([
    ...history,
    { role: 'user', content: req.body.message },
  ]);

  conversation.messages.push(
    { role: 'user', content: req.body.message, createdAt: new Date() },
    { role: 'assistant', content: result.text, createdAt: new Date() }
  );

  if (req.body.lead && !conversation.leadId) {
    const lead = await createLead({ ...req.body.lead, serviceInterested: [], source: 'ai-chat', isDeleted: false } as never);
    conversation.leadId = lead._id;
  }

  await conversation.save();
  res.json({ success: true, data: { sessionId, message: result.text, providerRequestId: result.requestId } });
}

export async function audit(req: Request, res: Response): Promise<void> {
  const safeUrl = await assertSafePublicUrl(req.body.url);
  const websiteText = await fetchWebsiteText(safeUrl);
  try {
    const result = await geminiAudit(safeUrl.toString(), websiteText);
    const auditRecord = await AiAudit.create({
      url: safeUrl.toString(),
      status: 'completed',
      result: { text: result.text },
      providerRequestId: result.requestId,
      expiresAt: new Date(Date.now() + env.AI_AUDIT_RETENTION_DAYS * 86400000),
    });
    res.json({ success: true, data: { id: auditRecord.id, url: safeUrl.toString(), result: auditRecord.result } });
  } catch (error) {
    await AiAudit.create({
      url: safeUrl.toString(),
      status: 'failed',
      errorCode: error instanceof AppError ? error.code : 'AI_PROVIDER_ERROR',
      expiresAt: new Date(Date.now() + env.AI_AUDIT_RETENTION_DAYS * 86400000),
    });
    throw error;
  }
}

export async function estimate(req: Request, res: Response): Promise<void> {
  const { pages, ecommerce, aiFeatures } = validated<{ pages: number; ecommerce: boolean; aiFeatures: boolean }>(req, 'query');
  const base = 25000 + Math.max(0, pages - 5) * 2500;
  const total = base + (ecommerce ? 15000 : 0) + (aiFeatures ? 10000 : 0);
  res.json({
    success: true,
    data: {
      currency: 'INR',
      min: Math.round(total * 0.85),
      max: Math.round(total * 1.25),
      assumptions: { pages, ecommerce, aiFeatures },
    },
  });
}
