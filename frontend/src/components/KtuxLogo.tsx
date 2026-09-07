import React from 'react';

export type KtuxLogoVariant = 'wordmark' | 'monogram' | 'k-mark' | 'combination' | 'responsive';
export type KtuxLogoTheme = 'light' | 'dark' | 'gold' | 'currentColor';

export interface KtuxLogoProps {
  variant?: KtuxLogoVariant;
  theme?: KtuxLogoTheme;
  height?: number | string;
  width?: number | string;
  sparkle?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

/**
 * Official KTUX Vector Logo System Component
 * Renders approved luxury architectural brand vectors with zero-latency inline SVG.
 */
export function KtuxLogo({
  variant = 'wordmark',
  theme = 'light',
  height = 28,
  width,
  sparkle = true,
  className = '',
  style,
  ariaLabel = 'KTUX Logo',
}: KtuxLogoProps) {
  // Theme color definitions
  const fillColor =
    theme === 'currentColor'
      ? 'currentColor'
      : theme === 'dark'
      ? '#09090B'
      : theme === 'gold'
      ? '#F59E0B'
      : '#FFFFFF';

  const sparkleColor = theme === 'gold' ? '#D97706' : '#FACC15';

  if (variant === 'monogram') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width || height}
        className={className}
        style={{ display: 'inline-block', flexShrink: 0, ...style }}
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="mono-grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
          <linearGradient id="mono-grad-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#mono-grad-bg)" stroke="url(#mono-grad-stroke)" strokeWidth="1.5" />
        <g fill={fillColor}>
          {/* K vertical spine */}
          <path d="M14 14H20V50H14V14Z" />
          {/* K upper arm + T top bar interlocking */}
          <path d="M33 14H50V20H25.5L33 14Z" />
          <path d="M36 20H48V25H36V20Z" opacity="0.85" />
          {/* K lower leg */}
          <path d="M21 29L36 50H45L27 26L21 29Z" />
          {/* T vertical stem */}
          <path d="M40 14H46V42H40V14Z" />
        </g>
        {sparkle && (
          <path
            d="M52 10 C52 12 54 13 56 13 C54 13 52 14 52 16 C52 14 50 13 48 13 C50 13 52 12 52 10 Z"
            fill={sparkleColor}
          />
        )}
      </svg>
    );
  }

  if (variant === 'k-mark') {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width || height}
        className={className}
        style={{ display: 'inline-block', flexShrink: 0, ...style }}
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="kmark-grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
          <linearGradient id="kmark-grad-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#kmark-grad-bg)" stroke="url(#kmark-grad-stroke)" strokeWidth="1.5" />
        <g fill={fillColor}>
          <path d="M16 14H23V50H16V14Z" />
          <path d="M38 14H48L30 31L23 31L38 14Z" />
          <path d="M26 28L41 50H50L33 28H26Z" />
        </g>
        {sparkle && (
          <path
            d="M50 11 C50 12.5 51.5 13.5 53 13.5 C51.5 13.5 50 14.5 50 16 C50 14.5 48.5 13.5 47 13.5 C48.5 13.5 50 12.5 50 11 Z"
            fill={sparkleColor}
          />
        )}
      </svg>
    );
  }

  if (variant === 'combination') {
    return (
      <svg
        viewBox="0 0 280 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width}
        className={className}
        style={{ display: 'inline-block', flexShrink: 0, ...style }}
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id="comb-badge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#09090B" />
          </linearGradient>
          <linearGradient id="comb-badge-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>
        </defs>

        {/* Left Monogram Badge */}
        <g transform="translate(4, 4)">
          <rect width="56" height="56" rx="13" fill="url(#comb-badge-bg)" stroke="url(#comb-badge-stroke)" strokeWidth="1.5" />
          <g fill={fillColor}>
            <path d="M13 13H18.5V43H13V13Z" />
            <path d="M30 13H45V18.5H23L30 13Z" />
            <path d="M32 18.5H43V23H32V18.5Z" opacity="0.85" />
            <path d="M19 26.5L32.5 43H41L24.5 24L19 26.5Z" />
            <path d="M36 13H41.5V36H36V13Z" />
          </g>
          {sparkle && (
            <path
              d="M47 9 C47 10.5 48.5 11.5 50 11.5 C48.5 11.5 47 12.5 47 14 C47 12.5 45.5 11.5 44 11.5 C45.5 11.5 47 10.5 47 9 Z"
              fill={sparkleColor}
            />
          )}
        </g>

        {/* Right Wordmark */}
        <g transform="translate(74, 5)" fill={fillColor}>
          {/* K */}
          <path d="M10 9H17V45H10V9Z" />
          <path d="M32 9H41L25.5 28.5L17 28.5L32 9Z" />
          <path d="M20 25.5L35 45H43.5L26.5 25.5H20Z" />

          {/* T */}
          <path d="M50 9H84V16.5H70.5V45H63.5V16.5H50V9Z" />

          {/* U */}
          <path d="M91 9H98V34C98 38 100 39.8 105.5 39.8C111 39.8 113 38 113 34V9H120V34C120 42 114.5 45.5 105.5 45.5C96.5 45.5 91 42 91 34V9Z" />

          {/* X */}
          <path d="M128 9H136.5L145.5 23.5L154.5 9H163L150.2 27L164 45H155.5L145.5 30.5L135.5 45H127L140.8 27L128 9Z" />

          {/* Sparkle */}
          {sparkle && (
            <path
              d="M174 7 C174 11 178 13.5 180.5 13.5 C178 13.5 174 16 174 20 C174 16 170 13.5 167.5 13.5 C170 13.5 174 11 174 7 Z"
              fill={sparkleColor}
            />
          )}
        </g>
      </svg>
    );
  }

  // Default: Full Wordmark
  return (
    <svg
      viewBox="0 0 216 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      role="img"
      aria-label={ariaLabel}
    >
      {/* Letter K */}
      <g fill={fillColor}>
        <path d="M10 9H18V45H10V9Z" />
        <path d="M35 9H45L27.5 28.5L18 28.5L35 9Z" />
        <path d="M21.5 25.5L38 45H47.5L28.5 25.5H21.5Z" />
      </g>

      {/* Letter T */}
      <g fill={fillColor}>
        <path d="M54 9H92V16.5H76.8V45H69.2V16.5H54V9Z" />
      </g>

      {/* Letter U */}
      <g fill={fillColor}>
        <path d="M100 9H107.8V34C107.8 38.2 110.2 40 116.5 40C122.8 40 125.2 38.2 125.2 34V9H133V34C133 42.5 126.5 45.8 116.5 45.8C106.5 45.8 100 42.5 100 34V9Z" />
      </g>

      {/* Letter X */}
      <g fill={fillColor}>
        <path d="M141 9H150.5L160.5 23.5L170.5 9H180L165.8 27L181 45H171.5L160.5 30.5L149.5 45H140L155.2 27L141 9Z" />
      </g>

      {/* Luxury Diamond Sparkle Accent */}
      {sparkle && (
        <g transform="translate(190, 8)">
          <path
            d="M8 0 C8 5 13 8 16 8 C13 8 8 11 8 16 C8 11 3 8 0 8 C3 8 8 5 8 0 Z"
            fill={sparkleColor}
          />
          <circle cx="8" cy="8" r="1.5" fill="#FFFFFF" />
        </g>
      )}
    </svg>
  );
}

/**
 * Responsive Navbar Logo component that intelligently renders the luxury monogram icon
 * along with the full/compact wordmark based on viewport size.
 */
export function ResponsiveNavbarLogo({
  height = 26,
  className = '',
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`ktux-brand-lockup ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
        lineHeight: 1,
      }}
    >
      <KtuxLogo variant="k-mark" height={height + 6} ariaLabel="KTUX Emblem" />
      <KtuxLogo
        variant="wordmark"
        height={height}
        sparkle={false}
        className="hide-on-very-small"
        ariaLabel="KTUX Wordmark"
      />
    </div>
  );
}
