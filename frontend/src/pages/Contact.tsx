import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Check, Clock3, Mail, MapPin, MessageSquare, Phone, Send, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { client } from '../lib/api/client';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid work email required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Please share a few details about your project or goal'),
});

type ContactData = z.infer<typeof schema>;

const servicesList = [
  'Website Development',
  'Autonomous AI Agents',
  'Custom AI Automation',
  'AI UGC Video Ads',
  'Brand & Design System',
];

const budgetOptions = ['₹25K — ₹50K', '₹50K — ₹1L', '₹1L — ₹3L', 'Custom / Enterprise'];
const timelineOptions = ['Immediately (< 2 wks)', 'This Month (2-4 wks)', 'Next Quarter', 'Exploring'];

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Website Development']);
  const [selectedBudget, setSelectedBudget] = useState<string>('₹50K — ₹1L');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('This Month (2-4 wks)');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: ContactData) =>
      client.post('/leads', {
        ...data,
        budgetRange: selectedBudget,
        timeline: selectedTimeline,
        serviceInterested: selectedServices,
        source: 'website_contact',
      }),
    onSuccess: () => {
      setSubmitted(true);
      reset();
      toast.success('Message sent! Our founders will review and reply within 24 hours.');
    },
    onError: () => toast.error('Something went wrong. Please try again or message us on WhatsApp.'),
  });

  const toggleService = (srv: string) => {
    setSelectedServices((prev) =>
      prev.includes(srv) ? prev.filter((item) => item !== srv) : [...prev, srv]
    );
  };

  const onSubmit = (data: ContactData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Contact & Project Inquiries — KTUX Studio</title>
        <meta
          name="description"
          content="Get in touch with KTUX Studio founders. Discuss your web development, AI agent, or custom workflow automation project."
        />
      </Helmet>

      {/* ── 1. Hero ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.05), transparent 45%), #050507',
          paddingTop: 'clamp(140px, 18vw, 190px)',
          paddingBottom: 'clamp(40px, 5vw, 60px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
        }}
      >
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />

        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span className="talos-pill" style={{ marginBottom: 18 }}>
            <span className="talos-pill-dot" /> Direct Founder Line
          </span>
          <h1
            style={{
              fontSize: 'clamp(38px, 6vw, 64px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: '#FFFFFF',
              marginTop: 10,
            }}
          >
            Start a Conversation.
          </h1>
          <p
            style={{
              color: '#8E8E93',
              fontSize: 'clamp(16px, 2vw, 18px)',
              lineHeight: 1.7,
              marginTop: 14,
              maxWidth: 640,
            }}
          >
            Tell us what you're building. No sales scripts — just an honest, direct discussion about architecture, feasibility, and ROI.
          </p>
        </div>
      </section>

      {/* ── 2. Contact Split Layout ── */}
      <section style={{ background: '#050507', padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 40,
              alignItems: 'start',
            }}
          >
            {/* Left Info Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
                  Direct Contact Details
                </h3>
                <p style={{ color: '#8E8E93', fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>
                  We typically respond within 4–6 business hours. For instant replies, WhatsApp is the fastest channel.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* WhatsApp Quick Connect Card */}
                <a
                  href="https://wa.me/917084499128?text=Hi%20KTUX%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{
                    background: 'linear-gradient(145deg, #10281E 0%, #0A1610 100%)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: 20,
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: '#22C55E', display: 'grid', placeItems: 'center', color: '#050507' }}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <strong style={{ fontSize: 15, display: 'block' }}>Chat on WhatsApp</strong>
                      <span style={{ color: '#22C55E', fontSize: 12, fontWeight: 600 }}>+91 70844 99128 · Instant Response</span>
                    </div>
                  </div>
                  <span style={{ background: '#22C55E', color: '#050507', borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 800 }}>
                    Connect →
                  </span>
                </a>

                {/* Email Item */}
                <div style={{ background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#181820', display: 'grid', placeItems: 'center', color: '#FFFFFF' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <span style={{ color: '#8E8E93', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Email</span>
                    <a href="mailto:ktuxai@zohomail.in" style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'block', marginTop: 2 }}>
                      ktuxai@zohomail.in
                    </a>
                  </div>
                </div>

                {/* Phone Item */}
                <div style={{ background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: '#181820', display: 'grid', placeItems: 'center', color: '#FFFFFF' }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <span style={{ color: '#8E8E93', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>Direct Phone</span>
                    <a href="tel:+917084499128" style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'block', marginTop: 2 }}>
                      +91 70844 99128
                    </a>
                  </div>
                </div>
              </div>

              {/* Consultation Callout */}
              <div style={{ background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 24 }}>
                <span style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 800, display: 'block', marginBottom: 6 }}>
                  Prefer a live video call?
                </span>
                <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                  Book a direct 30-minute calendar appointment via Cal.com without waiting for email replies.
                </p>
                <Link to="/book-consultation" className="button-white" style={{ fontSize: 12, minHeight: 38 }}>
                  Book 30-Min Strategy Call <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Right Form Card */}
            <div
              style={{
                background: '#0C0C10',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 28,
                padding: 'clamp(24px, 4vw, 40px)',
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', color: '#22C55E', display: 'grid', placeItems: 'center', margin: '0 auto 20px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                    <Check size={28} />
                  </div>
                  <h3 style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF' }}>Inquiry Received</h3>
                  <p style={{ color: '#8E8E93', fontSize: 15, maxWidth: 440, margin: '10px auto 24px', lineHeight: 1.6 }}>
                    Thank you! Our engineering team will review your requirements and reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="button-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', margin: 0 }}>
                    Project Discovery Form
                  </h3>

                  {/* Service Selection Pills */}
                  <div>
                    <label style={{ color: '#E4E4E7', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>
                      Services Needed:
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {servicesList.map((srv) => {
                        const isSelected = selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            style={{
                              background: isSelected ? '#FFFFFF' : '#14141A',
                              color: isSelected ? '#050507' : '#8E8E93',
                              border: isSelected ? '1px solid #FFFFFF' : '1px solid rgba(255,255,255,0.08)',
                              borderRadius: 999,
                              padding: '6px 14px',
                              fontSize: 11,
                              fontWeight: isSelected ? 800 : 600,
                              cursor: 'pointer',
                            }}
                          >
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 14 }}>
                    <div>
                      <label htmlFor="contact-name" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Your Name *</label>
                      <input
                        id="contact-name"
                        {...register('name')}
                        placeholder="e.g. Alex Sharma"
                        style={{
                          width: '100%',
                          background: '#14141A',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 12,
                          padding: '12px 14px',
                          color: '#FFFFFF',
                          fontSize: 16,
                          outline: 'none',
                          minHeight: 46,
                        }}
                      />
                      {errors.name && <small style={{ color: '#EF4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.name.message}</small>}
                    </div>

                    <div>
                      <label htmlFor="contact-email" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Work Email *</label>
                      <input
                        id="contact-email"
                        {...register('email')}
                        type="email"
                        placeholder="alex@company.com"
                        style={{
                          width: '100%',
                          background: '#14141A',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 12,
                          padding: '12px 14px',
                          color: '#FFFFFF',
                          fontSize: 16,
                          outline: 'none',
                          minHeight: 46,
                        }}
                      />
                      {errors.email && <small style={{ color: '#EF4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.email.message}</small>}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 14 }}>
                    <div>
                      <label htmlFor="contact-phone" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>WhatsApp / Phone</label>
                      <input
                        id="contact-phone"
                        {...register('phone')}
                        placeholder="+91 98765 43210"
                        style={{
                          width: '100%',
                          background: '#14141A',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 12,
                          padding: '12px 14px',
                          color: '#FFFFFF',
                          fontSize: 16,
                          outline: 'none',
                          minHeight: 46,
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-company" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Company / Brand</label>
                      <input
                        id="contact-company"
                        {...register('company')}
                        placeholder="e.g. Apex Realty"
                        style={{
                          width: '100%',
                          background: '#14141A',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 12,
                          padding: '12px 14px',
                          color: '#FFFFFF',
                          fontSize: 16,
                          outline: 'none',
                          minHeight: 46,
                        }}
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label style={{ color: '#E4E4E7', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>
                      Estimated Budget:
                    </label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setSelectedBudget(b)}
                          style={{
                            background: selectedBudget === b ? '#FFFFFF' : '#14141A',
                            color: selectedBudget === b ? '#050507' : '#8E8E93',
                            border: selectedBudget === b ? '1px solid #FFFFFF' : '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 999,
                            padding: '6px 12px',
                            fontSize: 11,
                            fontWeight: selectedBudget === b ? 800 : 600,
                            cursor: 'pointer',
                          }}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="contact-message" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Project Scope & Objectives *</label>
                    <textarea
                      id="contact-message"
                      {...register('message')}
                      rows={4}
                      placeholder="Describe what you want to build or automate, target launch date, or current challenges..."
                      style={{
                        width: '100%',
                        background: '#14141A',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        padding: '12px 14px',
                        color: '#FFFFFF',
                        fontSize: 16,
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                    {errors.message && <small style={{ color: '#EF4444', fontSize: 12, marginTop: 4, display: 'block' }}>{errors.message.message}</small>}
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="button-white"
                    style={{ width: '100%', justifyContent: 'center', minHeight: 48 }}
                  >
                    {mutation.isPending ? 'Sending Inquiry...' : 'Submit Project Inquiry →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
