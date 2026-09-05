import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  Check,
  ChevronDown,
  Code2,
  HeartHandshake,
  Layers3,
  Lightbulb,
  Palette,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Video,
  Wrench,
  Zap,
} from 'lucide-react';
import { ChromeStar } from '../components/ChromeStar';
import { ProjectLivePreview } from '../components/ProjectLivePreview';
import { SectionReveal } from '../components/SectionReveal';
import { RoiCalculator } from '../components/RoiCalculator';
import { SolutionFinder } from '../components/SolutionFinder';

// ── PRD Section 1.2: Services ──
const services = [
  {
    icon: Code2,
    title: 'Website Development',
    desc: 'Premium, SEO-optimized, mobile-first websites with admin panels.',
    href: '/services/website-development',
    tag: 'Core Offering',
  },
  {
    icon: Zap,
    title: 'AI Automation',
    desc: 'Custom AI solutions to automate workflows and reduce manual tasks by 80%.',
    href: '/services/ai-automation',
    tag: 'High ROI',
  },
  {
    icon: Video,
    title: 'AI UGC Ads',
    desc: 'AI-generated user-generated content for marketing with 3-5x higher CTR.',
    href: '/services/ai-ugc-ads',
    tag: 'Growth',
  },
  {
    icon: Palette,
    title: 'Branding',
    desc: 'Logo, visual identity, brand guidelines, and distinctive design systems.',
    href: '/services/branding',
    tag: 'Identity',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    desc: 'Intelligent conversational chatbots and autonomous virtual assistants.',
    href: '/services/ai-agents',
    tag: 'Next-Gen',
  },
];

// ── 5-Step Delivery Framework ──
const processSteps = [
  { step: '01', title: 'DISCOVER', desc: 'Deep dive into your business bottleneck, audience intent, and system constraints.', icon: Rocket },
  { step: '02', title: 'ARCHITECT', desc: 'Bespoke UI/UX wireframes, technical schema, and AI automation pipeline mapping.', icon: Lightbulb },
  { step: '03', title: 'BUILD', desc: 'Clean, modular full-stack TypeScript engineering with rapid iterative sprints.', icon: Code2 },
  { step: '04', title: 'LAUNCH', desc: 'Sub-1.2s performance tuning, security verification, and zero-downtime deployment.', icon: Sparkles },
  { step: '05', title: 'SCALE & IMPROVE', desc: 'Continuous SLA monitoring, conversion analysis, and automated scaling.', icon: HeartHandshake },
];

// ── PRD Section 1.4: Flagship Featured Projects ──
const projects = [
  {
    title: 'Aurevia Health',
    slug: 'aurevia-health',
    industry: 'Healthcare & Clinical',
    metric: '0 Conflicts · AES-256-GCM',
    liveUrl: 'https://aureviahealth.netlify.app',
    image: '/images/projects/aurevia.jpg',
  },
  {
    title: 'FluentAI',
    slug: 'fluentai',
    industry: 'AI & Education',
    metric: 'BYOK Zero-Cost · Voice AI Aria',
    liveUrl: 'https://fluentai-ten.vercel.app',
    image: '/images/projects/fluentai.jpg',
  },
  {
    title: 'ChatSphere',
    slug: 'chatsphere',
    industry: 'Real-Time & Social',
    metric: '<50ms Latency · WebRTC Audio',
    liveUrl: 'https://chatsphere-iota.vercel.app',
    image: '/images/projects/chatsphere.jpg',
  },
  {
    title: 'Monarch Residences',
    slug: 'monarch-residences',
    industry: 'Luxury Real Estate',
    metric: '60 FPS GSAP · Multi-Currency',
    liveUrl: 'https://monarch-residences.netlify.app/',
    image: '/images/projects/monarch.jpg',
  },
];

// ── PRD Section 1.7: FAQs ──
const faqs = [
  {
    question: "What's your typical project timeline?",
    answer:
      'Most MVP and standard sprint projects go live within 2 to 4 weeks. Custom enterprise ecosystems typically take 6 to 8 weeks depending on complex AI integrations.',
  },
  {
    question: 'Do you provide ongoing support after project launch?',
    answer:
      'Yes, every package includes post-launch support (30 days for Starter, 90 days for Professional, and continuous dedicated SLA for Enterprise) covering maintenance, security, and updates.',
  },
  {
    question: 'Can I modify and update the website after launch?',
    answer:
      'Absolutely. All our websites include an intuitive admin panel and CMS, allowing you to update copy, media, blogs, and content without writing a single line of code.',
  },
  {
    question: 'How do you structure payment plans?',
    answer:
      'Most projects are structured as 50% upfront upon agreement and 50% upon delivery/launch. For larger scale engagements, we offer milestone-based payment schedules.',
  },
  {
    question: 'What industries do you specialize in?',
    answer:
      'We serve real estate, healthcare clinics, legal firms, educational platforms, high-growth startups, e-commerce brands, and local businesses worldwide.',
  },
];

// ── PRD Section 1.6: Testimonials ──
const testimonials = [
  {
    name: 'Vikram Mehta',
    role: 'Founder & CEO, Apex Realty Group',
    quote:
      'KTUX Studio built a luxury real estate platform that doubled our inbound inquiries in the first month. The speed, design aesthetic, and engineering quality are exceptional.',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'Co-Founder, EduVoice AI',
    quote:
      'The AI automation and conversational voice integration worked flawlessly right from launch day. The team delivered 2x faster than any traditional agency we worked with.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'CTO, Nexus Healthcare',
    quote:
      'Zero-collision booking locks and enterprise-grade encryption out of the box. KTUX Studio is our go-to partner for all critical digital platforms.',
    rating: 5,
  },
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'KTUX Studio',
    url: 'https://ktux.com',
    logo: 'https://ktux.com/favicon.svg',
    description:
      'Premium full-stack web development, custom autonomous AI agents, and workflow automations engineered for modern businesses.',
    telephone: '+917084499128',
    email: 'ktuxai@zohomail.in',
    sameAs: ['https://github.com/xkeerti11/Aurevia'],
  };

  return (
    <>
      <Helmet>
        <title>KTUX Studio — Premium Digital Solutions for Modern Businesses</title>
        <meta
          name="description"
          content="Premium full-stack web development, custom AI automation, branding, and AI systems engineered for modern ambitious businesses."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── 1. Hero Section (PRD Section 1.1 with Reference Image Aesthetic) ── */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'clamp(110px, 16vw, 170px)',
          paddingBottom: 'clamp(48px, 6vw, 80px)',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.05), transparent 45%), #050507',
        }}
      >
        {/* Subtle Background Grid Mesh */}
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />

        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              alignItems: 'center',
              gap: 'clamp(28px, 5vw, 48px)',
            }}
          >
            {/* Left Hero Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
              {/* Top Announcement Pill */}
              <Link to="/services/ai-automation" className="talos-pill" style={{ alignSelf: 'flex-start' }}>
                <span className="talos-pill-dot" />
                <span>Latest AI & Full-Stack Systems</span>
                <ArrowRight size={13} style={{ opacity: 0.7 }} />
              </Link>

              {/* High-Impact Targeted Headline */}
              <h1
                style={{
                  fontSize: 'clamp(34px, 6.5vw, 68px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.08,
                  color: '#FFFFFF',
                }}
              >
                Websites, AI automation & digital systems built for <span style={{ color: '#E4E4E7' }}>ambitious businesses.</span>
              </h1>

              {/* Outcome-Driven Subheading */}
              <p
                style={{
                  fontSize: 'clamp(16px, 2.2vw, 20px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Faster execution. Less manual drag. Systems that scale.
              </p>

              {/* Value Proposition Description */}
              <p
                style={{
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  color: '#8E8E93',
                  lineHeight: 1.7,
                  maxWidth: 540,
                }}
              >
                We replace slow agency timelines and bloated templates with custom, high-converting digital platforms and autonomous AI workflows that compound revenue.
              </p>

              {/* Standardized Dual Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 6 }}>
                <Link to="/book-consultation" className="button-white">
                  Book a Free Consultation <ArrowUpRight size={14} />
                </Link>

                <Link to="/portfolio" className="button-glass-play">
                  See Our Work <ArrowRight size={14} />
                </Link>
              </div>

              {/* Verifiable Live Metrics Counter */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 16,
                  marginTop: 14,
                  paddingTop: 18,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#8E8E93',
                  fontSize: 13,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10B981', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Sub-1.2s Load Speed
                </div>
                <div style={{ color: '#E4E4E7', fontWeight: 700 }}>
                  0 Booking Conflicts <span style={{ color: '#71717A', margin: '0 4px' }}>·</span> 99.9% Uptime SLA
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: 3D Chrome Metallic Star & Live Badge */}
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
                width: '100%',
                maxWidth: 360,
                margin: '0 auto',
              }}
            >
              <ChromeStar size={320} style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          </div>

          {/* Industry Trust Strip */}
          <div className="partner-logo-strip">
            <span className="partner-logo-item">
              <span style={{ fontWeight: 800 }}>HEALTHCARE</span>
            </span>
            <span className="partner-logo-item">
              <span style={{ fontWeight: 800 }}>AI & EDTECH</span>
            </span>
            <span className="partner-logo-item">
              <span style={{ fontWeight: 800 }}>REAL ESTATE</span>
            </span>
            <span className="partner-logo-item">
              <span style={{ fontWeight: 800 }}>B2B SAAS</span>
            </span>
            <span className="partner-logo-item">
              <span style={{ fontWeight: 800 }}>E-COMMERCE</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Services Preview Section (PRD Section 1.2) ── */}
      <section
        id="services"
        style={{
          background: '#050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          position: 'relative',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 640, marginBottom: 44 }}>
            <span className="talos-pill" style={{ alignSelf: 'flex-start' }}>
              <span className="talos-pill-dot" /> Our Capabilities
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                color: '#FFFFFF',
              }}
            >
              Tailored Systems for <br />
              High-Growth Ambition
            </h2>
            <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.7 }}>
              From fast-loading conversion websites to intelligent AI automations, we build the digital foundation your business needs to scale.
            </p>
          </div>

          {/* 5-Column Grid from PRD */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {services.map((srv) => (
              <Link
                key={srv.title}
                to={srv.href}
                style={{
                  background: '#0A0A0E',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 20,
                  padding: 28,
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: '#14141A',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <srv.icon size={20} />
                  </div>
                  <span style={{ fontSize: 10, color: '#8E8E93', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {srv.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF', marginTop: 8 }}>{srv.title}</h3>
                <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6, flex: 1 }}>{srv.desc}</p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: 700,
                    paddingTop: 12,
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  Learn More <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Interactive AI Automation ROI Calculator ── */}
      <section
        style={{
          background: '#07070A',
          padding: 'clamp(70px, 8vw, 100px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <RoiCalculator />
        </div>
      </section>

      {/* ── 4. Interactive Solution Finder Diagnostic ── */}
      <section
        style={{
          background: '#050507',
          padding: 'clamp(70px, 8vw, 100px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SolutionFinder />
        </div>
      </section>

      {/* ── 5. Why Choose Us / Bento Grid (PRD Section 1.3 with Reference Image Bento Layout) ── */}
      <section
        style={{
          background: '#07070A',
          padding: 'clamp(80px, 10vw, 120px) 0',
          position: 'relative',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 640 }}>
            <span className="talos-pill" style={{ alignSelf: 'flex-start' }}>
              <span className="talos-pill-dot" /> Why KTUX
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                color: '#FFFFFF',
              }}
            >
              Built Differently From <br />
              Traditional Agencies
            </h2>
            <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.7 }}>
              Direct senior founder engineering. 100% full-stack code ownership. AI-assisted velocity with zero technical debt.
            </p>
          </div>

          {/* 4-Card Bento Grid */}
          <div className="talos-bento-grid">
            {/* Bento Card 1: Fast Delivery & Performance Velocity */}
            <div className="bento-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700 }}>2x Faster Development</span>
                <span
                  style={{
                    background: 'rgba(34, 197, 94, 0.15)',
                    color: '#22C55E',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: 999,
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  AI-Assisted Delivery
                </span>
              </div>

              {/* Metric Quick Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
                <div
                  style={{
                    background: '#121217',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '8px 14px',
                    fontSize: 12,
                    flex: '1 1 auto',
                  }}
                >
                  <span style={{ color: '#8E8E93' }}>Avg Launch: </span>
                  <strong style={{ color: '#FFFFFF' }}>14 Days</strong>
                </div>
                <div
                  style={{
                    background: '#121217',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    padding: '8px 14px',
                    fontSize: 12,
                    flex: '1 1 auto',
                  }}
                >
                  <span style={{ color: '#8E8E93' }}>Load Time: </span>
                  <strong style={{ color: '#FFFFFF' }}>&lt;1.2s</strong>
                </div>
              </div>

              {/* Chart SVG Canvas */}
              <div
                style={{
                  height: 150,
                  width: '100%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 16,
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <path
                    d="M0,100 C60,95 100,60 160,65 C220,70 260,20 330,30 C370,35 390,10 400,5 L400,120 L0,120 Z"
                    fill="rgba(255, 255, 255, 0.05)"
                  />
                  <path
                    d="M0,100 C60,95 100,60 160,65 C220,70 260,20 330,30 C370,35 390,10 400,5"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                  />
                  <circle cx="330" cy="30" r="5" fill="#FFFFFF" />
                  <circle cx="400" cy="5" r="5" fill="#22C55E" />
                </svg>
              </div>
            </div>

            {/* Bento Card 2: Core Value Pillars */}
            <div className="bento-card">
              <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700, display: 'block', marginBottom: 12 }}>
                Built-In Architecture Advantage
              </span>
              <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
                Every build is engineered from scratch for search engine visibility, rock-solid security, and effortless scaling.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'SEO Optimized — Rank on Google from day one',
                  'AI Powered — Smart automations & agent workflows',
                  'Lifetime Support — Dedicated post-launch partnership',
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      background: '#121217',
                      padding: '10px 14px',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: '#E4E4E7',
                      fontSize: 12,
                      fontWeight: 600,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Check size={14} style={{ color: '#22C55E', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card 3: Enterprise Integration */}
            <div className="bento-card">
              <span style={{ color: '#8E8E93', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Full-Stack Ecosystem
              </span>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginTop: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#FFFFFF',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Code2 size={24} color="#050507" />
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>Modern Stack Architecture</h3>
                  <span style={{ color: '#8E8E93', fontSize: 12 }}>React · TypeScript · Express · Cloud DB</span>
                </div>
              </div>
              <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6 }}>
                Zero lock-in, fully typed, production-ready systems you own 100% with full source code.
              </p>
            </div>

            {/* Bento Card 4: 3D Stacked Floating Pills */}
            <div className="bento-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #18181F 0%, #0E0E12 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14,
                    padding: '12px 18px',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  ✨ Luxury Bespoke UI/UX
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #D4D4D8 100%)',
                    borderRadius: 14,
                    padding: '12px 18px',
                    color: '#050507',
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  ⚡ Sub-50ms Real-Time Voice & Chat
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #18181F 0%, #0E0E12 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 14,
                    padding: '12px 18px',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  🔒 0 Booking Conflicts · AES-256-GCM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Proven Achievements & 3D Mobile Stats Section ── */}
      <section
        style={{
          background: '#050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          position: 'relative',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              alignItems: 'center',
              gap: 48,
            }}
          >
            {/* Left Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <span className="talos-pill" style={{ alignSelf: 'flex-start' }}>
                <span className="talos-pill-dot" /> Our Achievements
              </span>
              <h2
                style={{
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  color: '#FFFFFF',
                }}
              >
                Proven Results <br />
                You Can Trust
              </h2>
              <p style={{ color: '#8E8E93', fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}>
                From local businesses to funded startups, we've helped digital brands achieve measurable revenue growth and automated scale in record time.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px, 4vw, 30px)', marginTop: 12 }}>
                <div>
                  <strong style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 900, color: '#FFFFFF', display: 'block' }}>300+</strong>
                  <span style={{ color: '#8E8E93', fontSize: 12 }}>Leads Generated</span>
                </div>
                <div>
                  <strong style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 900, color: '#FFFFFF', display: 'block' }}>$50K+</strong>
                  <span style={{ color: '#8E8E93', fontSize: 12 }}>Revenue Impact</span>
                </div>
                <div>
                  <strong style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 900, color: '#FFFFFF', display: 'block' }}>99.9%</strong>
                  <span style={{ color: '#8E8E93', fontSize: 12 }}>Uptime & Reliability</span>
                </div>
              </div>
            </div>

            {/* Right: Isometric Dark Mobile Phone Mockup */}
            <div style={{ display: 'grid', placeItems: 'center', width: '100%', overflow: 'hidden' }}>
              <div
                style={{
                  width: 'min(100%, 320px)',
                  background: '#0E0E14',
                  border: '3px solid #27272A',
                  borderRadius: 32,
                  padding: 'clamp(14px, 3vw, 20px)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
                  position: 'relative',
                  transform: 'rotate(-2deg)',
                  transition: 'transform 0.3s ease',
                  maxWidth: '100%',
                }}
              >
                {/* Phone Speaker Notch */}
                <div
                  style={{
                    width: 70,
                    height: 5,
                    background: '#27272A',
                    borderRadius: 999,
                    margin: '0 auto 20px',
                  }}
                />

                {/* Floating Metric Badge 1 */}
                <div
                  style={{
                    background: '#181820',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 18,
                    padding: 16,
                    marginBottom: 14,
                  }}
                >
                  <span style={{ color: '#22C55E', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <TrendingUp size={13} /> Growth Velocity
                  </span>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>300%</div>
                  <small style={{ color: '#8E8E93', fontSize: 11 }}>Inbound Qualified Leads</small>
                </div>

                {/* Floating Metric Badge 2 */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #1C1C24 0%, #111116 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <span style={{ color: '#A1A1AA', fontSize: 11, fontWeight: 700 }}>Client Satisfaction</span>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>100+</div>
                  <small style={{ color: '#8E8E93', fontSize: 11 }}>Happy Businesses Worldwide</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Featured Projects Section (PRD Section 1.4) ── */}
      <section
        style={{
          background: '#07070A',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
            <div>
              <span className="talos-pill" style={{ marginBottom: 14 }}>
                <span className="talos-pill-dot" /> Recent Work
              </span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 900, color: '#FFFFFF', marginTop: 10 }}>
                Featured Case Studies
              </h2>
            </div>
            <Link to="/portfolio" className="button-glass-play">
              View All Projects <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {projects.map((project) => (
              <Link
                key={project.title}
                to={`/case-studies/${project.slug}`}
                style={{
                  background: '#0A0A0E',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ height: 210, overflow: 'hidden' }}>
                  <ProjectLivePreview
                    liveUrl={project.liveUrl}
                    title={project.title}
                    industryTag={project.industry}
                    height={210}
                    previewImage={project.image}
                  />
                </div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ color: '#8E8E93', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {project.industry}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>{project.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22C55E', fontSize: 11, fontWeight: 700, marginTop: 4 }}>
                    <Check size={13} /> {project.metric}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. 7-Step Process Section (PRD Section 1.5) ── */}
      <section
        style={{
          background: '#050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 50px' }}>
            <span className="talos-pill" style={{ marginBottom: 14 }}>
              <span className="talos-pill-dot" /> Delivery Framework
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#FFFFFF', marginTop: 10 }}>
              From Idea to Live System: Our 5-Step Process
            </h2>
            <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
              No mystery hand-offs. Clear milestones, continuous visibility, and zero latency from concept to deployment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 16,
            }}
          >
            {processSteps.map((step) => (
              <div
                key={step.step}
                style={{
                  background: '#0A0A0E',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF' }}>{step.step}</span>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: '#14141A',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <step.icon size={18} />
                  </div>
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 800, color: '#FFFFFF' }}>{step.title}</h4>
                <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Pricing Section (PRD Section 1.7 & Pricing Page Sync) ── */}
      <section
        id="pricing"
        style={{
          background: '#07070A',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 50px' }}>
            <span className="talos-pill" style={{ marginBottom: 14 }}>
              <span className="talos-pill-dot" /> Transparent Investment
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#FFFFFF', marginTop: 10 }}>
              Flexible Pricing for Every Business
            </h2>
            <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
              Choose the level of partnership that matches your next chapter — transparent, milestone-based, and zero hidden costs.
            </p>
          </div>

          {/* 3-Tier Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20, alignItems: 'stretch' }}>
            {/* Starter Plan */}
            <div
              style={{
                background: '#0C0C10',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: '#8E8E93', fontSize: 13, fontWeight: 700 }}>Starter</span>
              <div style={{ margin: '18px 0 24px' }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#FFFFFF' }}>₹25K</span>
                <span style={{ color: '#8E8E93', fontSize: 12, marginLeft: 4 }}>/ project</span>
              </div>
              <p style={{ color: '#8E8E93', fontSize: 13, marginBottom: 20 }}>A confident first digital system for growing businesses.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  '5-page website build',
                  'Basic SEO foundation',
                  'Mobile-responsive build',
                  'Admin panel included',
                  '30-day post-launch support',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A1A1AA', fontSize: 13 }}>
                    <Check size={14} style={{ color: '#22C55E' }} /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/book-consultation" className="button-ghost" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                Choose Starter →
              </Link>
            </div>

            {/* Professional Plan (Featured Solid White Card) */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 24,
                padding: 34,
                display: 'flex',
                flexDirection: 'column',
                color: '#050507',
                boxShadow: '0 20px 50px rgba(255, 255, 255, 0.15)',
                transform: 'scale(1.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#050507', fontSize: 13, fontWeight: 800 }}>Professional</span>
                <span style={{ background: '#050507', color: '#FFFFFF', fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 999 }}>
                  MOST POPULAR
                </span>
              </div>
              <div style={{ margin: '18px 0 24px' }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#050507' }}>₹65K</span>
                <span style={{ color: '#71717A', fontSize: 12, marginLeft: 4 }}>/ project</span>
              </div>
              <p style={{ color: '#52525B', fontSize: 13, marginBottom: 20 }}>For teams ready to compound performance through every layer.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Unlimited custom pages',
                  'CMS & full admin control',
                  'AI lead concierge integration',
                  'Analytics dashboard foundation',
                  '90-day dedicated partnership',
                  'Priority SLA support',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#18181B', fontSize: 13, fontWeight: 600 }}>
                    <Check size={14} style={{ color: '#050507' }} /> {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/pricing"
                style={{
                  background: '#050507',
                  color: '#FFFFFF',
                  marginTop: 'auto',
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  minHeight: 46,
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                Choose Professional →
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div
              style={{
                background: '#0C0C10',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: '#8E8E93', fontSize: 13, fontWeight: 700 }}>Enterprise</span>
              <div style={{ margin: '18px 0 24px' }}>
                <span style={{ fontSize: 44, fontWeight: 900, color: '#FFFFFF' }}>Custom</span>
                <span style={{ color: '#8E8E93', fontSize: 12, marginLeft: 4 }}>/ bespoke</span>
              </div>
              <p style={{ color: '#8E8E93', fontSize: 13, marginBottom: 20 }}>A complete, bespoke digital ecosystem built to endure.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Custom digital ecosystem',
                  'AI agents & workflow automation',
                  'Dedicated strategy & tech lead',
                  'White-glove onboarding',
                  'Custom enterprise SLA',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A1A1AA', fontSize: 13 }}>
                    <Check size={14} style={{ color: '#22C55E' }} /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="button-ghost" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                Talk to us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Testimonials Section (PRD Section 1.6) ── */}
      <section
        style={{
          background: '#050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
            <span className="talos-pill" style={{ alignSelf: 'flex-start' }}>
              <span className="talos-pill-dot" /> Client Testimonials
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 900, color: '#FFFFFF' }}>
              Trusted by Ambitious Founders
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: '#0C0C10',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', gap: 3, color: '#F59E0B' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p style={{ color: '#E4E4E7', fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <strong style={{ color: '#FFFFFF', fontSize: 14, display: 'block' }}>{t.name}</strong>
                  <span style={{ color: '#8E8E93', fontSize: 12 }}>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. FAQ Section (PRD Section 1.7) ── */}
      <section
        style={{
          background: '#07070A',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 40,
              alignItems: 'start',
            }}
          >
            {/* Left Col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="talos-pill" style={{ alignSelf: 'flex-start' }}>
                <span className="talos-pill-dot" /> Your Questions Answered
              </span>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
                Frequently Asked <br />
                Questions
              </h2>
              <p style={{ color: '#8E8E93', fontSize: 15, lineHeight: 1.7 }}>
                Have questions about our sprint workflow, tech stack, or integrations? We're here to help you get complete clarity.
              </p>
            </div>

            {/* Right Accordion List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map((faq, index) => {
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
        </div>
      </section>

      {/* ── 12. CTA Section (PRD Section 1.8) ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 60%), #050507',
          padding: 'clamp(90px, 12vw, 140px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
        }}
      >
        <div className="site-container" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <span className="talos-pill">
            <span className="talos-pill-dot" /> Direct Consultation
          </span>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Ready to Build a High-Converting Digital Platform?
          </h2>
          <p style={{ color: '#8E8E93', fontSize: 16, maxWidth: 520, lineHeight: 1.7 }}>
            Book a 30-minute discovery call directly with our engineering founders. A focused discussion on your system goals, bottlenecks, and ROI.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
            <Link to="/book-consultation" className="button-white">
              Book a Free Consultation <ArrowUpRight size={14} />
            </Link>
            <Link to="/portfolio" className="button-glass-play">
              See Our Work <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
