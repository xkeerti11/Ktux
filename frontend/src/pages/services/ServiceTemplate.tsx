import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  Check,
  ChevronDown,
  Code2,
  Database,
  Layers3,
  MessageSquare,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CalComBooking } from '../../components/CalComBooking';
import { SectionReveal } from '../../components/SectionReveal';

export interface ServiceConfig {
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
  accent: string;
  problems: string[];
  benefits: string[];
  features: string[];
  workflow?: { step: string; title: string; desc: string }[];
  faqs: Array<{ question: string; answer: string }>;
}

const defaultWorkflow = [
  { step: '01', title: 'Inbound Signal', desc: 'Customer visits website, asks a question, or submits a form.' },
  { step: '02', title: 'AI Reasoning & Decision', desc: 'System parses intent, queries knowledge base, and decides the next best action.' },
  { step: '03', title: 'Automated Execution', desc: 'Instant WhatsApp reply, calendar slot lock, or automated CRM record insertion.' },
  { step: '04', title: 'Human Hand-off & Sync', desc: 'High-value opportunities routed to your team with full context.' },
];

export function ServiceTemplate({ config }: { config: ServiceConfig }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const workflow = config.workflow || defaultWorkflow;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: config.title,
    provider: {
      '@type': 'Organization',
      name: 'KTUX Studio',
      url: 'https://ktux.com',
    },
    description: config.description,
  };

  return (
    <>
      <Helmet>
        <title>{config.title} — KTUX Studio</title>
        <meta name="description" content={config.description} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* ── 1. Hero Section ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.05), transparent 45%), #050507',
          paddingTop: 'clamp(140px, 18vw, 190px)',
          paddingBottom: 'clamp(60px, 8vw, 100px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
        }}
      >
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />

        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <SectionReveal>
            <div style={{ maxWidth: 760 }}>
              <span className="talos-pill" style={{ marginBottom: 18 }}>
                <span className="talos-pill-dot" /> {config.eyebrow}
              </span>

              <h1
                style={{
                  fontSize: 'clamp(38px, 6vw, 64px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: '#FFFFFF',
                  marginTop: 12,
                }}
              >
                {config.title}
              </h1>

              <p
                style={{
                  color: '#8E8E93',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: 1.7,
                  marginTop: 18,
                  maxWidth: 640,
                }}
              >
                {config.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 32 }}>
                <Link to="/book-consultation" className="button-white">
                  Book Free Consultation <ArrowUpRight size={14} />
                </Link>
                <Link to="/portfolio" className="button-glass-play">
                  View Flagship Work <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── 2. The Problems / Pain Points ── */}
      <section
        style={{
          background: '#07070A',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ maxWidth: 640, marginBottom: 44 }}>
              <span className="talos-pill" style={{ marginBottom: 14 }}>
                <span className="talos-pill-dot" /> Common Bottlenecks
              </span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                The Friction We Eliminate
              </h2>
              <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
                Traditional workflows waste time, lose leads, and drain high-value team energy. Here is what we fix.
              </p>
            </div>
          </SectionReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: 16,
            }}
          >
            {config.problems.map((prob, i) => (
              <SectionReveal key={prob} delay={i * 0.04}>
                <div
                  style={{
                    background: '#0C0C10',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 20,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1A1A22', display: 'grid', placeItems: 'center', color: '#EF4444', fontSize: 13, fontWeight: 800 }}>
                    ✕
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>{prob}</h3>
                  <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6 }}>
                    We replace this vulnerability with automated, resilient full-stack systems.
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Visual Workflow Architecture ── */}
      <section
        style={{
          background: '#050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
              <span className="talos-pill" style={{ marginBottom: 14 }}>
                <span className="talos-pill-dot" /> System Architecture
              </span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                How the System Operates
              </h2>
              <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
                Every automated system is architected as an intelligent pipeline that executes with zero manual delay.
              </p>
            </div>
          </SectionReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 16,
              position: 'relative',
            }}
          >
            {workflow.map((step) => (
              <div
                key={step.step}
                style={{
                  background: '#0C0C10',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 20,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF' }}>{step.step}</span>
                <h4 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>{step.title}</h4>
                <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Key Benefits / Deliverables ── */}
      <section
        style={{
          background: '#07070A',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ maxWidth: 640, marginBottom: 44 }}>
              <span className="talos-pill" style={{ marginBottom: 14 }}>
                <span className="talos-pill-dot" /> Measurable Advantages
              </span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                Commercial Business Outcomes
              </h2>
            </div>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
            {config.benefits.map((benefit, i) => (
              <SectionReveal key={benefit} delay={i * 0.04}>
                <div
                  style={{
                    background: '#0C0C10',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 20,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#121218', display: 'grid', placeItems: 'center', color: '#22C55E' }}>
                    <Check size={16} />
                  </div>
                  <h4 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>{benefit}</h4>
                  <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6 }}>
                    Delivered with production-grade engineering and zero technical debt.
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Capability Matrix ── */}
      <section
        style={{
          background: '#050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <span className="talos-pill" style={{ marginBottom: 14 }}>
                <span className="talos-pill-dot" /> Package Comparison
              </span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
                The Right Level of Depth
              </h2>
            </div>
          </SectionReveal>

          <div
            style={{
              background: '#0C0C10',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 24,
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ minWidth: 540 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    padding: '18px 24px',
                    background: '#121218',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: 13,
                  }}
                >
                  <div>Deliverable / Feature</div>
                  <div style={{ textAlign: 'center' }}>Starter</div>
                  <div style={{ textAlign: 'center', color: '#22C55E' }}>Professional</div>
                  <div style={{ textAlign: 'center' }}>Enterprise</div>
                </div>

                {config.features.map((feature, idx) => (
                  <div
                    key={feature}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      padding: '16px 24px',
                      borderBottom: idx === config.features.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.04)',
                      color: '#E4E4E7',
                      fontSize: 13,
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{feature}</div>
                    <div style={{ textAlign: 'center' }}>
                      {idx < 2 ? <Check size={15} style={{ color: '#22C55E', margin: '0 auto' }} /> : <span style={{ color: '#52525B' }}>—</span>}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Check size={15} style={{ color: '#22C55E', margin: '0 auto' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Check size={15} style={{ color: '#22C55E', margin: '0 auto' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAQs ── */}
      <section
        style={{
          background: '#07070A',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 44px' }}>
            <span className="talos-pill" style={{ marginBottom: 14 }}>
              <span className="talos-pill-dot" /> Service FAQs
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {config.faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.question}
                  style={{
                    background: isOpen ? '#14141A' : '#0C0C10',
                    border: isOpen ? '1px solid rgba(255,255,255,0.22)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: 15,
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        color: isOpen ? '#FFFFFF' : '#8E8E93',
                        flexShrink: 0,
                        marginLeft: 12,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 22px 20px', color: '#A1A1AA', fontSize: 14, lineHeight: 1.7 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Booking & Strategy Call Section ── */}
      <section
        style={{
          background: '#050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
            <span className="talos-pill" style={{ marginBottom: 14 }}>
              <span className="talos-pill-dot" /> Schedule Consultation
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
              Let's Discuss Your System
            </h2>
            <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
              Pick a 30-minute slot on Cal.com for a direct architectural consultation with our founders.
            </p>
          </div>

          <div
            style={{
              background: '#0C0C10',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: 24,
            }}
          >
            <CalComBooking height={680} />
          </div>
        </div>
      </section>

      {/* ── 8. Bottom CTA ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 60%), #050507',
          padding: 'clamp(90px, 12vw, 140px) 0',
          textAlign: 'center',
        }}
      >
        <div className="site-container" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <span className="talos-pill">
            <span className="talos-pill-dot" /> Build Next
          </span>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
            Ready to Build Your <br />
            {config.title}?
          </h2>
          <p style={{ color: '#8E8E93', fontSize: 16, maxWidth: 500, lineHeight: 1.7 }}>
            A sharp conversation is all we need to start. Bring the vision — we build the architecture and execution.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
            <Link to="/book-consultation" className="button-white">
              Book Free Consultation <ArrowUpRight size={14} />
            </Link>
            <Link to="/services" className="button-glass-play">
              Explore All Services <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
