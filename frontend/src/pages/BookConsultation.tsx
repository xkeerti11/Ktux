import { Helmet } from 'react-helmet-async';
import { ArrowRight, CalendarDays, CheckCircle2, Clock3, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion } from '../components/Accordion';
import { CalComBooking } from '../components/CalComBooking';

const faqItems = [
  { question: 'Is the consultation really free?', answer: 'Yes. The first 30-minute conversation is free and focused on understanding your goals, constraints and the most useful next step.' },
  { question: 'What happens after I choose a time?', answer: 'Cal.com will confirm the booking and send the meeting details to your email. You can manage the booking from the confirmation message.' },
  { question: 'What should I bring to the call?', answer: 'A little context is enough: what you are building, what feels stuck and what a better outcome would look like.' },
  { question: 'Can I reschedule?', answer: 'Yes. Use the reschedule or cancellation controls in the Cal.com confirmation email.' }
];

export default function BookConsultation() {
  return (
    <>
      <Helmet>
        <title>Book a strategy call - KTUX Studio</title>
        <meta name="description" content="Schedule a free consultation with KTUX Studio through Cal.com." />
      </Helmet>

      <section className="page-hero light-hero booking-hero">
        <div className="site-container">
          <span className="eyebrow">A useful first conversation</span>
          <h1 className="display">Let&apos;s find the<br /><span className="luxury gold">right next step.</span></h1>
          <p className="section-copy">Thirty minutes. No performance. Just a clear read on the opportunity in front of you.</p>
        </div>
      </section>

      <section className="section booking-section">
        <div className="site-container booking-layout">
          <aside className="booking-progress" aria-label="Booking information">
            <span className="eyebrow">Booking flow</span>
            <div className="booking-step active"><span><CalendarDays size={15} /></span><strong>Choose a time</strong></div>
            <div className="booking-step"><span><Clock3 size={15} /></span><strong>Share your context</strong></div>
            <div className="booking-step"><span><CheckCircle2 size={15} /></span><strong>Get confirmation</strong></div>
            <div className="booking-confirm booking-info-pills">
              <span><Clock3 size={14} /> 30 minutes</span>
              <span><Video size={14} /> Online meeting</span>
            </div>
          </aside>

          <div className="booking-card surface-card">
            <span className="eyebrow">Cal.com scheduler</span>
            <h2>Pick a moment<br /><span className="luxury gold">that works.</span></h2>
            <CalComBooking height={700} />
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="site-container faq-layout">
          <div><span className="eyebrow">Before we talk</span><h2 className="section-title">A few useful<br /><span className="luxury gold">answers.</span></h2><Link className="back-link" to="/contact">Have another question? <ArrowRight size={14} /></Link></div>
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  );
}
