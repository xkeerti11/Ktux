import type { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { getLeadAnalytics } from '../leads/leads.service';
import { validated } from '../../utils/validated';

export async function summary(req: Request, res: Response): Promise<void> {
  const query = validated<{ from?: Date; to?: Date }>(req, 'query');
  res.json({ success: true, data: await getLeadAnalytics(query.from, query.to) });
}

export async function pdfReport(req: Request, res: Response): Promise<void> {
  const query = validated<{ from?: Date; to?: Date }>(req, 'query');
  const analytics = await getLeadAnalytics(query.from, query.to);
  const document = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="ktux-lead-report.pdf"');
  document.pipe(res);
  document.fontSize(22).text('Ktux Lead Report');
  document.moveDown().fontSize(12).text(`Generated: ${new Date().toISOString()}`);
  document.moveDown().fontSize(16).text(`Total leads: ${analytics.total}`);
  document.fontSize(12).text(`Average lead score: ${Number(analytics.averageScore).toFixed(1)}`);
  document.moveDown().fontSize(14).text('Status distribution');
  for (const item of analytics.statuses) document.fontSize(11).text(`${item._id}: ${item.count}`);
  document.moveDown().fontSize(14).text('Service distribution');
  for (const item of analytics.services) document.fontSize(11).text(`${item._id || 'Unspecified'}: ${item.count}`);
  document.end();
}
