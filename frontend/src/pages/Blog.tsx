import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listBlogPosts } from '../lib/api/endpoints';
import { BLOG_POSTS_DATA } from '../data/blogData';
import { ProjectLivePreview } from '../components/ProjectLivePreview';
import { SectionReveal } from '../components/SectionReveal';

const categories = [
  'All', 'Web Development', 'AI & Automation', 'Case Studies', 'Business Growth', 'Design Trends',
];

export default function Blog() {
  const [search, setSearch]     = useState('');
  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const t = window.setTimeout(() => setQuery(search), 320);
    return () => window.clearTimeout(t);
  }, [search]);

  const { data } = useQuery({
    queryKey: ['blog', query, category],
    queryFn: () => listBlogPosts({ search: query || undefined, category: category === 'All' ? undefined : category, page: 1, limit: 30 }),
  });

  const posts = useMemo(() => {
    const apiPosts = data?.data || [];
    const source = apiPosts.length ? apiPosts : BLOG_POSTS_DATA;

    return source.filter((post) => {
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchCategory =
        category === 'All' ||
        post.category.toLowerCase().includes(category.toLowerCase());

      return matchSearch && matchCategory;
    });
  }, [data, query, category]);

  return (
    <>
      <Helmet>
        <title>Journal & System Notes — KTUX</title>
        <meta name="description" content="Engineering architectural notes, production AI agents, high-concurrency systems, and digital platform breakdowns from KTUX." />
      </Helmet>

      {/* ── Section 1.1: Blog Hero (Dark #050507) ── */}
      <section className="page-hero section-gradient-dark" style={{ background: '#050507', padding: 'clamp(110px, 15vw, 170px) 20px clamp(36px, 5vw, 60px)', borderBottom: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="site-container" style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionReveal>
            <span className="talos-pill" style={{ marginBottom: 16 }}>
              <span className="talos-pill-dot" /> Studio Notes & Engineering
            </span>
            <h1 className="display" style={{ color: '#FFFFFF', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>
              Journal & System Breakdowns
            </h1>
            <p className="luxury" style={{ color: '#C9A227', fontSize: 'clamp(17px, 2.5vw, 22px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.3, marginBottom: 16 }}>
              Direct engineering insights on AI automation, web performance & system architecture
            </p>
            <p className="section-copy" style={{ color: '#8E8E93', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.65, maxWidth: 640, margin: '0 auto 28px' }}>
              Practical architectural breakdowns, performance benchmarks, and real production learnings from systems we build.
            </p>
          </SectionReveal>

          {/* Search bar */}
          <div style={{ width: '100%', maxWidth: 480, margin: '0 auto' }}>
            <label className="premium-search-bar" htmlFor="blog-search" style={{ background: '#121216', border: '1px solid #27272A', borderRadius: 999, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12, width: '100%', boxSizing: 'border-box' }}>
              <Search size={18} style={{ color: '#71717A', flexShrink: 0 }} />
              <input
                id="blog-search"
                aria-label="Search articles"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search systems, topics, tech..."
                style={{ color: '#FAFAF8', background: 'transparent', border: 'none', outline: 'none', fontSize: 14, flex: 1, minWidth: 0 }}
              />
            </label>
          </div>
        </div>
      </section>

      {/* ── Section 1.2 & 1.3: Filters & Articles Grid ── */}
      <section className="section" style={{ background: '#07070A', padding: 'clamp(30px, 4vw, 48px) 20px clamp(60px, 8vw, 100px)' }}>
        <div className="site-container" style={{ maxWidth: 1300, margin: '0 auto' }}>
          {/* Section 1.2 Filter Row */}
          <div style={{ marginBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 6, scrollbarWidth: 'none' }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#A1A1AA', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Filter:</span>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`fpill${category === cat ? ' active' : ''}`}
                    onClick={() => setCategory(cat)}
                    style={{
                      background: category === cat ? '#C9A227' : '#14141A',
                      border: category === cat ? '1px solid #C9A227' : '1px solid #27272A',
                      color: category === cat ? '#09090B' : '#E4E4E7',
                      fontWeight: category === cat ? 800 : 500,
                      fontSize: 13,
                      padding: '7px 16px',
                      borderRadius: 999,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 1.3 Articles Grid */}
          {posts.length > 0 ? (
            <>
              <div className="blog-grid-enhanced" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 'clamp(20px, 3vw, 28px)', alignItems: 'stretch' }}>
                {posts.map((post, i) => (
                  <SectionReveal key={post._id} delay={i * 0.04}>
                    <div
                      className="blog-card-wrapper"
                      style={{
                        background: '#0C0C10',
                        border: '1px solid #27272A',
                        borderRadius: 22,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                      }}
                    >
                      {/* Live System Preview Header */}
                      <div className="blog-img-wrap" style={{ height: 230, position: 'relative', overflow: 'hidden', background: '#0D0D10' }}>
                        <ProjectLivePreview
                          liveUrl={post.liveUrl}
                          title={post.projectTitle || post.title}
                          industryTag={post.category}
                          height={230}
                          previewImage={post.featuredImage || post.seo?.ogImage}
                        />
                      </div>

                      <div className="blog-card-body" style={{ padding: 'clamp(18px, 3vw, 24px)', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                          <span className="blog-tag" style={{ background: 'rgba(201, 162, 39, 0.15)', color: '#C9A227', border: '1px solid rgba(201, 162, 39, 0.3)', fontWeight: 800, fontSize: 11, padding: '4px 12px', borderRadius: 999, width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {post.category}
                          </span>
                          <span style={{ color: '#71717A', fontSize: 12, fontWeight: 500 }}>
                            {post.readTime || 6} min read
                          </span>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <h2 className="blog-card-title" style={{ color: '#FFFFFF', fontSize: 'clamp(17px, 2.5vw, 19px)', fontWeight: 800, lineHeight: 1.35, margin: '4px 0 8px 0', transition: 'color 0.2s' }}>
                            {post.title}
                          </h2>
                        </Link>

                        <p className="blog-card-excerpt" style={{ color: '#8E8E93', fontSize: 14, lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {post.excerpt}
                        </p>

                        <div className="blog-card-meta-row" style={{ color: '#71717A', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #1F1F24' }}>
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : 'Aug 2026'}
                          </span>
                          <Link
                            to={`/blog/${post.slug}`}
                            style={{
                              color: '#FAFAF8',
                              fontSize: 13,
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              textDecoration: 'none',
                            }}
                          >
                            Read Article <ArrowUpRight size={14} style={{ color: '#C9A227' }} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </>
          ) : (
            /* Section 1.5: No Articles State */
            <div className="empty-state" style={{ background: '#0C0C10', border: '1px solid rgba(255,255,255,0.08)', padding: '60px 30px', borderRadius: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, margin: '0 auto' }}>
              <h2 style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
                No articles matched "{search}"
              </h2>
              <p style={{ color: '#8E8E93', fontSize: 15, marginBottom: 24 }}>
                Try adjusting your search term or selecting another category.
              </p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); }}
                className="button-white"
                style={{ cursor: 'pointer' }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 1.6: Bottom CTA Section ── */}
      <section className="section" style={{ background: '#050507', padding: 'clamp(70px, 9vw, 110px) 20px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div className="site-container" style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <span className="talos-pill">
            <span className="talos-pill-dot" /> Direct Founder Line
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
            Ready to Build a High-Performing Digital System?
          </h2>
          <p style={{ color: '#8E8E93', fontSize: 16, maxWidth: 580, margin: '0 auto 12px', lineHeight: 1.6 }}>
            Book a 30-minute discovery consultation directly with our founding engineers.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link to="/book-consultation" className="button-white">
              Book a Free Consultation <ArrowUpRight size={14} />
            </Link>
            <Link to="/portfolio" className="button-glass-play">
              See Our Work <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
