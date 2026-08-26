import { describe, expect, it } from 'vitest';
import { normalizeWebhookPayload } from '../src/modules/consultations/consultations.service';

describe('Cal.com consultation webhook payloads', () => {
  it('accepts the canonical Zapier payload', () => {
    const result = normalizeWebhookPayload({
      calComId: 'booking-123',
      clientName: 'Asha Client',
      clientEmail: 'asha@example.com',
      serviceType: 'Website Development',
      bookingDateTime: '2026-08-10T10:00:00.000Z',
      status: 'scheduled'
    });

    expect(result.calComId).toBe('booking-123');
    expect(result.clientEmail).toBe('asha@example.com');
    expect(result.bookingDateTime.toISOString()).toBe('2026-08-10T10:00:00.000Z');
  });

  it('normalizes common nested Cal.com/Zapier fields', () => {
    const result = normalizeWebhookPayload({
      data: {
        id: 'booking-456',
        startTime: '2026-08-11T11:30:00.000Z',
        attendees: [{ name: 'Ravi Client', email: 'ravi@example.com', phone: '+911234567890' }],
        eventType: { title: 'AI Automation' },
        location: { url: 'https://meet.google.com/example' }
      }
    });

    expect(result).toMatchObject({
      calComId: 'booking-456',
      clientName: 'Ravi Client',
      clientEmail: 'ravi@example.com',
      clientPhone: '+911234567890',
      serviceType: 'AI Automation',
      meetingLink: 'https://meet.google.com/example'
    });
  });

  it('rejects a payload without required booking identity fields', () => {
    expect(() => normalizeWebhookPayload({ status: 'scheduled' })).toThrow('Cal.com webhook payload is invalid');
  });
});
