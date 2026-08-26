import { Lead } from '../../models/Lead';
import { Consultation, type ConsultationStatus } from '../../models/Consultation';
import { AppError } from '../../utils/errors';
import { createLead } from '../leads/leads.service';
import { sendConsultationNotification } from '../../services/email.service';
import { recordActivity } from '../../services/activity.service';
import { webhookSchema, type WebhookInput } from './consultations.schemas';

type UnknownRecord = Record<string, unknown>;

function record(value: unknown): UnknownRecord {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as UnknownRecord : {};
}

function firstString(...values: unknown[]): string | undefined {
  return values.find((value): value is string => typeof value === 'string' && value.trim().length > 0)?.trim();
}

function nested(root: UnknownRecord, key: string): UnknownRecord {
  return record(root[key]);
}

export function normalizeWebhookPayload(payload: unknown): WebhookInput {
  const root = record(payload);
  const data = record(root.data);
  const nestedPayload = record(root.payload);
  const source = Object.keys(data).length ? data : Object.keys(nestedPayload).length ? nestedPayload : root;
  const booking = nested(source, 'booking');
  const attendee = record(source.attendee ?? (Array.isArray(source.attendees) ? source.attendees[0] : undefined));
  const eventType = record(source.eventType ?? source.event_type);
  const location = record(source.location);

  const normalized = {
    calComId: firstString(root.calComId, root.bookingId, root.uid, root.id, source.calComId, source.bookingId, source.uid, source.id, booking.id),
    clientName: firstString(root.clientName, root.name, root.attendeeName, root.invitee_name, source.clientName, source.name, attendee.name, booking.clientName),
    clientEmail: firstString(root.clientEmail, root.email, root.attendeeEmail, root.invitee_email, source.clientEmail, source.email, attendee.email, booking.clientEmail),
    clientPhone: firstString(root.clientPhone, root.phone, source.clientPhone, source.phone, attendee.phone, booking.clientPhone),
    serviceType: firstString(root.serviceType, root.service, root.eventTypeName, source.serviceType, source.service, eventType.title, eventType.slug) ?? 'Consultation',
    bookingDateTime: firstString(root.bookingDateTime, root.startAt, root.startTime, root.start, source.bookingDateTime, source.startAt, source.startTime, source.start, booking.startAt, booking.startTime),
    meetingLink: firstString(root.meetingLink, root.meetingUrl, root.videoCallUrl, source.meetingLink, source.meetingUrl, source.videoCallUrl, location.url, location.link),
    status: normalizeStatus(firstString(root.status, source.status, booking.status)),
    notes: firstString(root.notes, root.message, root.description, source.notes, source.message, source.description, booking.notes)
  };

  const parsed = webhookSchema.safeParse(normalized);
  if (!parsed.success) {
    const fields: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.') || 'request';
      fields[key] ??= [];
      fields[key].push(issue.message);
    }
    throw new AppError(400, 'WEBHOOK_VALIDATION_ERROR', 'Cal.com webhook payload is invalid', fields);
  }
  return parsed.data;
}

function normalizeStatus(value: string | undefined): ConsultationStatus {
  const status = value?.toLowerCase();
  if (status === 'cancelled' || status === 'canceled' || status?.includes('cancel')) return 'cancelled';
  if (status === 'completed') return 'completed';
  return 'scheduled';
}

export async function processWebhook(payload: unknown) {
  const input = normalizeWebhookPayload(payload);
  const status = normalizeStatus(input.status);
  const existing = await Consultation.findOne({ calComId: input.calComId });
  let lead = await Lead.findOne({ email: input.clientEmail.toLowerCase(), isDeleted: false }).sort({ createdAt: -1 });

  if (!lead) {
    lead = await createLead({
      name: input.clientName,
      email: input.clientEmail,
      phone: input.clientPhone,
      message: input.notes,
      serviceInterested: [input.serviceType],
      source: 'cal.com',
      isDeleted: false
    } as never);
  }

  const consultation = await Consultation.findOneAndUpdate(
    { calComId: input.calComId },
    {
      $set: {
        calComId: input.calComId,
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        clientPhone: input.clientPhone,
        serviceType: input.serviceType,
        bookingDateTime: input.bookingDateTime,
        meetingLink: input.meetingLink,
        status,
        leadId: lead._id,
        notes: input.notes
      }
    },
    { returnDocument: 'after', upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  if (!consultation) throw new AppError(500, 'CONSULTATION_SAVE_FAILED', 'Consultation could not be saved');

  await Lead.updateOne(
    { _id: lead._id },
    {
      $set: {
        consultationBooked: status === 'scheduled',
        consultationId: consultation._id,
        consultationDate: input.bookingDateTime,
        ...(status === 'scheduled' ? { status: 'consultation_booked' } : {})
      }
    }
  );

  const existingTime = existing?.bookingDateTime instanceof Date ? existing.bookingDateTime.getTime() : undefined;
  const changed = !existing || existing.status !== status || existingTime !== input.bookingDateTime.getTime();
  if (changed) {
    await sendConsultationNotification({ ...input, status });
    await recordActivity({ entityType: 'consultation', entityId: consultation.id, action: status === 'cancelled' ? 'cancelled' : 'booked', metadata: { leadId: lead.id, calComId: input.calComId } });
  }

  return { consultation, leadId: lead.id, duplicate: Boolean(existing && !changed) };
}

export async function listConsultations(page: number, limit: number, status?: ConsultationStatus) {
  const filter = status ? { status } : {};
  const [data, total] = await Promise.all([
    Consultation.find(filter).populate('leadId').sort({ bookingDateTime: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Consultation.countDocuments(filter)
  ]);
  return { data, total, page, limit };
}

export async function adminCancel(id: string) {
  const consultation = await Consultation.findByIdAndUpdate(id, { $set: { status: 'cancelled' } }, { returnDocument: 'after', runValidators: true });
  if (!consultation) throw new AppError(404, 'NOT_FOUND', 'Consultation not found');
  return consultation;
}
