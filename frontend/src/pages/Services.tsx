import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowUpRight, Bot, Brain, Check, ChevronDown,
  Code2, Gauge, Layers3, Palette, Rocket, Shield,
  Sparkles, Video, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal } from '../components/SectionReveal';

/* ── Data ─────────────────────────────────────────────────── */
const problems = [
  { icon: Gauge,   title: 'Slow digital performance',    copy: 'Your site loads in 4+ seconds, costing you visitors before they ever see your offer.' },
  { icon: Palette, title: 'Inconsistent brand identity', copy: 'Fragmented visuals and unclear positioning dilute trust and slow down every sale.' },
  { icon: Brain,   title: 'Manual, repetitive workflows', copy: 'Your team wastes hours on tasks AI can handle in seconds — that is operational drag.' },
  { icon: Rocket,  title: 'Weak conversion paths',       copy: 'Traffic arrives but does not convert. The next step is never obvious enough.' },
  { icon: Shield,  title: 'No reliable feedback loop',   copy: 'You cannot improve what you cannot measure. Data stays raw, insight stays absent.' },
  { icon: Layers3, title: 'Outdated tech foundation',    copy: 'Legacy systems slow every decision and increase costs while frustrating your best people.' },
];

const solutions = [
  {
    eyebrow: 'Website Development',
    title: 'Platforms built to convert, not just impress.',
    description: 'We engineer sub-2-second digital experiences that guide every visitor toward the next meaningful action — fully responsive, SEO-ready, and built to compound over time.',
    features: ['Sub-2 second page loads', 'SEO-optimized architecture', 'CMS & admin systems', 'Analytics foundation'],
    accent: '01',
    dark: false,
  },
  {
    eyebrow: 'AI Automation',
    title: 'Intelligent workflows that give your team time back.',
    description: 'We map your most expensive manual processes and replace them with reliable AI automation — trained on your data, integrated into your existing stack, and measurable from day one.',
    features: ['Lead qualification pipelines', 'AI-powered email sequences', 'Document & data processing', 'Real-time monitoring'],
    accent: '02',
    dark: true,
  },
  {
    eyebrow: 'Branding',
    title: 'An identity your audience recognises instantly.',
    description: 'From strategy to visual system — we build brands that carry a clear point of view, show up consistently, and create the kind of trust that shortens every sales conversation.',
    features: ['Brand strategy & positioning', 'Visual identity system', 'Motion guidelines', 'Brand guidelines & kit'],
    accent: '03',
    dark: false,
  },
];

const benefits = [
  { icon: Zap,       title: 'Faster than traditional agencies', desc: 'AI-assisted workflows let us deliver in weeks, not months, without cutting corners on quality.' },
  { icon: Shield,    title: 'Security built-in from day one',   desc: 'Every system is hardened from the ground up — not added as an afterthought.' },
  { icon: Bot,       title: 'AI-powered at every layer',        desc: 'From design to automation, we leverage the latest models to build faster and smarter.' },
  { icon: Sparkles,  title: 'Founder-led, senior delivery',     desc: 'You work directly with the people building — no hand-offs to a junior team.' },
  { icon: Gauge,     title: 'Measured against real outcomes',   desc: 'Every engagement is tied to metrics that matter: leads, conversions, time saved.' },
  { icon: Rocket,    title: 'Zero to production',               desc: 'We take ideas from first principle all the way to deployed, secure, production-grade product.' },
  { icon: Brain,     title: 'AI UGC content systems',           desc: 'Scalable video content pipelines that produce brand-safe UGC at a fraction of the cost.' },
  { icon: Code2,     title: 'Full-stack capability',            desc: 'Frontend, backend, infrastructure, AI — we own the entire stack from day one.' },
];

const timeline = [
  { num: '01', title: 'Discovery',    desc: 'Understand the business, the opportunity, and the constraint.' },
  { num: '02', title: 'Planning',     desc: 'Define scope, milestones, and the first measurable outcome.' },
  { num: '03', title: 'Design',       desc: 'Build with a clear point of view — not a template.' },
  { num: '04', title: 'Development',  desc: 'Ship performant, maintainable, tested code.' },
  { num: '05', title: 'Launch',       desc: 'Go live with confidence. Every detail confirmed.' },
];

const plans = [
  { name: 'Starter',      price: '₹25K',  note: 'one-time project',  desc: 'A confident first system for growing teams.', popular: false, features: ['5 pages', 'Basic SEO foundation', 'Responsive build', 'Admin panel', '30-day support'] },
  { name: 'Professional', price: '₹65K',  note: 'one-time project',  desc: 'For teams ready to compound performance.', popular: true,  features: ['Unlimited pages', 'CMS + admin panel', 'AI lead concierge', 'Analytics setup', '90-day partnership', 'Priority support'] },
  { name: 'Enterprise',   price: 'Custom', note: 'bespoke engagement', desc: 'A complete digital ecosystem, bespoke.', popular: false, features: ['Custom digital ecosystem', 'AI agents & workflows', 'Dedicated strategy lead', 'Ongoing optimisation', 'White-glove onboarding'] },
];

const faqs = [
  { q: 'Can we start with one focused service?',          a: 'Absolutely. Most strong engagements begin with the highest-leverage constraint, then expand once the first system is earning its place.' },
  { q: 'Do you work with startups and established teams?', a: 'Yes. The scope changes, but the standard does not: clear decisions, usable design and a measurable outcome every time.' },
  { q: 'What happens after the consultation?',            a: 'You receive a concise recommendation with priorities, a sensible scope and the next decision — whether or not we work together.' },
  { q: 'How do you price AI automation projects?',        a: 'Based on the complexity of the workflow, the integrations required, and the measurable value created. We build estimates together during discovery.' },
  { q: 'Do you offer ongoing support after launch?',      a: 'Yes — all plans include a post-launch support window. We also offer ongoing partnership agreements for teams that want a committed studio partner.' },
];

/* ── FAQ Accordion ─────────────────────────────────────────── */
function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="accordion-list" style={{ borderTop: '1px solid var(--page-border)' }}>
      {items.map((item, i) => (
        <div key={i} className="accordion-item">
          <button
            className="accordion-trigger"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.q}
            <ChevronDown size={18} className={open === i ? 'rotate-180' : ''} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <p className="accordion-answer">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — KTUX Studio</title>
        <meta name="description" content="Website development, AI automation, branding and creative systems for modern businesses. Premium digital solutions from Ktux Studio." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="services-hero">
        <div className="services-hero-grid" aria-hidden="true" />
        <div className="site-container">
          <div className="services-hero-content">
            <SectionReveal>
              <span className="eyebrow">The studio offer</span>
              <h1 style={{ marginTop: 20 }}>
                Digital systems built<br />to create
                <span className="luxury gold"> lasting leverage.</span>
              </h1>
              <p className="hero-sub-luxury">Craft. Clarity. Compounding value.</p>
              <p className="hero-copy-muted">
                A senior, compact studio across digital product, brand and AI — aligned around the work your business needs next.
              </p>
              <div className="hero-cta-group" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 24 }}>
                <Link className="button-white" to="/book-consultation">
                  Book Free Consultation <ArrowUpRight size={15} />
                </Link>
                <Link className="button-glass-play" to="/portfolio">
                  View Our Work <ArrowUpRight size={15} />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Problems (Dark #09090B) ── */}
      <section className="section section-dark" style={{ background: '#09090B' }}>
        <div className="site-container">
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="eyebrow" style={{ color: '#C9A227' }}>Where we help</span>
              <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF' }}>
                The gaps are usually <span className="luxury gold" style={{ color: '#C9A227' }}>visible.</span>
              </h2>
              <p style={{ color: '#71717A', maxWidth: 540, margin: '16px auto 0', fontSize: 16, lineHeight: 1.7 }}>
                We look for the friction your team has quietly normalised — then design it out.
              </p>
            </div>
          </SectionReveal>
          <div className="icon-problems-grid">
            {problems.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 0.05}>
                <div className="icon-problem-card" style={{ background: '#18181B', border: '1px solid #27272A' }}>
                  <div className="icon-problem-icon" style={{ color: '#C9A227' }}><p.icon size={28} /></div>
                  <h3 style={{ color: '#FFFFFF' }}>{p.title}</h3>
                  <p style={{ color: '#71717A' }}>{p.copy}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solutions (Dark #09090B) ── */}
      <section className="section section-dark" style={{ background: '#09090B', paddingBottom: 0 }}>
        <div className="site-container">
          <SectionReveal>
            <div style={{ marginBottom: 8 }}>
              <span className="eyebrow" style={{ color: '#C9A227' }}>The solution</span>
              <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF' }}>
                Five ways to create <span className="luxury gold" style={{ color: '#C9A227' }}>leverage.</span>
              </h2>
            </div>
          </SectionReveal>
        </div>
        {solutions.map((s, i) => (
          <div key={s.eyebrow} style={{ background: '#09090B', borderBottom: '1px solid #27272A' }}>
            <div className={`site-container solution-row ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="solution-image" style={{ background: 'linear-gradient(135deg,#18181B,#09090B)', border: '1px solid #27272A' }}>
                <span style={{ color: '#C9A227', fontSize: 72, fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '-.04em' }}>{s.accent}</span>
              </div>
              <SectionReveal>
                <div className="solution-text">
                  <span className="eyebrow" style={{ color: '#C9A227' }}>{s.eyebrow}</span>
                  <h3 style={{ color: '#FFFFFF' }}>{s.title}</h3>
                  <p style={{ color: '#71717A' }}>{s.description}</p>
                  <div className="solution-features">
                    {s.features.map(f => (
                      <div key={f} className="solution-feature">
                        <span className="solution-feature-check"><Check size={12} style={{ color: '#C9A227' }} /></span>
                        <span style={{ color: '#FAFAF8' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        ))}
      </section>

      {/* ── Benefits ── */}
      <section className="section section-dark" style={{ background: '#09090B' }}>
        <div className="site-container">
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="eyebrow" style={{ color: '#C9A227' }}>Why Ktux</span>
              <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF' }}>
                Quietly ambitious. <span className="luxury gold" style={{ color: '#C9A227' }}>Operationally useful.</span>
              </h2>
              <p style={{ color: '#71717A', maxWidth: 520, margin: '16px auto 0', fontSize: 16, lineHeight: 1.7 }}>
                A senior studio for teams that care about the details and the measurable outcome on the other side of them.
              </p>
            </div>
          </SectionReveal>
          <div className="benefits-card-grid">
            {benefits.map((b, i) => (
              <SectionReveal key={b.title} delay={i * 0.04}>
                <div className="benefit-feature-card" style={{ background: '#18181B', border: '1px solid #27272A' }}>
                  <b.icon size={28} style={{ color: '#C9A227' }} />
                  <h4 style={{ color: '#FFFFFF' }}>{b.title}</h4>
                  <p style={{ color: '#71717A' }}>{b.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Timeline (Dark #09090B) ── */}
      <section className="section section-dark" style={{ background: '#09090B' }}>
        <div className="site-container">
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span className="eyebrow" style={{ color: '#C9A227' }}>The method</span>
              <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF' }}>
                A clear path from <span className="luxury gold" style={{ color: '#C9A227' }}>signal to shipped.</span>
              </h2>
              <p style={{ color: '#71717A', maxWidth: 480, margin: '16px auto 0', fontSize: 15, lineHeight: 1.7 }}>
                Five deliberate steps. No mystery hand-offs. No unnecessary theatre.
              </p>
            </div>
          </SectionReveal>
          <div className="timeline-track">
            {timeline.map((step, i) => (
              <SectionReveal key={step.num} delay={i * 0.07}>
                <div className="timeline-step-card" style={{ background: '#18181B', border: '1px solid #27272A' }}>
                  <div className="timeline-num" style={{ color: '#C9A227' }}>{step.num}</div>
                  <h4 style={{ color: '#FFFFFF' }}>{step.title}</h4>
                  <p style={{ color: '#71717A' }}>{step.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className="section section-dark">
        <div className="site-container">
          <SectionReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span className="eyebrow">Investment</span>
                <h2 className="section-title" style={{ marginTop: 16, color: '#fafaf8' }}>
                  Choose the right <span className="luxury gold">partnership level.</span>
                </h2>
              </div>
              <Link className="text-link" to="/pricing" style={{ color: '#c9a227' }}>
                Full pricing details <ArrowUpRight size={15} />
              </Link>
            </div>
          </SectionReveal>
          <div className="plans-grid-enhanced">
            {plans.map((plan, i) => (
              <SectionReveal key={plan.name} delay={i * 0.07}>
                <div className={`plan-card-enhanced${plan.popular ? ' popular' : ''}`}>
                  {plan.popular && <span className="plan-popular-badge">Most popular</span>}
                  <p className="plan-name">{plan.name}</p>
                  <p className="plan-price-display">{plan.price}</p>
                  <p className="plan-price-note">{plan.note}</p>
                  <p className="plan-description">{plan.desc}</p>
                  <Link className={`plan-cta${!plan.popular ? ' ghost' : ''}`} to={plan.name === 'Enterprise' ? '/contact' : '/book-consultation'}>
                    {plan.name === 'Enterprise' ? 'Talk to us' : 'Choose this plan'} <ArrowUpRight size={14} />
                  </Link>
                  <ul className="plan-features-list">
                    {plan.features.map(f => (
                      <li key={f} className="plan-feature-item">
                        <Check size={14} className="incl" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (Dark #09090B) ── */}
      <section className="section section-dark" style={{ background: '#09090B' }}>
        <div className="site-container">
          <div className="faq-layout" style={{ color: '#FFFFFF' }}>
            <SectionReveal>
              <div>
                <span className="eyebrow" style={{ color: '#C9A227' }}>Good to know</span>
                <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF' }}>
                  Before we <span className="luxury gold" style={{ color: '#C9A227' }}>begin.</span>
                </h2>
              </div>
            </SectionReveal>
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      {/* ── Dual CTA ── */}
      <section className="dual-cta-section">
        <div className="site-container">
          <div className="dual-cta-inner">
            <span className="eyebrow"><Sparkles size={13} /> Start with one good question</span>
            <h2>What should your business<br /><span className="luxury gold">do next?</span></h2>
            <p>Bring the ambition. We'll bring a sharp read on what to do next and a clear route to the first useful release.</p>
            <div className="dual-cta-btns" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
              <Link className="button-white" to="/book-consultation">
                Book Free Consultation <ArrowUpRight size={15} />
              </Link>
              <Link className="button-glass-play" to="/contact">
                Send Us a Message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
