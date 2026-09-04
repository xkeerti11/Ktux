import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUpRight, Bot, Lightbulb, Rocket, ShieldCheck, Sparkles, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionReveal } from '../components/SectionReveal';
import { FounderCard } from '../components/FounderCard';

const stats = [
  { number: '100+', label: 'Happy clients across industries' },
  { number: '250+', label: 'Projects shipped to production' },
  { number: '50+',  label: 'Industries served worldwide' },
  { number: '2',    label: 'Founders. Full stack. All AI.' },
];

const story = [
  {
    eyebrow: 'Our Origin',
    title: 'Built entirely with AI superpowers.',
    body: [
      'KTUX Studio was founded by two builders who believe that with modern AI tools and deep architectural discipline, a lean, founder-led studio can out-execute a bloated 50-person agency.',
      'From your initial sprint strategy to production security deployment — every layer is built and owned personally by the founders.',
    ],
  },
  {
    eyebrow: 'Our Method',
    title: 'Zero to production, every time.',
    body: [
      'We do not outsource. We do not pass clients off to junior account managers. Every line of TypeScript, AI prompt pipeline, and database schema is crafted by the people you talk to on day one.',
      'That means faster decisions, zero translation errors, and high-converting systems that compound business revenue.',
    ],
  },
];

const values = [
  { icon: ShieldCheck, title: 'Security-First Architecture', copy: 'Every project ships with AES-256 encryption, rate-limiting, and sanitized inputs from day one.' },
  { icon: Lightbulb,  title: 'AI-Native Engineering', copy: 'We leverage cutting-edge AI tools to build 2x faster at a fraction of traditional agency overhead.' },
  { icon: Rocket,     title: 'Zero to Launch', copy: 'We turn your idea into a fully deployed, high-converting digital asset with full source ownership.' },
  { icon: Zap,        title: 'Founder-Led Speed', copy: 'Work directly with the architects. High velocity with zero bureaucratic friction.' },
  { icon: Users,      title: 'Commercial Outcome Focus', copy: 'We measure success by your metrics: qualified leads, hours saved, and revenue compounded.' },
  { icon: Sparkles,   title: 'Luxury Craft & Polish', copy: 'Aesthetic elegance and technical speed are engineered together in every single build.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About KTUX Studio — Founders & AI Philosophy</title>
        <meta
          name="description"
          content="Meet the founders behind KTUX Studio. We engineer full-stack platforms, autonomous AI agents, and custom workflow automations."
        />
      </Helmet>

      {/* ── 1. Hero ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.05), transparent 45%), #050507',
          paddingTop: 'clamp(110px, 16vw, 170px)',
          paddingBottom: 'clamp(40px, 6vw, 70px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
        }}
      >
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />

        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <SectionReveal>
            <span className="talos-pill" style={{ marginBottom: 18 }}>
              <span className="talos-pill-dot" /> Founder-Led AI Studio
            </span>
            <h1
              style={{
                fontSize: 'clamp(32px, 6vw, 64px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginTop: 10,
              }}
            >
              We Build Entire Systems <br />
              <span style={{ color: '#E4E4E7' }}>0 to Production.</span>
            </h1>
            <p
              style={{
                color: '#8E8E93',
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.7,
                marginTop: 14,
                maxWidth: 640,
              }}
            >
              Two founders. Full AI stack. We take your business vision from zero to a fully deployed, high-converting digital system — personally.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
              <Link to="/book-consultation" className="button-white">
                Book Free Consultation <ArrowUpRight size={14} />
              </Link>
              <Link to="/portfolio" className="button-glass-play">
                View Flagship Work <ArrowUpRight size={14} />
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── 2. Key Stats Strip ── */}
      <section style={{ background: '#07070A', padding: 'clamp(36px, 5vw, 50px) 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
            {stats.map((s) => (
              <div key={s.number} style={{ background: '#0C0C10', padding: '20px 24px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                <strong style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, color: '#FFFFFF', display: 'block' }}>{s.number}</strong>
                <span style={{ color: '#8E8E93', fontSize: 13, marginTop: 4, display: 'block' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Origin & Ethos Stories ── */}
      <section style={{ background: '#050507', padding: 'clamp(60px, 8vw, 120px) 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 5vw, 60px)' }}>
            {story.map((st, i) => (
              <SectionReveal key={st.title} delay={i * 0.1}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: 'clamp(24px, 4vw, 40px)',
                    alignItems: 'center',
                    background: '#0C0C10',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 24,
                    padding: 'clamp(24px, 4vw, 48px)',
                  }}
                >
                  <div>
                    <span className="talos-pill" style={{ marginBottom: 14 }}>
                      <span className="talos-pill-dot" /> {st.eyebrow}
                    </span>
                    <h3 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginTop: 8 }}>
                      {st.title}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {st.body.map((para, j) => (
                      <p key={j} style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.7 }}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Founders Section ── */}
      <section style={{ background: '#07070A', padding: 'clamp(80px, 10vw, 120px) 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 44px' }}>
            <span className="talos-pill" style={{ marginBottom: 14 }}>
              <span className="talos-pill-dot" /> The People
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
              Meet The Founders
            </h2>
            <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
              Direct access. No account managers. Every conversation is with the builders themselves.
            </p>
          </div>

          <FounderCard />
        </div>
      </section>

      {/* ── 5. Values ── */}
      <section style={{ background: '#050507', padding: 'clamp(80px, 10vw, 120px) 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 44px' }}>
            <span className="talos-pill" style={{ marginBottom: 14 }}>
              <span className="talos-pill-dot" /> Operating Principles
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginTop: 8 }}>
              How We Build & Operate
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {values.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.04}>
                <div style={{ background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#14141A', display: 'grid', placeItems: 'center', color: '#FFFFFF' }}>
                    <v.icon size={18} />
                  </div>
                  <h4 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>{v.title}</h4>
                  <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6 }}>{v.copy}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Bottom CTA ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 60%), #050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          textAlign: 'center',
        }}
      >
        <div className="site-container" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <span className="talos-pill">
            <span className="talos-pill-dot" /> Start Today
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#FFFFFF' }}>
            Tell Us Your Vision. <br />
            We Build Everything.
          </h2>
          <p style={{ color: '#8E8E93', fontSize: 16, maxWidth: 500, lineHeight: 1.7 }}>
            Bring the idea. We bring the architectural discipline, rapid execution, and technical accountability.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book-consultation" className="button-white">
              Book Free Consultation <ArrowUpRight size={14} />
            </Link>
            <Link to="/contact" className="button-glass-play">
              Send Direct Message →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
