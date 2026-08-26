import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowUpRight, Clock, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getBlogPost } from '../lib/api/endpoints';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug),
    enabled: !!slug,
  });

  /* Enrich headings with IDs for TOC */
  const enriched = useMemo(() => {
    let index = 0;
    return (post?.content || '').replace(
      /<h([2-3])([^>]*)>(.*?)<\/h\1>/gi,
      (_m, level, attrs, content) => `<h${level}${attrs} id="section-${index++}">${content}</h${level}>`,
    );
  }, [post?.content]);

  const safe = useMemo(() => DOMPurify.sanitize(enriched), [enriched]);

  const toc = useMemo(() =>
    Array.from(enriched.matchAll(/<h[2-3][^>]*id="(section-\d+)"[^>]*>(.*?)<\/h[2-3]>/gi))
      .map(m => ({ id: m[1], label: m[2].replace(/<[^>]+>/g, '') })),
    [enriched],
  );

  if (isLoading) return <div className="page-loader"><span className="spinner" /></div>;
  if (!post) return (
    <div className="empty-state page-empty">
      <span className="eyebrow">404 / Article not found</span>
      <h1>That thought<br /><span className="luxury gold">has moved.</span></h1>
      <Link className="button button-primary" to="/blog">Back to journal <ArrowLeft size={15} /></Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{post.title} — KTUX Journal</title>
        <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
        {post.seo?.ogImage && <meta property="og:image" content={post.seo.ogImage} />}
      </Helmet>

      <article>
        {/* ── Article Header (Dark) ── */}
        <header className="article-header-dark" style={{ background: '#09090B', padding: '160px 24px 60px', borderBottom: '1px solid #27272a' }}>
          <div className="site-container" style={{ maxWidth: 900 }}>
            <Link to="/blog" className="back-link" style={{ color: '#71717A', marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <ArrowLeft size={15} /> Back to journal
            </Link>
            <div style={{ marginTop: 20 }}>
              <span className="blog-tag" style={{ background: '#C9A227', color: '#1A1A1A', padding: '6px 14px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>{post.category}</span>
            </div>
            <h1 style={{ marginTop: 20, marginBottom: 16, color: '#FFFFFF', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.15 }}>{post.title}</h1>
            <p style={{ fontSize: 18, color: '#71717A', lineHeight: 1.65, maxWidth: 680, marginBottom: 28 }}>{post.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#71717A', fontSize: 13 }}>
                <Clock size={13} style={{ color: '#C9A227' }} /> {post.readTime} min read
              </span>
              <span className="meta-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#4A4A4E' }} />
              <span style={{ color: '#71717A', fontSize: 13 }}>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                  : 'KTUX Studio'}
              </span>
              <span className="meta-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#4A4A4E' }} />
              <button
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 0, cursor: 'pointer', color: '#71717A', fontSize: 13 }}
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                }}
              >
                <Share2 size={13} style={{ color: '#C9A227' }} /> Share
              </button>
            </div>
          </div>
        </header>

        {/* ── Featured Image ── */}
        {post.seo?.ogImage ? (
          <div style={{ width: '100%', height: 600, overflow: 'hidden' }}>
            <img
              className="article-featured-img"
              src={post.seo.ogImage}
              alt={post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="article-featured-placeholder" style={{ height: 400, background: '#18181B', color: '#C9A227', borderBottom: '1px solid #27272A', display: 'grid', placeItems: 'center', fontSize: 48, fontWeight: 800 }}>
            {post.category.slice(0, 2).toUpperCase()}
          </div>
        )}

        {/* ── Main Content + TOC ── */}
        <div className="site-container">
          <div className="article-content-layout">
            {/* TOC sidebar */}
            {toc.length > 0 && (
              <aside className="article-toc-side">
                <span className="toc-heading">In this article</span>
                {toc.map(item => (
                  <a href={`#${item.id}`} key={item.id}>{item.label}</a>
                ))}
              </aside>
            )}

            {/* Body */}
            <div>
              {/* Article content */}
              <div className="article-rich-body" dangerouslySetInnerHTML={{ __html: safe }} />

              {/* Author bio */}
              <div className="article-author-bio">
                <div className="author-avatar-circle">K</div>
                <div>
                  <p className="author-bio-name">KTUX Studio</p>
                  <p className="author-bio-role">AI & Web Development Studio</p>
                  <p className="author-bio-copy">
                    Notes on digital systems, intelligent automation, and building for the long view — from two founders who ship every line themselves.
                  </p>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="article-newsletter-cta">
                <h3>One useful dispatch.<br />Every month.</h3>
                <p>Studio notes, sharp ideas and early access to new systems — straight to your inbox. No fluff.</p>
                <div className="newsletter-input-row">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    aria-label="Email address for newsletter"
                  />
                  <button className="newsletter-sub-btn">
                    Subscribe <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>

              {/* Related CTA */}
              <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
                <Link className="button button-primary" to="/contact">
                  Discuss this with the studio <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
