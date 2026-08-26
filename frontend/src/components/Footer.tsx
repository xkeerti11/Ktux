import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Resources',
    links: [
      ['Services', '/services'],
      ['Portfolio', '/portfolio'],
      ['Case Studies', '/case-studies'],
      ['Pricing', '/pricing'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Us', '/about'],
      ['Blog & Insights', '/blog'],
      ['AI Assistant', '/ai-assistant'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['Website Development', '/services/website-development'],
      ['AI Automation', '/services/ai-automation'],
      ['AI UGC Ads', '/services/ai-ugc-ads'],
      ['AI Agents', '/services/ai-agents'],
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: '#050507',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: 80,
        paddingBottom: 40,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: 40,
            paddingBottom: 60,
          }}
        >
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                color: '#FFFFFF',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #71717A 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 0 14px rgba(255,255,255,0.4)',
                }}
              >
                <Sparkles size={16} color="#050507" />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em' }}>
                KTUX<span style={{ color: '#A1A1AA', fontWeight: 500, marginLeft: 4 }}>STUDIO</span>
              </span>
            </Link>
            <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.7, maxWidth: 300 }}>
              Full-stack AI automation & digital engineering ecosystem built for high-growth modern businesses.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10B981', fontSize: 12, fontWeight: 600 }}>
              <CheckCircle2 size={15} /> Verified System Architecture
            </div>
          </div>

          {/* Nav Link Columns */}
          {columns.map((column) => (
            <div key={column.title} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>
                {column.title}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {column.links.map(([label, href]) => (
                  <Link
                    key={href}
                    to={href}
                    style={{
                      color: '#8E8E93',
                      fontSize: 13,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8E8E93')}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Contact Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>
              Direct Contact
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href="mailto:ktuxai@zohomail.in"
                style={{
                  color: '#8E8E93',
                  fontSize: 13,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8E8E93')}
              >
                <Mail size={14} style={{ color: '#FFFFFF' }} /> ktuxai@zohomail.in
              </a>
              <a
                href="tel:+917084499128"
                style={{
                  color: '#8E8E93',
                  fontSize: 13,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8E8E93')}
              >
                <Phone size={14} style={{ color: '#FFFFFF' }} /> +91 70844 99128
              </a>
              <span style={{ color: '#8E8E93', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={14} style={{ color: '#FFFFFF' }} /> India · Global Client Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Massive Outlined Metallic Footer Watermark */}
        <div className="talos-footer-watermark">
          KTUX STUDIO
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingTop: 30,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#71717A',
            fontSize: 12,
          }}
        >
          <span>© {new Date().getFullYear()} KTUX Studio. All rights reserved.</span>
          <span>Designed with high-contrast precision · Built for scale</span>
        </div>
      </div>
    </footer>
  );
}
