import { Resend } from 'resend';
import { env } from '../config/env';
import { logger } from '../config/logger';

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : undefined;

export async function sendEmail(input: { to: string; subject: string; text: string; html?: string }): Promise<boolean> {
  if (!resend) {
    logger.info('Email skipped because RESEND_API_KEY is not configured', { toDomain: input.to.split('@')[1], subject: input.subject });
    return false;
  }
  const result = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: [input.to],
    subject: input.subject,
    text: input.text,
    ...(input.html ? { html: input.html } : {})
  });
  if (result.error) {
    logger.error('Email provider rejected message', { name: result.error.name, message: result.error.message });
    return false;
  }
  return true;
}

export async function sendLeadNotification(lead: { name: string; email: string; source: string; message?: string }): Promise<void> {
  const target = env.ADMIN_EMAIL;
  if (!target) return;
  await sendEmail({
    to: target,
    subject: `New Ktux lead from ${lead.name}`,
    text: [`Name: ${lead.name}`, `Email: ${lead.email}`, `Source: ${lead.source}`, `Message: ${lead.message ?? ''}`].join('\n')
  });
}

export async function sendConsultationNotification(input: {
  calComId: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  bookingDateTime: Date;
  meetingLink?: string;
  status: string;
}): Promise<void> {
  if (!env.ADMIN_EMAIL) return;
  try {
    await sendEmail({
      to: env.ADMIN_EMAIL,
      subject: `Cal.com consultation ${input.status}: ${input.clientName}`,
      text: [
        `Client: ${input.clientName}`,
        `Email: ${input.clientEmail}`,
        `Service: ${input.serviceType}`,
        `Date: ${input.bookingDateTime.toISOString()}`,
        `Status: ${input.status}`,
        `Cal.com ID: ${input.calComId}`,
        `Meeting link: ${input.meetingLink ?? ''}`
      ].join('\n')
    });
  } catch (error) {
    logger.error('Consultation notification failed', { error });
  }
}
