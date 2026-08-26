import { useState, type CSSProperties } from 'react';

export function ImageWithFallback({ src, alt, className = '', fallback = 'KTUX', style }: { src?: string; alt: string; className?: string; fallback?: string; style?: CSSProperties }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`image-fallback ${className}`} style={style} role="img" aria-label={alt}><span>{fallback}</span></div>;
  return <img src={src} alt={alt} className={className} style={style} loading="lazy" onError={() => setFailed(true)} />;
}

