import { useState } from 'react';
import { AlertCircle, CalendarDays, LoaderCircle } from 'lucide-react';
import { env } from '../lib/env';

interface CalComBookingProps {
  height?: number;
  title?: string;
}

export function CalComBooking({ height = 700, title = 'Book a free consultation with KTUX Studio' }: CalComBookingProps) {
  const [loaded, setLoaded] = useState(false);
  const configured = !env.VITE_CALCOM_BOOKING_URL.includes('/yourname/');

  if (!configured) {
    return (
      <div className="cal-com-config surface-card" role="status">
        <AlertCircle size={22} />
        <strong>Cal.com booking link is not configured yet.</strong>
        <span>Set <code>VITE_CALCOM_BOOKING_URL</code> to your Cal.com consultation URL.</span>
      </div>
    );
  }

  return (
    <div className="cal-com-shell" style={{ height: `${height}px` }}>
      {!loaded && <div className="cal-com-loading" aria-live="polite"><LoaderCircle size={18} className="spin" /> Loading booking calendar...</div>}
      <iframe
        className={`cal-com-frame ${loaded ? 'ready' : ''}`}
        src={env.VITE_CALCOM_BOOKING_URL}
        title={title}
        width="100%"
        height={height}
        loading="lazy"
        allow="camera; microphone; fullscreen; payment"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
      />
      <span className="cal-com-badge"><CalendarDays size={13} /> Secure scheduling by Cal.com</span>
    </div>
  );
}
