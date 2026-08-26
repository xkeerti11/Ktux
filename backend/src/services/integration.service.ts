import { google } from 'googleapis';
import { env } from '../config/env';
import { logger } from '../config/logger';
import { Lead } from '../models/Lead';

export async function notifySlack(lead: { name: string; email: string; source: string }): Promise<void> {
  if (!env.SLACK_WEBHOOK_URL) return;
  const response = await fetch(env.SLACK_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: `New Ktux lead: ${lead.name} (${lead.email}) from ${lead.source}` }) });
  if (!response.ok) throw new Error(`Slack webhook returned ${response.status}`);
}

export async function syncLeadToSheets(leadId: string): Promise<void> {
  if (!env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON || !env.GOOGLE_SHEETS_ID) return;
  const lead = await Lead.findById(leadId).lean();
  if (!lead) return;
  const credentials = JSON.parse(env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON) as { client_email: string; private_key: string };
  const auth = new google.auth.JWT({ email: credentials.client_email, key: credentials.private_key, scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({ spreadsheetId: env.GOOGLE_SHEETS_ID, range: `${env.GOOGLE_SHEETS_TAB}!A:K`, valueInputOption: 'USER_ENTERED', requestBody: { values: [[lead.name, lead.email, lead.phone ?? '', lead.company ?? '', lead.industry ?? '', lead.status, lead.leadScore, lead.source, lead.serviceInterested.join(', '), lead.createdAt?.toISOString() ?? '', lead.message ?? '']] } });
}

export async function processIntegrationEvent(type: string, payload: Record<string, unknown>): Promise<void> {
  if (type === 'lead.created') {
    const leadId = String(payload.leadId);
    const lead = await Lead.findById(leadId).lean();
    if (lead) await notifySlack(lead);
    await syncLeadToSheets(leadId);
  }
  if (type === 'lead.status_changed' && payload.leadId) await syncLeadToSheets(String(payload.leadId));
  logger.debug('Processed integration event', { type });
}
