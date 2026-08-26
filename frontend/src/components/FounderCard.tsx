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
    email: 'keerti@ktux.com',
    sameAs: [
      'https://linkedin.com/in/keerti-singh',
      'https://twitter.com/keerti_singh',
      'https://github.com/keerti',
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
              href="https://linkedin.com/in/keerti-singh"
              className="social-link"
              aria-label="Connect on LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              href="https://twitter.com/keerti_singh"
              className="social-link"
              aria-label="Follow on Twitter"
              title="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 11.46 3.888 7.93 7.93 0 01-2.446-.636 5.889 5.889 0 005-5.1 11.88 11.88 0 01-3.393 1.308 5.843 5.843 0 00-10.08 5.33 16.65 16.65 0 01-12.08-6.123 5.83 5.83 0 001.81 7.793 5.823 5.823 0 01-2.65-.735v.074a5.855 5.855 0 004.69 5.74 5.84 5.84 0 01-2.64.1 5.862 5.862 0 005.47 4.066A11.73 11.73 0 010 15.343 16.635 16.635 0 008.993 17.5c8.003 0 12.372-6.648 12.372-12.408 0-.189-.004-.378-.013-.565A8.85 8.85 0 0023 3" />
              </svg>
            </a>

            <a
              href="mailto:keerti@ktux.com"
              className="social-link"
              aria-label="Send email"
              title="Email"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 6 10 7 10-7" />
              </svg>
            </a>

            <a
              href="https://keerti.dev"
              className="social-link"
              aria-label="Visit portfolio"
              title="Portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 7v5l3 2" />
              </svg>
            </a>
          </div>

          <div className="email-section">
            <p className="email-label">Get in Touch</p>
            <a href="mailto:keerti@ktux.com" className="email-link">
              keerti@ktux.com
            </a>
          </div>
        </article>
      </section>
    </>
  );
};

export default FounderCard;
