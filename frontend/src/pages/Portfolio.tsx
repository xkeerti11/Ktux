import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight, ExternalLink, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listCaseStudies } from '../lib/api/endpoints';
import { CASE_STUDIES_DATA, type ExtendedCaseStudy } from '../data/caseStudiesData';
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

const categories = [
  'All',
  'Healthcare',
  'Education',
  'Real-Time & Social',
  'Real Estate',
  'Startups',
];

export default function Portfolio() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const t = window.setTimeout(() => setQuery(search), 320);
    return () => window.clearTimeout(t);
  }, [search]);

  const { data } = useQuery({
    queryKey: ['portfolio', query, category],
    queryFn: () =>
      listCaseStudies({
        search: query || undefined,
        industry: category === 'All' ? undefined : category,
        page: 1,
        limit: 30,
      }),
    initialData: {
      success: true,
      data: CASE_STUDIES_DATA,
      pagination: { total: CASE_STUDIES_DATA.length, page: 1, limit: 30, pages: 1 },
    },
  });

  const projects = useMemo(() => {
    const apiData = (data?.data as ExtendedCaseStudy[]) || [];
    const source = apiData.length ? apiData : CASE_STUDIES_DATA;

    return source.filter((project) => {
      const matchSearch =
        !query ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.overview.toLowerCase().includes(query.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchCategory =
        category === 'All' ||
        project.industryTag.toLowerCase().includes(category.toLowerCase()) ||
        (category === 'Education' && project.industryTag.includes('Education')) ||
        (category === 'Healthcare' && project.industryTag.includes('Healthcare')) ||
        (category === 'Real Estate' && project.industryTag.includes('Real Estate')) ||
        (category === 'Real-Time & Social' && project.industryTag.includes('Real-Time'));

      return matchSearch && matchCategory;
    });
  }, [data, query, category]);

  return (
    <>
      <Helmet>
        <title>Portfolio & Production Systems — KTUX Studio</title>
        <meta
          name="description"
          content="Explore our flagship full-stack production platforms, AI voice tutors, real-time WebRTC ecosystems, and luxury digital platforms."
        />
      </Helmet>

      {/* ── 1. Hero ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 75% 20%, rgba(255, 255, 255, 0.05), transparent 45%), #050507',
          paddingTop: 'clamp(110px, 16vw, 170px)',
          paddingBottom: 'clamp(40px, 6vw, 70px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          position: 'relative',
        }}
      >
        <div className="grid-lines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />

        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <SectionReveal>
            <span className="talos-pill" style={{ marginBottom: 18 }}>
              <span className="talos-pill-dot" /> Production Flagship Deployments
            </span>
            <h1
              style={{
                fontSize: 'clamp(32px, 6vw, 64px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginTop: 10,
              }}
            >
              Selected Systems & Work
            </h1>
            <p
              style={{
                color: '#8E8E93',
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.7,
                marginTop: 14,
                maxWidth: 680,
              }}
            >
              Explore live production platforms spanning healthcare clinical systems, conversational voice AI, sub-50ms WebRTC messaging, and luxury real estate engines.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── 2. Filters & Search ── */}
      <section style={{ background: '#050507', padding: 'clamp(28px, 5vw, 40px) 0 clamp(60px, 8vw, 100px)' }}>
        <div className="site-container" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 36,
              paddingBottom: 20,
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            {/* Search Bar */}
            <div style={{ flex: '1 1 260px', maxWidth: 420, width: '100%' }}>
              <label
                htmlFor="portfolio-search-input"
                style={{
                  background: '#0C0C10',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 999,
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                }}
              >
                <Search size={16} style={{ color: '#8E8E93', flexShrink: 0 }} />
                <input
                  id="portfolio-search-input"
                  aria-label="Search projects by title, tech stack, or feature"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, tech stack, or feature..."
                  style={{
                    color: '#FFFFFF',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: 14,
                    width: '100%',
                  }}
                />
              </label>
            </div>

            {/* Category Filter Pills with touch scrolling */}
            <div className="mobile-scroll-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      background: isActive ? '#FFFFFF' : '#0C0C10',
                      border: isActive ? '1px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#050507' : '#8E8E93',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: 12,
                      padding: '8px 16px',
                      borderRadius: 999,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Cards Grid */}
          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#0C0C10', borderRadius: 24, border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ color: '#8E8E93', fontSize: 16 }}>No projects matched your search criteria.</p>
              <button
                onClick={() => { setCategory('All'); setSearch(''); }}
                className="button-white"
                style={{ marginTop: 16, cursor: 'pointer' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                gap: 24,
              }}
            >
              {projects.map((project, i) => (
                <SectionReveal key={project._id} delay={i * 0.04}>
                  <div
                    style={{
                      background: '#0C0C10',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 24,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    {/* Live Preview Container */}
                    <div style={{ height: 240, position: 'relative', overflow: 'hidden', background: '#07070A' }}>
                      <ProjectLivePreview
                        liveUrl={project.liveUrl}
                        title={project.title}
                        industryTag={project.industryTag}
                        height={240}
                        previewImage={project.images?.[0]}
                      />
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ color: '#8E8E93', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          {project.industryTag}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              style={{
                                color: '#22C55E',
                                background: 'rgba(34, 197, 94, 0.12)',
                                border: '1px solid rgba(34, 197, 94, 0.25)',
                                padding: '3px 9px',
                                borderRadius: 999,
                                fontSize: 11,
                                fontWeight: 700,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              Live <ExternalLink size={11} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              style={{
                                color: '#A1A1AA',
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '3px 8px',
                                borderRadius: 999,
                                fontSize: 11,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                              }}
                            >
                              <GithubIcon size={12} />
                            </a>
                          )}
                        </div>
                      </div>

                      <Link to={`/case-studies/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                          {project.title}
                        </h2>
                      </Link>

                      <p style={{ color: '#8E8E93', fontSize: 13, lineHeight: 1.6, margin: '2px 0' }}>
                        {project.overview}
                      </p>

                      {/* Result metrics */}
                      {project.results?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 12px', background: '#14141A', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                          {project.results.slice(0, 2).map((res) => (
                            <div key={res.label} style={{ fontSize: 11, color: '#22C55E', fontWeight: 700 }}>
                              <span>{res.value}</span> <span style={{ color: '#8E8E93', fontWeight: 500 }}>· {res.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack */}
                      {project.techStack?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
                          {project.techStack.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              style={{
                                background: '#181820',
                                color: '#E4E4E7',
                                fontSize: 10,
                                padding: '3px 8px',
                                borderRadius: 999,
                                border: '1px solid rgba(255,255,255,0.06)',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        to={`/case-studies/${project.slug}`}
                        style={{
                          marginTop: 10,
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: 12,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          paddingTop: 10,
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        Explore Case Study <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Bottom CTA ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 60%), #050507',
          padding: 'clamp(80px, 10vw, 120px) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center',
        }}
      >
        <div className="site-container" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <span className="talos-pill">
            <span className="talos-pill-dot" /> Your Project
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#FFFFFF' }}>
            Ready to Architect Your System?
          </h2>
          <p style={{ color: '#8E8E93', fontSize: 16, maxWidth: 500, lineHeight: 1.7 }}>
            We engineer high-impact digital platforms with velocity, security, and aesthetic craft.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book-consultation" className="button-white">
              Book Free Consultation <ArrowUpRight size={14} />
            </Link>
            <Link to="/about" className="button-glass-play">
              Meet The Founders →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
