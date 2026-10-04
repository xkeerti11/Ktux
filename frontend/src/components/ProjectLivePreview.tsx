import { useState, useEffect } from 'react';
import { ExternalLink, Globe, Play, Video, RotateCcw } from 'lucide-react';

interface ProjectLivePreviewProps {
  liveUrl?: string;
  title: string;
  industryTag?: string;
  height?: number | string;
  interactive?: boolean;
  previewImage?: string;
  isActiveCard?: boolean;
}

// Extracts YouTube video ID from standard watch, share, or shorts URLs
function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const beMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (beMatch) return beMatch[1];
  return null;
}

export function ProjectLivePreview({
  liveUrl,
  title,
  industryTag = 'WEB',
  height = 280,
  interactive = false,
  previewImage,
  isActiveCard = true,
}: ProjectLivePreviewProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Automatically STOP video playback when user switches to another card
  useEffect(() => {
    if (!isActiveCard) {
      setIsPlayingVideo(false);
    }
  }, [isActiveCard]);

  // Reset playback if liveUrl changes
  useEffect(() => {
    setIsPlayingVideo(false);
  }, [liveUrl]);

  // Extract clean domain or video path for display
  const youtubeId = extractYouTubeId(liveUrl);
  const isYouTube = Boolean(youtubeId);

  const domain = liveUrl
    ? isYouTube
      ? `youtube.com/shorts/${youtubeId}`
      : liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : '';

  // YouTube thumbnail fallback
  const resolvedPoster = previewImage || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '');

  // ChatSphere or known X-Frame restricted domains use high-res UI preview
  const isXFrameRestricted = domain.includes('chatsphere');
  const showFallbackImage = !isYouTube && (isXFrameRestricted || iframeError);

  return (
    <div
      className="project-live-preview-container"
      style={{
        width: '100%',
        height: typeof height === 'number' ? `${height}px` : height,
        position: 'relative',
        background: '#0D0D10',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: interactive ? '20px' : '0px',
      }}
    >
      {/* Mini Browser Toolbar */}
      <div
        style={{
          height: 38,
          background: '#18181B',
          borderBottom: '1px solid #27272A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', opacity: 0.85 }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', opacity: 0.85 }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', opacity: 0.85 }} />
        </div>

        {domain && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#09090B',
              border: '1px solid #27272A',
              borderRadius: 8,
              padding: '3px 14px',
              fontSize: 12,
              color: '#A1A1AA',
              maxWidth: 320,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {isYouTube ? (
              <Video size={13} style={{ color: '#EF4444', flexShrink: 0 }} />
            ) : (
              <Globe size={13} style={{ color: '#10B981', flexShrink: 0 }} />
            )}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
              {domain}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: isYouTube ? '#EF4444' : '#10B981',
                boxShadow: isYouTube ? '0 0 8px #EF4444' : '0 0 8px #10B981',
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: isYouTube ? '#F87171' : '#10B981',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              {isYouTube ? 'AI UGC DEMO' : 'LIVE'}
            </span>
          </div>
          {liveUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(liveUrl, '_blank', 'noreferrer,noopener');
              }}
              title={isYouTube ? 'Watch on YouTube' : 'Open full site in new tab'}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: '#71717A',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAFAF8')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#71717A')}
            >
              <ExternalLink size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Live Viewport Area */}
      <div
        style={{
          flex: 1,
          width: '100%',
          height: 'calc(100% - 38px)',
          position: 'relative',
          overflow: 'hidden',
          background: '#050507',
        }}
      >
        {/* CASE A: YouTube Video / Shorts Embed */}
        {isYouTube ? (
          interactive || isPlayingVideo ? (
            <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000000' }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`${title} AI UGC Video Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#000000',
                  display: 'block',
                }}
              />
              {/* Reset to Poster button if in carousel */}
              {!interactive && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingVideo(false);
                  }}
                  title="Close video preview"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: 'rgba(12, 12, 16, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 999,
                    color: '#FAFAF8',
                    padding: '4px 10px',
                    fontSize: 11,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    cursor: 'pointer',
                    zIndex: 10,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <RotateCcw size={12} /> Close
                </button>
              )}
            </div>
          ) : (
            /* YouTube Video Poster with Luxury Play Button Overlay */
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                background: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {resolvedPoster && (
                <img
                  src={resolvedPoster}
                  alt={`${title} Video Thumbnail`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.75)',
                    transition: 'transform 0.4s ease, filter 0.4s ease',
                  }}
                />
              )}

              {/* Gradient Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(9,9,11,0.78) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 14,
                  padding: 20,
                }}
              >
                {/* Gold Luxury Play Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlayingVideo(true);
                  }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F0D060, #C9A227)',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    color: '#09090B',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px rgba(201, 162, 39, 0.55), 0 8px 24px rgba(0, 0, 0, 0.7)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow =
                      '0 0 40px rgba(201, 162, 39, 0.8), 0 10px 30px rgba(0, 0, 0, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow =
                      '0 0 30px rgba(201, 162, 39, 0.55), 0 8px 24px rgba(0, 0, 0, 0.7)';
                  }}
                  aria-label="Play AI UGC Video Demo"
                >
                  <Play size={26} fill="#09090B" style={{ marginLeft: 3 }} />
                </button>

                <div style={{ textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      letterSpacing: '0.04em',
                      background: 'rgba(0, 0, 0, 0.65)',
                      padding: '4px 14px',
                      borderRadius: 100,
                      border: '1px solid rgba(201, 162, 39, 0.35)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Watch AI UGC Video Demo
                  </span>
                </div>
              </div>
            </div>
          )
        ) : interactive ? (
          /* CASE B: Full Interactive Case Study Detail View (Websites) */
          !showFallbackImage ? (
            <iframe
              src={liveUrl}
              title={`${title} Live Platform View`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#09090B',
                display: 'block',
              }}
            />
          ) : (
            /* High-res interactive mock view when iframe is restricted */
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                background: '#09090B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={`${title} Preview`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : null}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.7) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: 32,
                }}
              >
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button button-primary"
                    style={{
                      background: '#C9A227',
                      color: '#09090B',
                      fontWeight: 800,
                      fontSize: 15,
                      padding: '12px 28px',
                      borderRadius: 999,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                    }}
                  >
                    Open Live Application <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          )
        ) : (
          /* CASE C: Card View for Standard Websites (Portfolio / Homepage) */
          !showFallbackImage ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <iframe
                src={liveUrl}
                title={`${title} Preview`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#09090B',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ) : (
            /* High-res preview image inside the card browser frame */
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={`${title} Preview`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#18181B',
                    color: '#A1A1AA',
                    gap: 8,
                  }}
                >
                  <Globe size={24} style={{ color: '#C9A227' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{title}</span>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
