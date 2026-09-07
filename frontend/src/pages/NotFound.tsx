import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { KtuxLogo } from '../components/KtuxLogo';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | KTUX</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 60%), #050507', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            <KtuxLogo variant="monogram" height={60} />
          </div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(72px, 14vw, 120px)', fontWeight: 900, color: 'rgba(255,255,255,0.1)', lineHeight: 1, marginBottom: '8px' }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>Page Not Found</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#8E8E93', lineHeight: 1.7, marginBottom: '32px' }}>
            The page you're looking for doesn't exist. It may have been moved, updated, or the URL might be mistyped.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="button-white" id="notfound-home">
              <Home size={15} /> Back to Home
            </Link>
            <Link to="/contact" className="button-glass-play" id="notfound-contact">
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
