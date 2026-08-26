import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Bot, Check, ChevronRight, HelpCircle, Layers3, RefreshCw, Sparkles, Video, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: { label: string; desc: string; icon: React.ElementType; value: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is your primary operational bottleneck?',
    options: [
      { label: 'Repetitive Customer Triage & Support', desc: 'Too many late night questions, lost leads, or manual replies', icon: Bot, value: 'agents' },
      { label: 'Manual Internal Workflows & Data Entry', desc: 'Copy-pasting data between CRM, sheets, and emails', icon: Zap, value: 'automation' },
      { label: 'Outdated or Low-Converting Website', desc: 'Website takes too long to load or fails to convert visitors', icon: Layers3, value: 'web' },
      { label: 'Need High-Converting Video Ads', desc: 'Want AI-generated UGC marketing videos to lower ad costs', icon: Video, value: 'ugc' },
    ],
  },
  {
    id: 2,
    question: 'What is your industry sector?',
    options: [
      { label: 'Real Estate & Construction', desc: 'Property inquiries, virtual tours, automated WhatsApp bookings', icon: Layers3, value: 'realestate' },
      { label: 'Healthcare & Clinical Practice', desc: 'Patient appointments, clinic FAQs, encrypted records', icon: Zap, value: 'healthcare' },
      { label: 'Education, Coaching & EdTech', desc: 'Student lead capture, course admissions, conversational AI', icon: Bot, value: 'education' },
      { label: 'Startup, SaaS & Local Businesses', desc: 'Full custom digital ecosystems, speed, and agile growth', icon: Sparkles, value: 'startup' },
    ],
  },
];

const recommendations: Record<string, { title: string; system: string; timeline: string; link: string; perks: string[] }> = {
  agents: {
    title: 'Autonomous AI Customer & Lead Agent',
    system: 'Context-aware 24/7 conversational agent with WhatsApp & CRM sync, instant lead qualification, and smart human escalation.',
    timeline: '2 — 3 Weeks',
    link: '/services/ai-agents',
    perks: ['Zero missed after-hours leads', 'Instant sub-second responses', 'Automated CRM insertion', 'Live WhatsApp integration'],
  },
  automation: {
    title: 'End-to-End AI Workflow Pipeline',
    system: 'Automated data routing between forms, emails, payment gateways, and backend databases with zero manual human effort.',
    timeline: '1 — 2 Weeks',
    link: '/services/ai-automation',
    perks: ['80% reduction in manual ops', 'Zero data entry errors', 'Webhook & API integrations', 'Real-time alert dispatch'],
  },
  web: {
    title: 'High-Converting Bespoke Web Platform',
    system: 'Sub-1.2s loading speed, SEO-optimized, mobile-first web architecture with integrated CMS and admin analytics.',
    timeline: '2 — 4 Weeks',
    link: '/services/website-development',
    perks: ['Google PageSpeed 95+', 'SEO Schema built-in', 'Custom Admin Panel & CMS', 'Atomic slot lock booking'],
  },
  ugc: {
    title: 'AI UGC Video Content Engine',
    system: 'Hyper-realistic AI user-generated marketing videos for Instagram, TikTok, and Meta Ads yielding 3-5x higher CTR.',
    timeline: '48 — 72 Hours',
    link: '/services/ai-ugc-ads',
    perks: ['90% lower production costs', 'Multi-hook variations for A/B testing', 'Rapid 48h turnaround', 'High ROAS performance'],
  },
};

export function SolutionFinder() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (val: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: val }));
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(questions.length); // Results step
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  const selectedPrimary = answers[0] || 'agents';
  const result = recommendations[selectedPrimary] || recommendations.agents;

  return (
    <div
      style={{
        background: '#0A0A0E',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 28,
        padding: 'clamp(24px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <span className="talos-pill">
          <HelpCircle size={13} style={{ color: '#22C55E' }} />
          <span>Interactive Solution Diagnostic</span>
        </span>

        {currentStep > 0 && currentStep < questions.length && (
          <button
            onClick={reset}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8E8E93',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={12} /> Reset
          </button>
        )}
      </div>

      {currentStep < questions.length ? (
        <div>
          <div style={{ marginBottom: 24 }}>
            <span style={{ color: '#8E8E93', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Step {currentStep + 1} of {questions.length}
            </span>
            <h3 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
              {questions[currentStep].question}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 14 }}>
            {questions[currentStep].options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt.value)}
                style={{
                  background: '#121218',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 18,
                  padding: '20px 22px',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#1A1A24', display: 'grid', placeItems: 'center', color: '#FFFFFF' }}>
                  <opt.icon size={18} />
                </div>
                <strong style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 700 }}>{opt.label}</strong>
                <p style={{ color: '#8E8E93', fontSize: 12, lineHeight: 1.5, margin: 0 }}>{opt.desc}</p>
                <span style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 'auto', paddingTop: 6 }}>
                  Select <ChevronRight size={14} />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <span style={{ color: '#22C55E', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ✓ Diagnostic Complete · Recommended Solution
              </span>
              <h3 style={{ fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>
                {result.title}
              </h3>
            </div>
            <span style={{ background: '#181824', color: '#E4E4E7', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
              Est Sprint: {result.timeline}
            </span>
          </div>

          <p style={{ color: '#8E8E93', fontSize: 14, lineHeight: 1.7, maxWidth: 640 }}>
            {result.system}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 10, margin: '8px 0' }}>
            {result.perks.map((perk) => (
              <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#121217', padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', color: '#E4E4E7', fontSize: 12, fontWeight: 600 }}>
                <Check size={14} style={{ color: '#22C55E' }} />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <Link to="/book-consultation" className="button-white">
              Book Free Consultation <ArrowUpRight size={14} />
            </Link>
            <Link to={result.link} className="button-glass-play">
              Explore {result.title}
            </Link>
            <button
              onClick={reset}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#71717A',
                fontSize: 13,
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
              Start Diagnostic Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
