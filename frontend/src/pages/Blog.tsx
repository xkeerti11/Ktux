import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listBlogPosts } from '../lib/api/endpoints';
import { BLOG_POSTS_DATA } from '../data/blogData';
import { ImageWithFallback } from '../components/ImageWithFallback';
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
        <title>Journal — KTUX Studio</title>
        <meta name="description" content="Ideas on digital systems, AI, brand and building for the long view. Studio notes from Ktux." />
      </Helmet>

      {/* ── Section 1.1: Blog Hero (Dark #09090B) ── */}
      <section className="page-hero section-gradient-dark" style={{ background: '#09090B', padding: 'clamp(110px, 16vw, 170px) 24px clamp(36px, 5vw, 60px)', borderBottom: '1px solid #27272a', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="site-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionReveal>
            <h1 className="display" style={{ color: '#FFFFFF', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
              Insights & Resources
            </h1>
            <p className="luxury" style={{ color: '#C9A227', fontSize: 'clamp(18px, 3vw, 24px)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.3, marginBottom: 20 }}>
              Latest articles on AI, web development & design
            </p>
            <p className="section-copy" style={{ color: '#71717A', fontSize: 16, lineHeight: 1.6, maxWidth: 600, margin: '0 auto 28px' }}>
              Explore our curated collection of articles, case studies, and industry insights
            </p>
          </SectionReveal>

          {/* Search bar */}
          <div style={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
            <label className="premium-search-bar" htmlFor="blog-search" style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: 999, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
              <Search size={18} style={{ color: '#71717A', flexShrink: 0 }} />
              <input
                id="blog-search"
                aria-label="Search articles"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                style={{ color: '#FAFAF8', background: 'transparent', border: 'none', outline: 'none', fontSize: 14, flex: 1 }}
              />
            </label>
          </div>
        </div>
      </section>

      {/* ── Section 1.2 & 1.3: Filters & Articles Grid (Dark #09090B) ── */}
      <section className="section" style={{ background: '#09090B', padding: 'clamp(30px, 5vw, 40px) 24px clamp(50px, 7vw, 80px)' }}>
        <div className="site-container" style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Section 1.2 Filter Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36, borderTop: '1px solid #27272A', paddingTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', width: '100%' }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#FFFFFF', flexShrink: 0 }}>Filter by:</span>
              <div className="mobile-scroll-row" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`fpill${category === cat ? ' active' : ''}`}
                    onClick={() => setCategory(cat)}
                    style={{
                      background: category === cat ? '#C9A227' : '#18181B',
                      border: category === cat ? '1px solid #C9A227' : '1px solid #27272A',
                      color: category === cat ? '#09090B' : '#FAFAF8',
                      fontWeight: category === cat ? 700 : 400,
                      fontSize: 13,
                      padding: '7px 16px',
                      borderRadius: 999,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
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
              <div className="blog-grid-enhanced" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24, alignItems: 'start' }}>
                {posts.map((post, i) => (
                  <SectionReveal key={post._id} delay={i * 0.04}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="blog-card-enhanced"
                      style={{
                        background: '#0C0C10',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 24,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div className="blog-img-wrap" style={{ height: 230, position: 'relative', overflow: 'hidden', background: '#121218' }}>
                        <ImageWithFallback
                          src={post.featuredImage || post.seo?.ogImage}
                          alt={post.title}
                          fallback={post.category.slice(0, 2).toUpperCase()}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="blog-card-body" style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>
                        <span className="blog-tag" style={{ background: '#C9A227', color: '#09090B', fontWeight: 800, fontSize: 11, padding: '4px 12px', borderRadius: 999, width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {post.category}
                        </span>
                        <h2 className="blog-card-title" style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 800, lineHeight: 1.4, margin: 0 }}>
                          {post.title}
                        </h2>
                        <p className="blog-card-excerpt" style={{ color: '#8E8E93', fontSize: 14, lineHeight: 1.6, margin: '6px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {post.excerpt}
                        </p>
                        <div className="blog-card-meta-row" style={{ color: '#8E8E93', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
                              : 'Aug 2026'}
                          </span>
                          <span>•</span>
                          <span>{post.readTime || 5} min read</span>
                        </div>
                      </div>
                    </Link>
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
      <section className="section" style={{ background: '#07070A', padding: 'clamp(60px, 8vw, 100px) 24px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div className="site-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <span className="talos-pill">
            <span className="talos-pill-dot" /> Direct Consultation
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>
            Ready to Build a High-Converting Digital Platform?
          </h2>
          <p style={{ color: '#8E8E93', fontSize: 16, maxWidth: 580, margin: '0 auto 12px', lineHeight: 1.6 }}>
            Book a 30-minute discovery call directly with our engineering founders.
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
