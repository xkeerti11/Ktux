import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Ktux</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.05) 0%, transparent 60%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(80px, 15vw, 140px)', fontWeight: 900, color: 'var(--color-border)', lineHeight: 1, marginBottom: '8px' }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Page Not Found</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-neutral)', lineHeight: 1.7, marginBottom: '36px' }}>
            The page you're looking for doesn't exist. It may have been moved, deleted, or you may have typed the URL incorrectly.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-primary" id="notfound-home">
              <Home size={16} /> Back to Home
            </Link>
            <Link to="/contact" className="btn-outline" id="notfound-contact">
              Contact Support <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
