import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ExternalLink,
  Layers,
  Server,
  Shield,
  Sparkles,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getCaseStudy } from '../lib/api/endpoints';
import { CASE_STUDIES_DATA, type ExtendedCaseStudy } from '../data/caseStudiesData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProjectLivePreview } from '../components/ProjectLivePreview';
import { Lightbox } from '../components/Lightbox';
import { SectionReveal } from '../components/SectionReveal';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function CaseStudyDetail() {
  const { slug = '' } = useParams();
  const { data: apiItem, isLoading } = useQuery({
    queryKey: ['case-study', slug],
    queryFn: () => getCaseStudy(slug),
    enabled: !!slug,
    retry: false,
  });

  const [lightbox, setLightbox] = useState<number | null>(null);

  // Fallback to local master dataset if API returns null or errors
  const item: ExtendedCaseStudy | undefined =
    (apiItem as ExtendedCaseStudy) ||
    CASE_STUDIES_DATA.find((c) => c.slug === slug || c._id === slug);

  if (isLoading && !item) {
    return (
      <div className="page-loader" style={{ background: '#09090B', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="empty-state page-empty" style={{ background: '#09090B', color: '#FAFAF8', minHeight: '70vh', padding: '120px 24px', textAlign: 'center' }}>
        <span className="eyebrow" style={{ color: '#C9A227' }}>404 / Not found</span>
        <h1 style={{ fontSize: 36, margin: '16px 0' }}>
          This story has<br />
          <span className="luxury gold">moved on.</span>
        </h1>
        <Link className="button button-primary" to="/portfolio" style={{ marginTop: 20 }}>
          Back to all projects <ArrowLeft size={15} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{item.title} — Flagship Case Study | KTUX Studio</title>
        <meta name="description" content={item.overview} />
      </Helmet>

      <article style={{ background: '#09090B', color: '#FAFAF8', minHeight: '100vh' }}>
        {/* ── Hero (Dark) ── */}
        <section
          className="case-hero-dark"
          style={{
            background: 'linear-gradient(180deg, #111113 0%, #09090B 100%)',
            padding: '140px 24px 60px',
            borderBottom: '1px solid #27272A',
          }}
        >
          <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Link
              to="/portfolio"
              className="back-link"
              style={{
                color: '#71717A',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 28,
              }}
            >
              <ArrowLeft size={16} /> Back to projects & portfolio
            </Link>

            <SectionReveal>
              {/* Badges row */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
                <span
                  className="eyebrow"
                  style={{
                    background: 'rgba(201, 162, 39, 0.15)',
                    color: '#C9A227',
                    border: '1px solid rgba(201, 162, 39, 0.3)',
                    padding: '4px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {item.industryTag}
                </span>
                {item.role && (
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#E4E4E7',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Role: {item.role}
                  </span>
                )}
                {item.projectType && (
                  <span
                    style={{
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: '#10B981',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '4px 12px',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {item.projectType}
                  </span>
                )}
              </div>

              <h1
                className="display"
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  margin: '12px 0',
                }}
              >
                {item.title}
              </h1>

              {item.tagline && (
                <p
                  className="luxury"
                  style={{
                    color: '#C9A227',
                    fontSize: 'clamp(18px, 2.5vw, 24px)',
                    fontStyle: 'italic',
                    margin: '8px 0 20px',
                    lineHeight: 1.4,
                  }}
                >
                  {item.tagline}
                </p>
              )}

              <p
                className="section-copy"
                style={{
                  color: '#A1A1AA',
                  fontSize: 16,
                  lineHeight: 1.8,
                  maxWidth: 820,
                  marginBottom: 32,
                }}
              >
                {item.overview}
              </p>

              {/* Action Buttons (Live Demo & GitHub) */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}>
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button button-primary"
                    style={{
                      background: '#C9A227',
                      color: '#09090B',
                      fontWeight: 800,
                      fontSize: 14,
                      padding: '12px 28px',
                      borderRadius: 999,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    Launch Live Demo <ExternalLink size={16} />
                  </a>
                )}
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      background: '#18181B',
                      color: '#FAFAF8',
                      border: '1px solid #3F3F46',
                      fontWeight: 700,
                      fontSize: 14,
                      padding: '12px 24px',
                      borderRadius: 999,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <GithubIcon size={16} /> View GitHub Source
                  </a>
                )}
                {item.socketUrl && (
                  <a
                    href={item.socketUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#60A5FA',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      fontWeight: 700,
                      fontSize: 14,
                      padding: '12px 20px',
                      borderRadius: 999,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <Server size={15} /> Socket Server (Render)
                  </a>
                )}
              </div>
            </SectionReveal>

            {/* Meta bar */}
            <div
              className="case-hero-meta-bar"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 20,
                padding: '24px',
                background: '#18181B',
                borderRadius: 16,
                border: '1px solid #27272A',
              }}
            >
              <div className="case-meta-item">
                <small style={{ color: '#71717A', display: 'block', fontSize: 12, textTransform: 'uppercase' }}>Client / Domain</small>
                <strong style={{ color: '#FAFAF8', fontSize: 15 }}>{item.clientName || 'Confidential partner'}</strong>
              </div>
              {item.results?.[0] && (
                <div className="case-meta-item">
                  <small style={{ color: '#71717A', display: 'block', fontSize: 12, textTransform: 'uppercase' }}>Key Benchmark</small>
                  <strong style={{ color: '#C9A227', fontSize: 15 }}>{item.results[0].value}</strong>
                </div>
              )}
              {item.techStack?.length > 0 && (
                <div className="case-meta-item" style={{ gridColumn: 'span 2' }}>
                  <small style={{ color: '#71717A', display: 'block', fontSize: 12, textTransform: 'uppercase' }}>Core Stack</small>
                  <strong style={{ color: '#FAFAF8', fontSize: 14 }}>{item.techStack.slice(0, 6).join(' · ')}</strong>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Featured Live Preview / Mock Browser ── */}
        <section style={{ background: '#09090B', padding: '40px 24px 0' }}>
          <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div
              style={{
                height: 'clamp(480px, 70vh, 740px)',
                width: '100%',
                overflow: 'hidden',
                borderRadius: 24,
                border: '1px solid #27272A',
                background: '#111113',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
              }}
            >
              <ProjectLivePreview
                liveUrl={item.liveUrl}
                title={item.title}
                industryTag={item.industryTag}
                height="100%"
                interactive={true}
                previewImage={item.images?.[0]}
              />
            </div>
          </div>
        </section>

        {/* ── Results Grid ── */}
        {item.results?.length > 0 && (
          <section className="section" style={{ padding: '60px 24px 40px', background: '#09090B' }}>
            <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div
                className="result-grid-gold"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 20,
                }}
              >
                {item.results.map((r) => (
                  <SectionReveal key={r.label}>
                    <div
                      style={{
                        background: '#18181B',
                        border: '1px solid #27272A',
                        borderTop: '3px solid #C9A227',
                        padding: '24px 28px',
                        borderRadius: 16,
                      }}
                    >
                      <strong style={{ color: '#C9A227', fontSize: 26, fontWeight: 800, display: 'block' }}>
                        {r.value}
                      </strong>
                      <span style={{ color: '#A1A1AA', fontSize: 13, display: 'block', marginTop: 6, fontWeight: 500 }}>
                        {r.label}
                      </span>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Challenge & Solution ── */}
        <section className="section" style={{ padding: '20px 24px 50px', background: '#09090B' }}>
          <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              <SectionReveal>
                <div
                  style={{
                    background: '#18181B',
                    border: '1px solid #27272A',
                    borderLeft: '4px solid #EF4444',
                    padding: 32,
                    borderRadius: '0 16px 16px 0',
                    height: '100%',
                  }}
                >
                  <span className="eyebrow" style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: 6 }}>
                    The Problem & Bottlenecks
                  </span>
                  <p style={{ color: '#D4D4D8', marginTop: 12, fontSize: 15, lineHeight: 1.8 }}>
                    {item.challenge}
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.08}>
                <div
                  style={{
                    background: '#18181B',
                    border: '1px solid #27272A',
                    borderLeft: '4px solid #10B981',
                    padding: 32,
                    borderRadius: '0 16px 16px 0',
                    height: '100%',
                  }}
                >
                  <span className="eyebrow" style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: 6 }}>
                    The Architectural Solution
                  </span>
                  <p style={{ color: '#D4D4D8', marginTop: 12, fontSize: 15, lineHeight: 1.8 }}>
                    {item.solution}
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* ── Key Features Deep Dive ── */}
        {item.featureSections && item.featureSections.length > 0 && (
          <section className="section" style={{ padding: '40px 24px 60px', background: '#0D0D10', borderTop: '1px solid #1F1F23', borderBottom: '1px solid #1F1F23' }}>
            <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 36 }}>
                <span className="eyebrow" style={{ color: '#C9A227' }}>Engineering Deep Dive</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginTop: 8 }}>
                  Key Systems & Architectural Modules
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
                {item.featureSections.map((sec, idx) => (
                  <SectionReveal key={sec.title} delay={idx * 0.06}>
                    <div
                      style={{
                        background: '#18181B',
                        border: '1px solid #27272A',
                        borderRadius: 20,
                        padding: 28,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
                        {sec.title}
                      </h3>
                      <p style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                        {sec.description}
                      </p>
                      {sec.items && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
                          {sec.items.map((it) => (
                            <div key={it} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                              <CheckCircle2 size={16} style={{ color: '#C9A227', flexShrink: 0, marginTop: 3 }} />
                              <span style={{ color: '#D4D4D8', fontSize: 13, lineHeight: 1.6 }}>{it}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Architecture Flow Diagram ── */}
        {item.architectureFlow && (
          <section className="section" style={{ padding: '60px 24px', background: '#09090B' }}>
            <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 24 }}>
                <span className="eyebrow" style={{ color: '#C9A227' }}>System Design</span>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginTop: 6 }}>
                  Deployment & Data Flow Topology
                </h2>
              </div>
              <div
                style={{
                  background: '#111113',
                  border: '1px solid #27272A',
                  borderRadius: 16,
                  padding: '24px 32px',
                  overflowX: 'auto',
                }}
              >
                <pre
                  style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: 14,
                    color: '#10B981',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.architectureFlow}
                </pre>
              </div>
            </div>
          </section>
        )}

        {/* ── Tech Stack Matrix Table ── */}
        {item.techMatrix && item.techMatrix.length > 0 && (
          <section className="section" style={{ padding: '20px 24px 60px', background: '#09090B' }}>
            <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 24 }}>
                <span className="eyebrow" style={{ color: '#C9A227' }}>Technology Matrix</span>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginTop: 6 }}>
                  Production Stack & Tooling
                </h2>
              </div>

              <div
                style={{
                  background: '#18181B',
                  border: '1px solid #27272A',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
                  <thead>
                    <tr style={{ background: '#27272A', borderBottom: '1px solid #3F3F46' }}>
                      <th style={{ padding: '14px 20px', color: '#FAFAF8', fontWeight: 700, width: '25%' }}>Layer</th>
                      <th style={{ padding: '14px 20px', color: '#FAFAF8', fontWeight: 700 }}>Technologies Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.techMatrix.map((row, idx) => (
                      <tr
                        key={row.layer}
                        style={{
                          borderBottom: idx === item.techMatrix!.length - 1 ? 'none' : '1px solid #27272A',
                          background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)',
                        }}
                      >
                        <td style={{ padding: '14px 20px', color: '#C9A227', fontWeight: 700 }}>{row.layer}</td>
                        <td style={{ padding: '14px 20px', color: '#D4D4D8' }}>{row.technologies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── Resume & Interview Points ── */}
        {item.resumePoints && item.resumePoints.length > 0 && (
          <section className="section" style={{ padding: '40px 24px 60px', background: '#0D0D10', borderTop: '1px solid #1F1F23' }}>
            <div className="site-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 24 }}>
                <span className="eyebrow" style={{ color: '#C9A227' }}>Engineering Highlights</span>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginTop: 6 }}>
                  Key Engineering Contributions
                </h2>
              </div>
              <div
                style={{
                  background: '#18181B',
                  border: '1px solid #27272A',
                  borderRadius: 16,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {item.resumePoints.map((point) => (
                  <div key={point} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#C9A227',
                        marginTop: 9,
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ color: '#E4E4E7', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Client Review / Testimonial ── */}
        {item.clientReview && (
          <section className="section" style={{ background: '#09090B', padding: '60px 24px' }}>
            <div className="site-container" style={{ maxWidth: 840, margin: '0 auto' }}>
              <div
                style={{
                  background: '#18181B',
                  border: '1px solid rgba(201, 162, 39, 0.3)',
                  padding: '40px 36px',
                  borderRadius: 24,
                  textAlign: 'center',
                }}
              >
                <span style={{ color: '#C9A227', fontSize: 52, lineHeight: 1, fontFamily: 'Georgia, serif', display: 'block', marginBottom: 12 }}>
                  “
                </span>
                <p style={{ fontSize: 19, lineHeight: 1.7, color: '#FFFFFF', fontStyle: 'italic', margin: '0 0 20px' }}>
                  {item.clientReview}
                </p>
                <cite style={{ color: '#A1A1AA', fontSize: 14, fontStyle: 'normal', fontWeight: 600 }}>
                  — {item.clientName || 'Partner'}
                </cite>
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section
          className="section"
          style={{
            background: 'linear-gradient(135deg, #18181B 0%, #09090B 100%)',
            borderTop: '1px solid #27272A',
            padding: '80px 24px',
            textAlign: 'center',
          }}
        >
          <div className="site-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, maxWidth: 800, margin: '0 auto' }}>
            <span className="eyebrow" style={{ color: '#C9A227' }}>Ready for similar engineering excellence?</span>
            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, margin: 0 }}>
              Let's engineer your next<br />
              <span className="luxury gold">high-impact system.</span>
            </h2>
            <p style={{ color: '#A1A1AA', maxWidth: 540, fontSize: 15, lineHeight: 1.6 }}>
              Whether it's HIPAA-compliant healthcare, real-time WebRTC, or voice AI integrations, we ship production systems built for scale.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
              <Link
                to="/book-consultation"
                className="button button-primary"
                style={{
                  padding: '14px 32px',
                  borderRadius: 999,
                  background: '#C9A227',
                  color: '#09090B',
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Book Strategy Call <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/portfolio"
                style={{
                  padding: '14px 28px',
                  borderRadius: 999,
                  background: 'transparent',
                  color: '#FAFAF8',
                  border: '1px solid #3F3F46',
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                }}
              >
                View More Projects
              </Link>
            </div>
          </div>
        </section>
      </article>

      {lightbox !== null && item.images && (
        <Lightbox
          images={item.images}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onChange={setLightbox}
        />
      )}
    </>
  );
}
