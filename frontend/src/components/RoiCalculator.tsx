import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Bot, Calculator, Check, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(6);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(1200); // in INR

  // Calculations: Assuming AI Automation automates ~75% of repetitive tasks
  const totalWeeklyManualHours = teamSize * hoursPerWeek;
  const monthlyHoursSaved = Math.round(totalWeeklyManualHours * 4.33 * 0.75);
  const monthlyCostSaved = Math.round(monthlyHoursSaved * hourlyRate);
  const annualCostSaved = monthlyCostSaved * 12;

  const fmtCurrency = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${Math.round(val / 1000)}K`;
  };

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span className="talos-pill">
          <Calculator size={13} style={{ color: '#22C55E' }} />
          <span>Interactive ROI Estimator</span>
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 36, alignItems: 'center' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              Calculate Your Automation Savings
            </h3>
            <p style={{ color: '#8E8E93', fontSize: 14, lineHeight: 1.6, marginTop: 6 }}>
              Estimate how much time and operational budget your business saves each month by deploying custom AI workflows and agents.
            </p>
          </div>

          {/* Slider 1: Team Size */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="roi-team-size" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700 }}>Team Members on Operations / Support</label>
              <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 15, background: '#181820', padding: '2px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                {teamSize} people
              </span>
            </div>
            <input
              id="roi-team-size"
              type="range"
              min={1}
              max={50}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FFFFFF', cursor: 'pointer' }}
              aria-label="Team Size"
            />
          </div>

          {/* Slider 2: Hours / Week spent on repetitive tasks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="roi-hours-week" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700 }}>Manual Hours Spent per Person / Week</label>
              <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 15, background: '#181820', padding: '2px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                {hoursPerWeek} hrs/wk
              </span>
            </div>
            <input
              id="roi-hours-week"
              type="range"
              min={2}
              max={30}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FFFFFF', cursor: 'pointer' }}
              aria-label="Hours spent on manual tasks per week"
            />
          </div>

          {/* Slider 3: Hourly Rate */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="roi-hourly-rate" style={{ color: '#E4E4E7', fontSize: 13, fontWeight: 700 }}>Blended Hourly Rate / Cost</label>
              <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 15, background: '#181820', padding: '2px 10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}>
                ₹{hourlyRate}/hr
              </span>
            </div>
            <input
              id="roi-hourly-rate"
              type="range"
              min={300}
              max={5000}
              step={100}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FFFFFF', cursor: 'pointer' }}
              aria-label="Blended hourly rate"
            />
          </div>
        </div>

        {/* Results Card */}
        <div
          style={{
            background: 'linear-gradient(145deg, #121218 0%, #0C0C10 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 24,
            padding: 'clamp(20px, 3vw, 30px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: '#8E8E93', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Estimated Net Output
            </span>
            <span style={{ color: '#22C55E', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={14} /> +75% Efficiency
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14 }}>
            <div style={{ background: '#181822', padding: '16px 18px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#8E8E93', fontSize: 12, display: 'block' }}>Monthly Hours Saved</span>
              <strong style={{ fontSize: 26, fontWeight: 900, color: '#FFFFFF', marginTop: 4, display: 'block' }}>
                {monthlyHoursSaved} hrs
              </strong>
            </div>

            <div style={{ background: '#181822', padding: '16px 18px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#8E8E93', fontSize: 12, display: 'block' }}>Monthly Savings</span>
              <strong style={{ fontSize: 26, fontWeight: 900, color: '#22C55E', marginTop: 4, display: 'block' }}>
                {fmtCurrency(monthlyCostSaved)}
              </strong>
            </div>
          </div>

          <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#E4E4E7', fontSize: 13 }}>Annual Reclaimed Value:</span>
              <strong style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 900 }}>{fmtCurrency(annualCostSaved)} / year</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A1A1AA', fontSize: 12, marginBottom: 14 }}>
              <Check size={14} style={{ color: '#22C55E' }} />
              <span>Recommended: <strong>Custom AI Agent + WhatsApp Triage Pipeline</strong></span>
            </div>

            <Link
              to="/book-consultation"
              className="button-white"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Book Free Consultation <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
