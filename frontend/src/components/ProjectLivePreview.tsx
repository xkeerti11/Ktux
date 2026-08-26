import { useState } from 'react';
import { ExternalLink, Globe, Maximize2 } from 'lucide-react';

interface ProjectLivePreviewProps {
  liveUrl?: string;
  title: string;
  industryTag?: string;
  height?: number | string;
  interactive?: boolean;
  previewImage?: string;
}

export function ProjectLivePreview({
  liveUrl,
  title,
  industryTag = 'WEB',
  height = 280,
  interactive = false,
  previewImage,
}: ProjectLivePreviewProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Extract clean domain for display
  const domain = liveUrl ? liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';

  // ChatSphere or known X-Frame restricted domains use high-res UI preview
  const isXFrameRestricted = domain.includes('chatsphere');
  const showFallbackImage = isXFrameRestricted || iframeError;

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
            <Globe size={13} style={{ color: '#10B981', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
              {domain}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 11, color: '#10B981', fontWeight: 700 }}>LIVE</span>
          </div>
          {liveUrl && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(liveUrl, '_blank', 'noreferrer,noopener');
              }}
              title="Open full site in new tab"
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
          background: '#09090B',
        }}
      >
        {/* Full Interactive Case Study Detail View */}
        {interactive ? (
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
          /* Card View (Portfolio / Homepage) */
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
