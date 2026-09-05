import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, Check, Minus, Plus, Layers3, Bot, Zap, Code2, BarChart3, Shield, Palette, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEstimate } from '../lib/api/endpoints';
import { SectionReveal } from '../components/SectionReveal';

/* ── Data ── */
const plans = [
  {
    name: 'Starter', price: '₹25K', priceAnnual: '₹22.5K', note: '/ project',
    desc: 'A confident first digital system for growing businesses.',
    popular: false,
    features: [
      { text: '5-page website build', incl: true },
      { text: 'Basic SEO foundation', incl: true },
      { text: 'Mobile-responsive build', incl: true },
      { text: 'Admin panel', incl: true },
      { text: '30-day support', incl: true },
      { text: 'AI integrations', incl: false },
      { text: 'CMS & content system', incl: false },
    ],
  },
  {
    name: 'Professional', price: '₹65K', priceAnnual: '₹58.5K', note: '/ project',
    desc: 'For teams ready to compound performance through every layer.',
    popular: true,
    features: [
      { text: 'Unlimited pages', incl: true },
      { text: 'CMS & admin panel', incl: true },
      { text: 'AI lead concierge', incl: true },
      { text: 'Analytics foundation', incl: true },
      { text: '90-day partnership', incl: true },
      { text: 'Priority support', incl: true },
      { text: 'White-glove onboarding', incl: false },
    ],
  },
  {
    name: 'Enterprise', price: 'Custom', priceAnnual: 'Custom', note: '/ bespoke',
    desc: 'A complete, bespoke digital ecosystem built to endure.',
    popular: false,
    features: [
      { text: 'Custom digital ecosystem', incl: true },
      { text: 'AI agents & workflows', incl: true },
      { text: 'Dedicated strategy lead', incl: true },
      { text: 'Ongoing optimisation', incl: true },
      { text: 'White-glove onboarding', incl: true },
      { text: 'Priority support', incl: true },
      { text: 'Custom SLA', incl: true },
    ],
  },
];

const compareFeatures = [
  { label: 'Pages',                 starter: '5', pro: 'Unlimited', ent: 'Unlimited' },
  { label: 'SEO foundation',        starter: true, pro: true, ent: true },
  { label: 'Admin panel',           starter: true, pro: true, ent: true },
  { label: 'CMS system',            starter: false, pro: true, ent: true },
  { label: 'AI integrations',       starter: false, pro: true, ent: true },
  { label: 'Analytics setup',       starter: false, pro: true, ent: true },
  { label: 'Dedicated lead',        starter: false, pro: false, ent: true },
  { label: 'Custom SLA',            starter: false, pro: false, ent: true },
  { label: 'Support window',        starter: '30 days', pro: '90 days', ent: 'Ongoing' },
];

const addons = [
  { icon: Bot,      title: 'AI Lead Concierge',  price: '+₹10K', desc: 'Automated qualification, nurturing, and follow-up for inbound leads — powered by your CRM.' },
  { icon: Zap,      title: 'AI Automation Suite', price: '+₹15K', desc: 'Custom workflow automation: email sequences, data processing, internal ops, Slack bots.' },
  { icon: Code2,    title: 'E-commerce Layer',    price: '+₹12K', desc: 'Full-featured online store with payment gateway, inventory, and order management.' },
  { icon: BarChart3, title: 'Analytics & BI',     price: '+₹8K',  desc: 'Custom dashboard with real-time KPIs, funnel tracking, and automated weekly reports.' },
  { icon: Shield,   title: 'Security Hardening',  price: '+₹6K',  desc: 'Penetration testing, SSL, CSP headers, rate limiting, and a full security audit.' },
  { icon: Globe,    title: 'Multi-language',       price: '+₹8K',  desc: 'Full i18n support — content translated, hreflang configured, SEO preserved per locale.' },
];

const faqs = [
  { q: 'Are these fixed prices?',              a: 'These are starting points. Every project is scoped during discovery. The final number reflects your exact requirements — no surprises.' },
  { q: 'What does the annual discount cover?', a: 'Annual retainer agreements receive 10% off the base rate. Ideal for ongoing partnerships where we maintain, optimise and expand your system.' },
  { q: 'Can I add services after launch?',     a: 'Yes. Add-ons can be introduced at any point. We design systems to be extensible from day one.' },
  { q: 'Do you offer payment plans?',          a: 'Yes. Most projects are structured as 50% upfront and 50% on delivery, with milestone-based options for larger engagements.' },
  { q: 'What currencies do you accept?',       a: 'We primarily price in INR for Indian clients and USD for international. Both are available.' },
];

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="accordion-list" style={{ display: 'grid', gap: 12, borderTop: 0 }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="accordion-item"
          style={{
            background: '#18181B',
            border: '1px solid #4A4A4E',
            borderRadius: 16,
            padding: '4px 20px',
            transition: 'border-color 0.2s ease',
          }}
        >
          <button
            className="accordion-trigger"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700 }}
          >
            {item.q}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={open === i ? 'rotate-180' : ''} style={{ flexShrink: 0, color: '#C9A227' }}><path d="m6 9 6 6 6-6" /></svg>
          </button>
          {open === i && <p className="accordion-answer" style={{ color: '#71717A', paddingBottom: 16 }}>{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

function CheckIcon() {
  return <Check size={15} className="tick" style={{ color: '#C9A227', flexShrink: 0 }} />;
}
function DashIcon() {
  return <Minus size={15} className="dash" style={{ color: '#E4E4E7', flexShrink: 0 }} />;
}

/* ── Page ── */
export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [pages, setPages]   = useState(5);
  const [addonsState, setAddonsState] = useState({ ecommerce: false, aiFeatures: false });

  const { data: estimate, isFetching } = useQuery({
    queryKey: ['estimate', pages, addonsState.ecommerce, addonsState.aiFeatures],
    queryFn: () => getEstimate({ pages, ecommerce: addonsState.ecommerce, aiFeatures: addonsState.aiFeatures }),
    staleTime: 30_000,
  });

  const fmt = (v: number) => `₹${Math.round(v / 1000)}K`;
  const estimateStr = estimate ? `${fmt(estimate.min)} — ${fmt(estimate.max)}` : '₹25K — ₹40K';

  return (
    <>
      <Helmet>
        <title>Pricing — KTUX Studio</title>
        <meta name="description" content="Transparent pricing for digital platforms and AI systems from Ktux Studio. Starter, Professional and Enterprise plans." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="pricing-page-hero" style={{ background: '#050507', paddingTop: 'clamp(110px, 16vw, 170px)', paddingBottom: 'clamp(30px, 5vw, 60px)' }}>
        <div className="site-container" style={{ textAlign: 'center' }}>
          <SectionReveal>
            <span className="talos-pill" style={{ marginBottom: 16 }}>
              <span className="talos-pill-dot" /> Transparent Investment
            </span>
            <h1 className="display" style={{ marginTop: 20, maxWidth: 800, marginInline: 'auto', color: '#FFFFFF', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900 }}>
              Good work is an <br /><span style={{ color: '#E4E4E7' }}>operating asset.</span>
            </h1>
            <p style={{ color: '#8E8E93', maxWidth: 520, margin: '16px auto 30px', fontSize: 16, lineHeight: 1.7 }}>
              Choose the level of partnership that matches your next chapter — then shape the details together.
            </p>
            {/* Billing toggle */}
            <div className="billing-toggle" style={{ display: 'inline-flex', background: '#0D0D11', border: '1px solid rgba(255,255,255,0.1)', padding: 4, borderRadius: 999 }}>
              <button
                className={!annual ? 'active' : ''}
                onClick={() => setAnnual(false)}
                style={{
                  background: !annual ? '#FFFFFF' : 'transparent',
                  color: !annual ? '#050507' : '#8E8E93',
                  borderRadius: 999,
                  padding: '8px 18px',
                  fontWeight: 700,
                  fontSize: 13,
                  minHeight: 40,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s',
                }}
              >
                Monthly
              </button>
              <button
                className={annual ? 'active' : ''}
                onClick={() => setAnnual(true)}
                style={{
                  background: annual ? '#FFFFFF' : 'transparent',
                  color: annual ? '#050507' : '#8E8E93',
                  borderRadius: 999,
                  padding: '8px 18px',
                  fontWeight: 700,
                  fontSize: 13,
                  minHeight: 40,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s',
                }}
              >
                Annual <span style={{ color: '#10B981', fontWeight: 800 }}>Save 10%</span>
              </button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="section section-dark" style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container">
          <div className="plans-grid-enhanced" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {plans.map((plan, i) => (
              <SectionReveal key={plan.name} delay={i * 0.07}>
                <div
                  className={`plan-card-enhanced${plan.popular ? ' popular' : ''}`}
                  style={{
                    background: plan.popular ? '#FFFFFF' : '#0C0C10',
                    color: plan.popular ? '#050507' : '#FFFFFF',
                    border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    padding: 'clamp(24px, 4vw, 36px)',
                    borderRadius: 24,
                    boxShadow: plan.popular ? '0 20px 50px rgba(255,255,255,0.15)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {plan.popular && (
                    <span style={{ background: '#050507', color: '#FFFFFF', fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 999, alignSelf: 'flex-start', marginBottom: 14 }}>
                      MOST POPULAR
                    </span>
                  )}
                  <p className="plan-name" style={{ color: plan.popular ? '#050507' : '#FFFFFF', fontSize: 22, fontWeight: 800 }}>{plan.name}</p>
                  <p className="plan-price-display" style={{ color: plan.popular ? '#050507' : '#FFFFFF', fontSize: 'clamp(36px, 5vw, 44px)', fontWeight: 900, margin: '14px 0 6px' }}>{annual ? plan.priceAnnual : plan.price}</p>
                  <p className="plan-price-note" style={{ color: plan.popular ? '#71717A' : '#8E8E93', fontSize: 12 }}>{plan.note}{annual && plan.price !== 'Custom' ? ' · annual rate' : ''}</p>
                  <p className="plan-description" style={{ color: plan.popular ? '#52525B' : '#8E8E93', fontSize: 13, margin: '14px 0 24px', lineHeight: 1.6 }}>{plan.desc}</p>
                  <Link
                    style={{
                      background: plan.popular ? '#050507' : '#FFFFFF',
                      color: plan.popular ? '#FFFFFF' : '#050507',
                      fontWeight: 800,
                      borderRadius: 999,
                      padding: '12px 20px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: 13,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      marginBottom: 28,
                      minHeight: 46,
                    }}
                    to={plan.name === 'Enterprise' ? '/contact' : '/book-consultation'}
                  >
                    {plan.name === 'Enterprise' ? 'Talk to us →' : 'Choose this plan →'}
                  </Link>
                  <ul className="plan-features-list" style={{ listStyle: 'none', padding: 0, margin: 'auto 0 0', display: 'flex', flexDirection: 'column', gap: 12, borderTop: plan.popular ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
                    {plan.features.map(f => (
                      <li key={f.text} className={`plan-feature-item${!f.incl ? ' excluded' : ''}`} style={{ color: plan.popular ? (f.incl ? '#18181B' : '#A1A1AA') : (f.incl ? '#E4E4E7' : '#71717A'), fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {f.incl
                          ? <Check size={14} className="incl" style={{ color: plan.popular ? '#050507' : '#22C55E', flexShrink: 0 }} />
                          : <Minus size={14} className="excl" style={{ color: plan.popular ? '#D4D4D8' : '#3F3F46', flexShrink: 0 }} />}
                        {f.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="section section-dark" style={{ background: '#07070A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container">
          <SectionReveal>
            <span className="talos-pill" style={{ marginBottom: 16 }}>
              <span className="talos-pill-dot" /> Feature comparison
            </span>
            <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>
              Everything side by side.
            </h2>
          </SectionReveal>
          <div className="compare-scroll-wrapper">
            <div className="compare-table" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden', background: '#0C0C10', marginTop: 32, minWidth: 540 }}>
              <div className="compare-header-row" style={{ background: '#050507', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="compare-header-cell" style={{ color: '#FFFFFF' }}>Feature</div>
                <div className="compare-header-cell" style={{ color: '#FFFFFF' }}>Starter</div>
                <div className="compare-header-cell" style={{ color: '#FFFFFF' }}>Professional</div>
                <div className="compare-header-cell" style={{ color: '#FFFFFF' }}>Enterprise</div>
              </div>
              {compareFeatures.map((row, idx) => (
                <div key={row.label} className="compare-data-row" style={{ background: idx % 2 === 0 ? '#0C0C10' : '#08080B', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="compare-cell" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 14 }}>{row.label}</div>
                  <div className="compare-cell" style={{ color: '#8E8E93' }}>
                    {row.starter === true ? <Check size={15} style={{ color: '#22C55E' }} /> : row.starter === false ? <Minus size={15} style={{ color: '#3F3F46' }} /> : row.starter}
                  </div>
                  <div className="compare-cell" style={{ color: '#8E8E93' }}>
                    {row.pro === true ? <Check size={15} style={{ color: '#22C55E' }} /> : row.pro === false ? <Minus size={15} style={{ color: '#3F3F46' }} /> : row.pro}
                  </div>
                  <div className="compare-cell" style={{ color: '#8E8E93' }}>
                    {row.ent === true ? <Check size={15} style={{ color: '#22C55E' }} /> : row.ent === false ? <Minus size={15} style={{ color: '#3F3F46' }} /> : row.ent}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Add-ons ── */}
      <section className="section section-dark" style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container">
          <SectionReveal>
            <span className="talos-pill" style={{ marginBottom: 16 }}>
              <span className="talos-pill-dot" /> Extend your system
            </span>
            <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF', marginBottom: 40, fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>
              Power-ups for any plan.
            </h2>
          </SectionReveal>
          <div className="addons-grid">
            {addons.map((a, i) => (
              <SectionReveal key={a.title} delay={i * 0.05}>
                <div className="addon-feature-card" style={{ background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', padding: 24, borderRadius: 20 }}>
                  <div className="addon-feature-icon" style={{ color: '#FFFFFF', marginBottom: 14 }}><a.icon size={28} /></div>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700 }}>{a.title}</h4>
                    <p className="addon-feature-price" style={{ color: '#22C55E', fontWeight: 800, fontSize: 15, margin: '6px 0 10px' }}>{a.price}</p>
                    <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6 }}>{a.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="section section-dark" style={{ background: '#07070A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container" style={{ maxWidth: 700, marginInline: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <SectionReveal>
              <span className="talos-pill" style={{ marginBottom: 16 }}>
                <span className="talos-pill-dot" /> Build your estimate
              </span>
              <h2 className="section-title" style={{ marginTop: 16, color: '#FFFFFF', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800 }}>
                A useful number to begin with.
              </h2>
              <p className="section-copy" style={{ marginTop: 12, color: '#8E8E93', marginInline: 'auto' }}>
                Adjust the scale, then use the range as a conversation starter — not a false precision.
              </p>
            </SectionReveal>
          </div>

          <div className="calculator-card surface-card" style={{ background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(20px, 4vw, 32px)', borderRadius: 24 }}>
            {/* Pages stepper */}
            <div className="calculator-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 13, textTransform: 'uppercase' }}>Pages</span>
              <div className="stepper" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button style={{ background: '#181820', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', borderRadius: 8, width: 38, height: 38, display: 'grid', placeItems: 'center', cursor: 'pointer' }} aria-label="Remove page" onClick={() => setPages(p => Math.max(1, p - 1))}><Minus size={15} /></button>
                <strong style={{ color: '#FFFFFF', fontSize: 18 }}>{pages}</strong>
                <button style={{ background: '#181820', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', borderRadius: 8, width: 38, height: 38, display: 'grid', placeItems: 'center', cursor: 'pointer' }} aria-label="Add page" onClick={() => setPages(p => Math.min(100, p + 1))}><Plus size={15} /></button>
              </div>
            </div>
            <input
              className="calc-range"
              type="range" min={1} max={50} value={pages}
              onChange={e => setPages(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FFFFFF', marginBottom: 20 }}
            />

            {/* Add-ons */}
            <div className="addon-list" style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                className={`addon-row${addonsState.ecommerce ? ' selected' : ''}`}
                onClick={() => setAddonsState(s => ({ ...s, ecommerce: !s.ecommerce }))}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, background: '#121217', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#FFFFFF', cursor: 'pointer' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="addon-check">{addonsState.ecommerce && <Check size={12} />}</span>E-commerce layer</span>
                <span style={{ color: '#22C55E', fontWeight: 700 }}>+₹12K</span>
              </button>
              <button
                className={`addon-row${addonsState.aiFeatures ? ' selected' : ''}`}
                onClick={() => setAddonsState(s => ({ ...s, aiFeatures: !s.aiFeatures }))}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, background: '#121217', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#FFFFFF', cursor: 'pointer' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="addon-check">{addonsState.aiFeatures && <Check size={12} />}</span>AI features</span>
                <span style={{ color: '#22C55E', fontWeight: 700 }}>+₹10K</span>
              </button>
            </div>

            {/* Estimate */}
            <div className="calc-estimate-box" style={{ background: '#FFFFFF', borderRadius: 20, padding: 28, marginTop: 24, color: '#050507', textAlign: 'center' }}>
              <p className="calc-estimate-label" style={{ color: '#71717A', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>{isFetching ? 'Calculating…' : 'Estimated range'}</p>
              <p className="calc-estimate-value" style={{ color: '#050507', fontSize: 38, fontWeight: 900, margin: '8px 0 16px' }}>{estimateStr}</p>
              <Link className="calc-cta-outline" to="/book-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#050507', color: '#FFFFFF', borderRadius: 999, padding: '10px 24px', textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
                Discuss this estimate <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section-dark" style={{ background: '#050507', paddingBlock: 80, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container" style={{ maxWidth: 800, marginInline: 'auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span className="talos-pill" style={{ marginBottom: 14 }}>
                <span className="talos-pill-dot" /> Questions & Answers
              </span>
              <h2 className="section-title" style={{ color: '#FFFFFF', marginTop: 14, fontSize: 36, fontWeight: 800 }}>
                Frequently asked questions.
              </h2>
            </div>
          </SectionReveal>
          <Faq items={faqs} />
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section" style={{ background: '#0C0C10', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 24px', textAlign: 'center' }}>
        <div className="site-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <span className="talos-pill">
            <span className="talos-pill-dot" /> Ready to invest?
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800 }}>
            Start a conversation.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 14 }}>
            <Link to="/book-consultation" className="button-white">
              Book a Free Consultation <ArrowUpRight size={15} />
            </Link>
            <Link to="/portfolio" className="button-glass-play">
              See Our Work <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
