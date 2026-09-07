import React from 'react';
import { Helmet } from 'react-helmet-async';

export const FounderCard: React.FC = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Keerti Singh',
    jobTitle: 'Founder & AI Architect',
    image: 'https://ktux.com/images/founders/keerti-singh.jpg',
    description:
      "I'm the Founder of Ktux Agency, focused on building modern digital experiences that combine design, technology, and AI.",
    email: 'keerti0singh@gmail.com',
    sameAs: [
      'https://www.instagram.com/x.keerti11?stkn=bnN0bDl1OXl4bm9r',
      'https://github.com/xkeerti11',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Ktux Agency',
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>
      <section className="founders-section">
        <div className="section-header">
          <h2 className="section-title">Meet Our Founder</h2>
          <p className="section-subtitle">Leading innovation in AI & Web Development</p>
        </div>

        <article className="founder-card" tabIndex={0}>
          <div className="response-badge">
            Typically replies within 24 hours
          </div>

          <img
            src="/images/founders/keerti-singh.jpg"
            alt="Keerti Singh - Founder & AI Architect at Ktux Agency"
            width="200"
            height="200"
            loading="lazy"
            className="founder-avatar"
            onError={(e) => {
              // Fallback to founder.png if uploaded image isn't available yet
              (e.currentTarget as HTMLImageElement).src = '/founder.png';
            }}
          />

          <h3 className="founder-name">Keerti Singh</h3>

          <p className="founder-role">Founder & AI Architect</p>

          <p className="founder-bio">
            I'm the Founder of Ktux Agency, focused on building modern digital experiences that combine design, technology, and AI. I work closely with businesses to turn ideas into high-performance websites, intelligent automation, and digital products that are built to create real business value.
          </p>

          <div className="social-links">
            <a
              href="https://www.instagram.com/x.keerti11?stkn=bnN0bDl1OXl4bm9r"
              className="social-link"
              aria-label="Follow on Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a
              href="mailto:keerti0singh@gmail.com"
              className="social-link"
              aria-label="Send email"
              title="Email"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 6 10 7 10-7" />
              </svg>
            </a>
          </div>

          <div className="email-section">
            <p className="email-label">Get in Touch</p>
            <a href="mailto:keerti0singh@gmail.com" className="email-link">
              keerti0singh@gmail.com
            </a>
          </div>
        </article>
      </section>
    </>
  );
};

export default FounderCard;
