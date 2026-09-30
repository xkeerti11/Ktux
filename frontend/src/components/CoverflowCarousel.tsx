import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CoverflowCarouselProps<T> {
  items: T[];
  renderItem: (item: T, isActive: boolean, index: number) => React.ReactNode;
  initialIndex?: number;
  autoPlayInterval?: number; // 0 or undefined = no autoplay
  className?: string;
  stageHeight?: string | number;
}

export function CoverflowCarousel<T>({
  items,
  renderItem,
  initialIndex = 0,
  autoPlayInterval = 0,
  className = '',
  stageHeight = 'auto',
}: CoverflowCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = items.length;

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(idx);
  }, []);

  // Autoplay support
  useEffect(() => {
    if (!autoPlayInterval || autoPlayInterval <= 0) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, next]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prev();
    } else if (e.key === 'ArrowRight') {
      next();
    }
  };

  // Touch / Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    const threshold = 45;
    if (touchDeltaX > threshold) {
      prev();
    } else if (touchDeltaX < -threshold) {
      next();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`coverflow-carousel-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1300,
        margin: '0 auto',
        padding: '20px 0 10px',
        overflow: 'hidden',
        outline: 'none',
        userSelect: 'none',
      }}
      aria-roledescription="carousel"
      aria-label="Interactive 3D Carousel"
    >
      {/* 3D Stage */}
      <div
        style={{
          position: 'relative',
          minHeight: stageHeight === 'auto' ? 560 : stageHeight,
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 10px 30px',
        }}
      >
        {items.map((item, index) => {
          // Calculate distance from current index with wrapping
          let offset = index - currentIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = Math.abs(offset) <= 2;

          // Compute 3D transformation
          let translateX = '0%';
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 0;
          let zIndex = 1;
          let pointerEvents: 'auto' | 'none' = 'none';

          if (isActive) {
            translateX = '0%';
            translateZ = 60;
            rotateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = 10;
            pointerEvents = 'auto';
          } else if (isLeft) {
            translateX = '-68%';
            translateZ = -80;
            rotateY = 18;
            scale = 0.86;
            opacity = 0.65;
            zIndex = 5;
            pointerEvents = 'auto';
          } else if (isRight) {
            translateX = '68%';
            translateZ = -80;
            rotateY = -18;
            scale = 0.86;
            opacity = 0.65;
            zIndex = 5;
            pointerEvents = 'auto';
          } else if (offset === -2) {
            translateX = '-115%';
            translateZ = -180;
            rotateY = 28;
            scale = 0.72;
            opacity = 0.2;
            zIndex = 2;
          } else if (offset === 2) {
            translateX = '115%';
            translateZ = -180;
            rotateY = -28;
            scale = 0.72;
            opacity = 0.2;
            zIndex = 2;
          }

          if (!isVisible) {
            opacity = 0;
            zIndex = 0;
          }

          return (
            <div
              key={index}
              onClick={() => {
                if (!isActive) goTo(index);
              }}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'min(88vw, 760px)',
                maxWidth: '100%',
                transform: `translateX(${translateX}) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents,
                cursor: isActive ? 'default' : 'pointer',
                transition: 'transform 0.75s cubic-bezier(0.2, 0.85, 0.25, 1), opacity 0.6s ease, filter 0.6s ease',
                transformOrigin: '50% 50%',
                willChange: 'transform, opacity',
                filter: isActive ? 'none' : 'brightness(0.7) blur(0.2px)',
              }}
            >
              {renderItem(item, isActive, index)}
            </div>
          );
        })}
      </div>

      {/* Carousel Controls (Prev / Next Buttons & Indicators) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          marginTop: 8,
          position: 'relative',
          zIndex: 20,
        }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(12, 12, 16, 0.85)',
            border: '1px solid rgba(201, 162, 39, 0.35)',
            color: 'var(--color-gold, #C9A227)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 39, 0.18)';
            e.currentTarget.style.borderColor = 'var(--color-gold, #C9A227)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(12, 12, 16, 0.85)';
            e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.35)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots / Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {items.map((_, dotIdx) => {
            const isCur = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goTo(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                aria-current={isCur ? 'true' : 'false'}
                style={{
                  height: 8,
                  width: isCur ? 28 : 8,
                  borderRadius: isCur ? 4 : '50%',
                  background: isCur
                    ? 'linear-gradient(135deg, #F0D060, #C9A227)'
                    : 'rgba(255, 255, 255, 0.2)',
                  border: isCur
                    ? '1px solid rgba(201, 162, 39, 0.8)'
                    : '1px solid transparent',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  boxShadow: isCur ? '0 0 10px rgba(201, 162, 39, 0.5)' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(12, 12, 16, 0.85)',
            border: '1px solid rgba(201, 162, 39, 0.35)',
            color: 'var(--color-gold, #C9A227)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 39, 0.18)';
            e.currentTarget.style.borderColor = 'var(--color-gold, #C9A227)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(12, 12, 16, 0.85)';
            e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.35)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide counter hint */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 12,
          color: 'var(--color-neutral, #A1A1AA)',
          marginTop: 10,
          letterSpacing: '0.08em',
        }}
      >
        <span>{currentIndex + 1}</span> / <span>{total}</span>
      </div>
    </div>
  );
}
