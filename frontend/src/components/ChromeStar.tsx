import React from 'react';

interface ChromeStarProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ChromeStar({ size = 280, className = '', style }: ChromeStarProps) {
  return (
    <div
      className={`chrome-star-wrap ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'grid',
        placeItems: 'center',
        ...style,
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main 3D Metallic Chrome Star */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }}
      >
        <defs>
          {/* Chrome Metallic Linear Gradients */}
          <linearGradient id="chromeLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#D4D4D8" />
            <stop offset="50%" stopColor="#71717A" />
            <stop offset="75%" stopColor="#E4E4E7" />
            <stop offset="100%" stopColor="#27272A" />
          </linearGradient>

          <linearGradient id="chromeDark" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A1A1AA" />
            <stop offset="40%" stopColor="#3F3F46" />
            <stop offset="70%" stopColor="#18181B" />
            <stop offset="100%" stopColor="#52525B" />
          </linearGradient>

          <linearGradient id="chromeSpecular" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#A1A1AA" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Shadow & Rim */}
        <path
          d="M200 10 C200 120 280 200 390 200 C280 200 200 280 200 390 C200 280 120 200 10 200 C120 200 200 120 200 10 Z"
          fill="url(#chromeDark)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />

        {/* Top-Right Facet (High Reflection) */}
        <path
          d="M200 10 C200 120 280 200 390 200 L200 200 Z"
          fill="url(#chromeLight)"
        />

        {/* Bottom-Left Facet (Reflective Edge) */}
        <path
          d="M200 390 C200 280 120 200 10 200 L200 200 Z"
          fill="url(#chromeLight)"
          opacity="0.85"
        />

        {/* Top-Left Facet (Deep Metallic Shader) */}
        <path
          d="M200 10 C200 120 120 200 10 200 L200 200 Z"
          fill="url(#chromeDark)"
        />

        {/* Bottom-Right Facet (Deep Shadow Shader) */}
        <path
          d="M200 390 C200 280 280 200 390 200 L200 200 Z"
          fill="url(#chromeDark)"
        />

        {/* Sharp Center Cross Highlights */}
        <path
          d="M200 10 L200 390"
          stroke="url(#chromeSpecular)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10 200 L390 200"
          stroke="url(#chromeSpecular)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center Specular Orb */}
        <circle cx="200" cy="200" r="14" fill="url(#centerGlow)" />
        <circle cx="200" cy="200" r="4" fill="#FFFFFF" />

        {/* Secondary floating mini metallic star (Top Left) */}
        <g transform="translate(40, 40) scale(0.28)">
          <path
            d="M200 10 C200 120 280 200 390 200 C280 200 200 280 200 390 C200 280 120 200 10 200 C120 200 200 120 200 10 Z"
            fill="url(#chromeLight)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
          />
        </g>

        {/* Tertiary mini spark (Bottom Right) */}
        <g transform="translate(310, 290) scale(0.2)">
          <path
            d="M200 10 C200 120 280 200 390 200 C280 200 200 280 200 390 C200 280 120 200 10 200 C120 200 200 120 200 10 Z"
            fill="url(#chromeLight)"
          />
        </g>
      </svg>
    </div>
  );
}
