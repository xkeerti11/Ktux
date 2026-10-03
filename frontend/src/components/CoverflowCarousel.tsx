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
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [dynamicHeight, setDynamicHeight] = useState<number | null>(null);

  // Touch & Pointer tracking refs
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const hasMovedRef = useRef<boolean>(false);
  const isMouseDownRef = useRef<boolean>(false);

  const activeCardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = items.length;

  // Granular Responsive Breakpoint flags
  const isSmallMobile = windowWidth < 480;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Track window resize with debounced listener
  useEffect(() => {
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 80);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Measure card height dynamically without height bouncing jitter
  useEffect(() => {
    if (!activeCardRef.current) return;

    const updateHeight = () => {
      if (activeCardRef.current) {
        const height = activeCardRef.current.offsetHeight;
        if (height > 80) {
          // Keep the container height stable: only expand if a card exceeds previous height
          setDynamicHeight((prev) => Math.max(prev || 0, height + (isMobile ? 18 : 28)));
        }
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(activeCardRef.current);
    return () => resizeObserver.disconnect();
  }, [currentIndex, isMobile, items]);

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

  // Safe Touch Handling with strict direction locking
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
    isHorizontalSwipeRef.current = null;
    hasMovedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartXRef.current;
    const deltaY = currentY - touchStartYRef.current;

    // Movement threshold for distinguishing tap vs swipe
    if (Math.abs(deltaX) > 12 || Math.abs(deltaY) > 12) {
      hasMovedRef.current = true;
    }

    // Lock direction on first clear movement:
    // Vertical scrolling gets strict priority so page scroll never hitches
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaY) > 8 && Math.abs(deltaY) >= Math.abs(deltaX)) {
        isHorizontalSwipeRef.current = false; // Vertical scroll locked
      } else if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
        isHorizontalSwipeRef.current = true; // Horizontal swipe locked
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null && isHorizontalSwipeRef.current === true) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartXRef.current;
      const deltaTime = Date.now() - touchStartTimeRef.current;
      const velocity = Math.abs(deltaX) / (deltaTime || 1);

      // Fast flick or standard swipe distance
      if (Math.abs(deltaX) > 35 || (Math.abs(deltaX) > 20 && velocity > 0.35)) {
        if (deltaX < 0) {
          next();
        } else {
          prev();
        }
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    isHorizontalSwipeRef.current = null;
  };

  // Mouse Drag Support on Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only respond to main left click
    if (e.button !== 0) return;
    touchStartXRef.current = e.clientX;
    touchStartYRef.current = e.clientY;
    touchStartTimeRef.current = Date.now();
    isMouseDownRef.current = true;
    hasMovedRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current || touchStartXRef.current === null) return;
    const deltaX = e.clientX - touchStartXRef.current;
    const deltaY = e.clientY - (touchStartYRef.current || 0);

    if (Math.abs(deltaX) > 12 || Math.abs(deltaY) > 12) {
      hasMovedRef.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isMouseDownRef.current && touchStartXRef.current !== null) {
      const deltaX = e.clientX - touchStartXRef.current;
      const deltaTime = Date.now() - touchStartTimeRef.current;
      const velocity = Math.abs(deltaX) / (deltaTime || 1);

      if (Math.abs(deltaX) > 40 || (Math.abs(deltaX) > 20 && velocity > 0.4)) {
        if (deltaX < 0) {
          next();
        } else {
          prev();
        }
      }
    }
    isMouseDownRef.current = false;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Stable calculated height per device
  const fallbackHeight = typeof stageHeight === 'number'
    ? (isSmallMobile ? Math.min(stageHeight, 460) : stageHeight)
    : (isSmallMobile ? 480 : isMobile ? 500 : 520);

  const resolvedHeight = dynamicHeight ? Math.max(dynamicHeight, fallbackHeight) : fallbackHeight;

  // Responsive card width calculation: perfectly fitted to every device
  const cardWidth = isSmallMobile
    ? 'calc(100vw - 44px)'
    : isMobile
    ? 'min(86vw, 440px)'
    : isTablet
    ? 'min(84vw, 620px)'
    : 'min(80vw, 760px)';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`coverflow-carousel-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1300,
        margin: '0 auto',
        padding: isMobile ? '8px 0 6px' : '16px 0 10px',
        overflow: 'hidden',
        outline: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'pan-y', // Guarantees 100% smooth vertical scrolling on mobile
        cursor: isMouseDownRef.current ? 'grabbing' : 'default',
      }}
      aria-roledescription="carousel"
      aria-label="Interactive 3D Carousel"
    >
      {/* Carousel Stage */}
      <div
        style={{
          position: 'relative',
          minHeight: resolvedHeight,
          height: resolvedHeight,
          // Mobile disables 3D perspective to prevent WebKit font blur and backdrop-filter collapse
          perspective: isMobile ? 'none' : '1200px',
          WebkitPerspective: isMobile ? 'none' : '1200px',
          perspectiveOrigin: '50% 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '6px 0 12px' : '12px 0 18px',
          width: '100%',
          overflow: 'hidden',
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
          const isFarLeft = offset === -2;
          const isFarRight = offset === 2;
          const isVisible = Math.abs(offset) <= (isMobile ? 1 : 2);

          // Continuous physical positioning:
          // Items to the left always have negative translateX, items to right positive translateX.
          // This permanently eliminates ghosting and center-crossing animation glitches!
          let translateX = offset < 0 ? '-150%' : offset > 0 ? '150%' : '0%';
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 0;
          let zIndex = 1;
          let pointerEvents: 'auto' | 'none' = 'none';

          if (isActive) {
            translateX = '0%';
            translateZ = isMobile ? 0 : 35;
            rotateY = 0;
            scale = 1;
            opacity = 1;
            zIndex = 20;
            pointerEvents = 'auto';
          } else if (isLeft) {
            // Peek card on the left
            translateX = isSmallMobile ? '-86%' : isMobile ? '-78%' : isTablet ? '-68%' : '-62%';
            translateZ = isMobile ? 0 : -50;
            rotateY = isMobile ? 0 : 12;
            scale = isSmallMobile ? 0.92 : isMobile ? 0.90 : 0.88;
            opacity = isSmallMobile ? 0.45 : isMobile ? 0.50 : 0.65;
            zIndex = 10;
            pointerEvents = 'auto';
          } else if (isRight) {
            // Peek card on the right
            translateX = isSmallMobile ? '86%' : isMobile ? '78%' : isTablet ? '68%' : '62%';
            translateZ = isMobile ? 0 : -50;
            rotateY = isMobile ? 0 : -12;
            scale = isSmallMobile ? 0.92 : isMobile ? 0.90 : 0.88;
            opacity = isSmallMobile ? 0.45 : isMobile ? 0.50 : 0.65;
            zIndex = 10;
            pointerEvents = 'auto';
          } else if (isFarLeft) {
            translateX = isMobile ? '-140%' : '-112%';
            translateZ = isMobile ? 0 : -120;
            rotateY = isMobile ? 0 : 20;
            scale = isMobile ? 0.75 : 0.74;
            opacity = isMobile ? 0 : 0.22;
            zIndex = isMobile ? 0 : 5;
            pointerEvents = 'none';
          } else if (isFarRight) {
            translateX = isMobile ? '140%' : '112%';
            translateZ = isMobile ? 0 : -120;
            rotateY = isMobile ? 0 : -20;
            scale = isMobile ? 0.75 : 0.74;
            opacity = isMobile ? 0 : 0.22;
            zIndex = isMobile ? 0 : 5;
            pointerEvents = 'none';
          } else {
            // Offset <= -3 or >= 3: smoothly parked offstage
            translateX = offset < 0 ? '-160%' : '160%';
            translateZ = isMobile ? 0 : -180;
            scale = 0.65;
            opacity = 0;
            zIndex = 0;
            pointerEvents = 'none';
          }

          if (!isVisible) {
            opacity = 0;
            zIndex = 0;
            pointerEvents = 'none';
          }

          // Build hardware-accelerated transform string:
          // On mobile, translate3d + scale avoids 3D layer anti-aliasing bugs and stutter
          const transformString = isMobile
            ? `translate3d(${translateX}, 0, 0) scale(${scale})`
            : `translate3d(${translateX}, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;

          return (
            <div
              key={index}
              ref={isActive ? activeCardRef : null}
              onClick={() => {
                // If user was swiping or dragging, ignore tap to prevent accidental jump
                if (hasMovedRef.current) return;
                if (!isActive) goTo(index);
              }}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: cardWidth,
                maxWidth: '100%',
                transform: transformString,
                WebkitTransform: transformString,
                opacity,
                zIndex,
                pointerEvents,
                cursor: isActive ? 'default' : 'pointer',
                transition: 'transform 0.55s cubic-bezier(0.2, 0.85, 0.25, 1), opacity 0.45s ease, filter 0.45s ease',
                transformOrigin: '50% 50%',
                willChange: 'transform, opacity',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                filter: isActive
                  ? 'none'
                  : isMobile
                  ? 'brightness(0.68)'
                  : 'brightness(0.72) blur(0.2px)',
              }}
            >
              {renderItem(item, isActive, index)}
            </div>
          );
        })}
      </div>

      {/* Carousel Controls (Previous / Next Buttons & Indicators) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isSmallMobile ? 12 : 20,
          marginTop: isMobile ? 8 : 14,
          position: 'relative',
          zIndex: 30,
        }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous slide"
          style={{
            width: isSmallMobile ? 38 : 44,
            height: isSmallMobile ? 38 : 44,
            borderRadius: '50%',
            background: 'rgba(12, 12, 16, 0.94)',
            border: '1px solid rgba(201, 162, 39, 0.45)',
            color: 'var(--color-gold, #C9A227)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.55)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 39, 0.22)';
            e.currentTarget.style.borderColor = 'var(--color-gold, #C9A227)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(12, 12, 16, 0.94)';
            e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.45)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={isSmallMobile ? 18 : 20} />
        </button>

        {/* Indicators Dots */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isSmallMobile ? 6 : 8,
          }}
        >
          {items.map((_, dotIdx) => {
            const isCur = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(dotIdx);
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
                aria-current={isCur ? 'true' : 'false'}
                style={{
                  height: 8,
                  width: isCur ? (isSmallMobile ? 22 : 28) : 8,
                  borderRadius: isCur ? 4 : '50%',
                  background: isCur
                    ? 'linear-gradient(135deg, #F0D060, #C9A227)'
                    : 'rgba(255, 255, 255, 0.24)',
                  border: isCur
                    ? '1px solid rgba(201, 162, 39, 0.8)'
                    : '1px solid transparent',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  boxShadow: isCur ? '0 0 10px rgba(201, 162, 39, 0.5)' : 'none',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                }}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next slide"
          style={{
            width: isSmallMobile ? 38 : 44,
            height: isSmallMobile ? 38 : 44,
            borderRadius: '50%',
            background: 'rgba(12, 12, 16, 0.94)',
            border: '1px solid rgba(201, 162, 39, 0.45)',
            color: 'var(--color-gold, #C9A227)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.55)',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201, 162, 39, 0.22)';
            e.currentTarget.style.borderColor = 'var(--color-gold, #C9A227)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(12, 12, 16, 0.94)';
            e.currentTarget.style.borderColor = 'rgba(201, 162, 39, 0.45)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronRight size={isSmallMobile ? 18 : 20} />
        </button>
      </div>

      {/* Slide Counter Hint */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 11.5,
          color: 'var(--color-neutral, #A1A1AA)',
          marginTop: 6,
          letterSpacing: '0.08em',
        }}
      >
        <span>{currentIndex + 1}</span> / <span>{total}</span>
      </div>
    </div>
  );
}
