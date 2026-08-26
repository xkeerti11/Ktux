import { Types } from 'mongoose';
import { Lead, type ILead, type LeadStatus } from '../../models/Lead';
import { User } from '../../models/User';
import { AppError } from '../../utils/errors';
import { recordActivity } from '../../services/activity.service';
import { enqueueIntegrationEvent } from '../../services/outbox.service';
import { sendLeadNotification } from '../../services/email.service';

function calculateScore(input: Pick<ILead, 'message' | 'budgetRange' | 'timeline' | 'serviceInterested' | 'company'>) {
  const factors: Record<string, number> = {
    serviceFit: Math.min(input.serviceInterested.length * 10, 20),
    budgetAlignment: input.budgetRange ? 25 : 0,
    timeline: input.timeline ? 20 : 0,
    company: input.company ? 10 : 0,
    engagement: input.message ? Math.min(Math.ceil(input.message.length / 100) * 5, 25) : 0
  };
  return { factors, score: Math.min(100, Object.values(factors).reduce((sum, value) => sum + value, 0)) };
}

export async function getAdminId(): Promise<Types.ObjectId | undefined> {
  const admin = await User.findOne({ role: 'admin', isDeleted: false }).select('_id');
  return admin?._id;
}

export async function createLead(input: Omit<ILead, 'leadScore' | 'scoreFactors' | 'status' | 'isDeleted'>) {
  const normalized = { ...input, email: input.email.toLowerCase().trim() };
  const scoring = calculateScore(normalized);
  const assignedTo = await getAdminId();
  const lead = await Lead.create({ ...normalized, ...scoring, assignedTo, status: 'new', isDeleted: false });
  await recordActivity({ entityType: 'lead', entityId: lead.id, action: 'created', metadata: { source: lead.source } });
  await enqueueIntegrationEvent('lead.created', { leadId: lead.id }, `lead.created:${lead.id}`);
  await sendLeadNotification(lead);
  return lead;
}

export async function listLeads(query: {
  page: number; limit: number; status?: LeadStatus; service?: string; source?: string; search?: string;
  minScore?: number; maxScore?: number; from?: Date; to?: Date;
}) {
  const filter: Record<string, unknown> = { isDeleted: false };
  if (query.status) filter.status = query.status;
  if (query.service) filter.serviceInterested = query.service;
  if (query.source) filter.source = query.source;
  if (query.minScore !== undefined || query.maxScore !== undefined) {
    filter.leadScore = { ...(query.minScore !== undefined ? { $gte: query.minScore } : {}), ...(query.maxScore !== undefined ? { $lte: query.maxScore } : {}) };
  }
  if (query.from || query.to) filter.createdAt = { ...(query.from ? { $gte: query.from } : {}), ...(query.to ? { $lte: query.to } : {}) };
  if (query.search) {
    const regex = new RegExp(query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [{ name: regex }, { email: regex }, { company: regex }, { industry: regex }];
  }
  const skip = (query.page - 1) * query.limit;
  const [data, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(query.limit).lean(),
    Lead.countDocuments(filter)
  ]);
  return { data, total, page: query.page, limit: query.limit };
}

export async function getLead(id: string) {
  const lead = await Lead.findOne({ _id: id, isDeleted: false });
  if (!lead) throw new AppError(404, 'NOT_FOUND', 'Lead not found');
  return lead;
}

export async function updateLead(id: string, patch: Partial<ILead>, actorId: string) {
  const lead = await getLead(id);
  Object.assign(lead, patch);
  const scoring = calculateScore(lead);
  lead.leadScore = scoring.score;
  lead.scoreFactors = scoring.factors;
  await lead.save();
  await recordActivity({ entityType: 'lead', entityId: lead.id, action: 'updated', actorId });
  return lead;
}

export async function changeLeadStatus(id: string, status: LeadStatus, actorId: string) {
  const lead = await getLead(id);
  lead.status = status;
  if (status === 'contacted') lead.lastContacted = new Date();
  await lead.save();
  await recordActivity({ entityType: 'lead', entityId: lead.id, action: 'status_changed', actorId, metadata: { status } });
  await enqueueIntegrationEvent('lead.status_changed', { leadId: lead.id, status }, `lead.status:${lead.id}:${status}:${lead.updatedAt?.getTime() ?? Date.now()}`);
  return lead;
}

export async function softDeleteLead(id: string, actorId: string) {
  const lead = await getLead(id);
  lead.isDeleted = true;
  lead.deletedAt = new Date();
  lead.deletedBy = new Types.ObjectId(actorId);
  await lead.save();
  await recordActivity({ entityType: 'lead', entityId: lead.id, action: 'deleted', actorId });
}

export async function getLeadAnalytics(from?: Date, to?: Date) {
  const createdAt = { ...(from ? { $gte: from } : {}), ...(to ? { $lte: to } : {}) };
  const match = { isDeleted: false, ...(Object.keys(createdAt).length ? { createdAt } : {}) };
  const [total, statuses, services, averageScore] = await Promise.all([
    Lead.countDocuments(match),
    Lead.aggregate([{ $match: match }, { $group: { _id: '$status', count: { $sum: 1 } } }]),
    Lead.aggregate([{ $match: match }, { $unwind: { path: '$serviceInterested', preserveNullAndEmptyArrays: true } }, { $group: { _id: '$serviceInterested', count: { $sum: 1 } } }]),
    Lead.aggregate([{ $match: match }, { $group: { _id: null, average: { $avg: '$leadScore' } } }])
  ]);
  return { total, statuses, services, averageScore: averageScore[0]?.average ?? 0 };
}
