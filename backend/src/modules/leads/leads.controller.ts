import type { Request, Response } from 'express';
import { createLead, changeLeadStatus, getLead, getLeadAnalytics, listLeads, softDeleteLead, updateLead } from './leads.service';
import { paginationMeta } from '../../utils/pagination';
import { toCsv } from '../../utils/csv';
import { stringParam } from '../../utils/request';
import { validated } from '../../utils/validated';

export async function createLeadController(req: Request, res: Response): Promise<void> {
  const lead = await createLead(req.body);
  res.status(201).json({ success: true, data: lead });
}

export async function listLeadsController(req: Request, res: Response): Promise<void> {
  const result = await listLeads(validated(req, 'query'));
  res.json({ success: true, data: result.data, pagination: paginationMeta(result.page, result.limit, result.total) });
}

export async function getLeadController(req: Request, res: Response): Promise<void> {
  const lead = await getLead(stringParam(req.params.id, 'id'));
  res.json({ success: true, data: lead });
}

export async function updateLeadController(req: Request, res: Response): Promise<void> {
  const lead = await updateLead(stringParam(req.params.id, 'id'), req.body, req.auth!.id);
  res.json({ success: true, data: lead });
}

export async function deleteLeadController(req: Request, res: Response): Promise<void> {
  await softDeleteLead(stringParam(req.params.id, 'id'), req.auth!.id);
  res.status(204).send();
}

export async function statusController(req: Request, res: Response): Promise<void> {
  const lead = await changeLeadStatus(stringParam(req.params.id, 'id'), req.body.status, req.auth!.id);
  res.json({ success: true, data: lead });
}

export async function analyticsController(req: Request, res: Response): Promise<void> {
  const query = validated<{ from?: Date; to?: Date }>(req, 'query');
  res.json({ success: true, data: await getLeadAnalytics(query.from, query.to) });
}

export async function exportLeadsController(req: Request, res: Response): Promise<void> {
  const result = await listLeads({ ...(validated(req, 'query') as Record<string, unknown>), page: 1, limit: 100 } as never);
  const csv = toCsv(result.data as unknown as Array<Record<string, unknown>>, ['_id', 'name', 'email', 'phone', 'company', 'industry', 'status', 'leadScore', 'source', 'createdAt']);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="ktux-leads.csv"');
  res.send(csv);
}
