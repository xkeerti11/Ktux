import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listCaseStudies } from '../lib/api/endpoints';
import { CASE_STUDIES_DATA, type ExtendedCaseStudy } from '../data/caseStudiesData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProjectLivePreview } from '../components/ProjectLivePreview';
import { SectionReveal } from '../components/SectionReveal';

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function CaseStudies() {
  const { data, isLoading } = useQuery({
    queryKey: ['case-studies'],
    queryFn: () => listCaseStudies({ page: 1, limit: 30 }),
  });

  const items = (data?.data?.length ? data.data : CASE_STUDIES_DATA) as ExtendedCaseStudy[];

  return (
    <>
      <Helmet>
        <title>Case Studies & Architectural Breakdowns — KTUX Studio</title>
        <meta
          name="description"
          content="The architectural decisions, security guardrails, and measurable outcomes behind selected KTUX engagements."
        />
      </Helmet>

      <section className="page-hero section-gradient-dark" style={{ background: '#09090B', padding: '160px 24px 60px', borderBottom: '1px solid #27272a' }}>
        <div className="site-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'rgba(201, 162, 39, 0.12)', border: '1px solid rgba(201, 162, 39, 0.3)', marginBottom: 20 }}>
            <Sparkles size={15} style={{ color: '#C9A227' }} />
            <span style={{ color: '#C9A227', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>The Casebook</span>
          </div>
          <h1 className="display" style={{ color: '#FFFFFF', fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            The Architecture & Decisions<br />
            <span className="luxury gold">Behind The Outcomes.</span>
          </h1>
          <p className="section-copy" style={{ color: '#71717A', fontSize: 16, lineHeight: 1.6, maxWidth: 640 }}>
            Real constraints, security protocols, technical tradeoffs, and the metrics that prove the systems perform.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#09090B', padding: '60px 24px 100px' }}>
        <div className="site-container">
          {isLoading ? (
            <div className="content-loading">
              <span className="spinner" />
            </div>
          ) : (
            <div className="case-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
              {items.map((item, index) => (
                <SectionReveal key={item._id} delay={index * 0.06}>
                  <div
                    className="case-card surface-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      background: '#18181B',
                      border: '1px solid #27272A',
                      borderRadius: 24,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className="case-image" style={{ height: 260, position: 'relative', overflow: 'hidden' }}>
                      <ProjectLivePreview
                        liveUrl={item.liveUrl}
                        title={item.title}
                        industryTag={item.industryTag}
                        height={260}
                        previewImage={item.images?.[0]}
                      />
                      <span
                        className="case-number"
                        style={{
                          position: 'absolute',
                          top: 40,
                          right: 16,
                          background: 'rgba(9, 9, 11, 0.85)',
                          color: '#C9A227',
                          border: '1px solid rgba(201, 162, 39, 0.4)',
                          borderRadius: 999,
                          padding: '4px 12px',
                          fontSize: 12,
                          fontWeight: 700,
                          zIndex: 5,
                        }}
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <div className="case-copy" style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="mono" style={{ color: '#C9A227', fontSize: 12, fontWeight: 700 }}>
                          {item.industryTag}
                        </span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              style={{ color: '#10B981', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
                            >
                              Live <ExternalLink size={11} />
                            </a>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              style={{ color: '#A1A1AA', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
                            >
                              <GithubIcon size={12} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                        {item.title}
                      </h2>
                      <p style={{ color: '#A1A1AA', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                        {item.overview}
                      </p>

                      <div className="case-bottom" style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #27272A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#C9A227', fontWeight: 700, fontSize: 14 }}>
                          {item.results?.[0]?.value || 'Read the story'}
                        </span>
                        <Link
                          to={`/case-studies/${item.slug}`}
                          style={{
                            color: '#FAFAF8',
                            background: '#27272A',
                            border: '1px solid #3F3F46',
                            borderRadius: 999,
                            padding: '6px 14px',
                            fontSize: 13,
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            textDecoration: 'none',
                          }}
                        >
                          Read Case Study <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
