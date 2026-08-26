import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X, Sparkles } from 'lucide-react';

type NavItem = { label: string; href: string; children?: readonly (readonly [string, string])[] };
const LINKS: readonly NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      ['Website Development', '/services/website-development'],
      ['AI Automation', '/services/ai-automation'],
      ['AI UGC Ads', '/services/ai-ugc-ads'],
      ['Branding', '/services/branding'],
      ['AI Agents', '/services/ai-agents'],
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        className="site-container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(10, 10, 14, 0.85)' : 'rgba(12, 12, 16, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 999,
          padding: '8px 16px 8px 20px',
          backdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 15px 35px rgba(0,0,0,0.6)' : '0 10px 25px rgba(0,0,0,0.3)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto',
          width: '100%',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            color: '#FFFFFF',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #71717A 100%)',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 0 12px rgba(255,255,255,0.4)',
            }}
          >
            <Sparkles size={14} color="#050507" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.03em' }}>
            KTUX<span style={{ color: '#A1A1AA', fontWeight: 500, marginLeft: 3 }}>STUDIO</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav
          className="hide-on-mobile"
          style={{
            alignItems: 'center',
            gap: 22,
          }}
        >
          {LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    background: 'transparent',
                    border: 'none',
                    color: '#A1A1AA',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '6px 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = servicesOpen ? '#FFFFFF' : '#A1A1AA')}
                >
                  {link.label}
                  <ChevronDown
                    size={13}
                    style={{
                      transform: servicesOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                {servicesOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 36,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 220,
                      background: '#0D0D11',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 16,
                      padding: 8,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      zIndex: 100,
                    }}
                  >
                    {link.children.map(([childLabel, childHref]) => (
                      <Link
                        key={childHref}
                        to={childHref}
                        style={{
                          padding: '8px 12px',
                          color: '#A1A1AA',
                          fontSize: 12,
                          fontWeight: 500,
                          textDecoration: 'none',
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#FFFFFF';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#A1A1AA';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {childLabel}
                        <ArrowUpRight size={12} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.href}
                style={({ isActive }) => ({
                  color: isActive ? '#FFFFFF' : '#A1A1AA',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                })}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => {
                  if (!location.pathname.startsWith(link.href)) {
                    e.currentTarget.style.color = '#A1A1AA';
                  }
                }}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            to="/book-consultation"
            className="button-white hide-on-mobile"
            style={{
              padding: '8px 18px',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
              alignItems: 'center',
              gap: 6,
              minHeight: 36,
            }}
          >
            Book Free Consultation <ArrowUpRight size={14} />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="show-on-mobile"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              placeItems: 'center',
              padding: 6,
              cursor: 'pointer',
              borderRadius: '50%',
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 70,
            left: 16,
            right: 16,
            background: '#0D0D11',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 20,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            pointerEvents: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            zIndex: 1001,
          }}
        >
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
          <Link
            to="/book-consultation"
            className="button-white"
            onClick={() => setOpen(false)}
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              padding: '12px 20px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              width: '100%',
              marginTop: 4,
            }}
          >
            Book Free Consultation <ArrowUpRight size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
