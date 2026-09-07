import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { getBlogPost } from '../lib/api/endpoints';
import { BLOG_POSTS_DATA } from '../data/blogData';
import { ProjectLivePreview } from '../components/ProjectLivePreview';

export default function BlogPost() {
  const { slug = '' } = useParams();
  const { data: apiPost } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug),
    enabled: !!slug,
  });

  const post = useMemo(() => {
    if (apiPost) return apiPost;
    return BLOG_POSTS_DATA.find((p) => p.slug === slug || p._id === slug) || null;
  }, [apiPost, slug]);

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

  if (!post) return (
    <div className="empty-state page-empty" style={{ paddingTop: 'clamp(140px, 18vw, 190px)', textAlign: 'center' }}>
      <span className="talos-pill">Article Not Found</span>
      <h1 style={{ color: '#FFFFFF', marginTop: 16 }}>That thought has moved.</h1>
      <Link className="button-white" to="/blog" style={{ marginTop: 24 }}>
        <ArrowLeft size={15} /> Back to journal
      </Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{post.title} — KTUX Journal</title>
        <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
        {post.seo?.ogImage && <meta property="og:image" content={post.seo.ogImage} />}
      </Helmet>

      <article style={{ background: '#050507' }}>
        {/* ── Article Header (Dark) ── */}
        <header className="article-header-dark" style={{ background: '#07070A', padding: 'clamp(120px, 15vw, 160px) 20px clamp(36px, 5vw, 50px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="site-container" style={{ maxWidth: 900, margin: '0 auto' }}>
            <Link to="/blog" className="back-link" style={{ color: '#8E8E93', marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 14 }}>
              <ArrowLeft size={15} /> Back to journal
            </Link>
            <div style={{ marginTop: 16 }}>
              <span className="blog-tag" style={{ background: 'rgba(201, 162, 39, 0.15)', color: '#C9A227', border: '1px solid rgba(201, 162, 39, 0.3)', padding: '5px 14px', borderRadius: 999, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {post.category}
              </span>
            </div>
            <h1 style={{ marginTop: 18, marginBottom: 14, color: '#FFFFFF', fontSize: 'clamp(26px, 4.5vw, 48px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: '#8E8E93', lineHeight: 1.65, maxWidth: 740, marginBottom: 24 }}>
              {post.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', color: '#71717A', fontSize: 13 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={13} style={{ color: '#C9A227' }} /> {post.readTime || 6} min read
              </span>
              <span className="meta-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#3F3F46' }} />
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : 'KTUX'}
              </span>
              <span className="meta-dot" style={{ width: 4, height: 4, borderRadius: '50%', background: '#3F3F46' }} />
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

        {/* ── Featured Live System Viewport ── */}
        <div className="site-container" style={{ maxWidth: 1000, margin: 'clamp(24px, 4vw, 40px) auto 0', padding: '0 20px' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #27272A', background: '#0D0D10', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
            <ProjectLivePreview
              liveUrl={post.liveUrl}
              title={post.projectTitle || post.title}
              industryTag={post.category}
              height={360}
              interactive={false}
              previewImage={post.featuredImage || post.seo?.ogImage}
            />
          </div>
        </div>

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
                  <p className="author-bio-name">KTUX</p>
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
              <div style={{ marginTop: 40, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link className="button-white" to="/book-consultation">
                  Book a Free Consultation <ArrowUpRight size={14} />
                </Link>
                <Link className="button-glass-play" to="/portfolio">
                  See Our Work <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
