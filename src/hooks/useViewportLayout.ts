import { useState, useEffect } from 'react';

export type ViewportMode =
  | 'desktop'          // >= 1280px wide & >= 540px tall -> 3-column full workspace
  | 'laptop'           // 1024px–1279px wide & >= 520px tall -> 3-column compact workspace
  | 'tablet'           // 768px–1023px wide & >= 520px tall -> 2-column split workspace
  | 'mobile-landscape' // < 520px tall & >= 560px wide (phone rotated horizontally)
  | 'mobile-portrait'; // < 768px wide & >= 520px tall (or very small screens)

export interface ViewportLayoutState {
  width: number;
  height: number;
  mode: ViewportMode;
  isDesktopOrLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isMobileLandscape: boolean;
  isMobilePortrait: boolean;
  isCompactHeight: boolean;
}

function computeLayout(width: number, height: number): ViewportLayoutState {
  let mode: ViewportMode;

  if (height < 520 && width >= 560) {
    // Phone in landscape orientation (e.g., 844x390, 915x412, 667x375)
    mode = 'mobile-landscape';
  } else if (width < 768) {
    // Phone in portrait orientation (e.g., 360x800, 390x844, 430x932)
    mode = 'mobile-portrait';
  } else if (width < 1024) {
    // Tablet portrait / narrow split screen (768px–1023px)
    mode = 'tablet';
  } else if (width < 1280) {
    // Standard laptop (1024px–1279px)
    mode = 'laptop';
  } else {
    // Full desktop monitor (>= 1280px)
    mode = 'desktop';
  }

  return {
    width,
    height,
    mode,
    isDesktopOrLaptop: mode === 'desktop' || mode === 'laptop',
    isTablet: mode === 'tablet',
    isMobile: mode === 'mobile-portrait' || mode === 'mobile-landscape',
    isMobileLandscape: mode === 'mobile-landscape',
    isMobilePortrait: mode === 'mobile-portrait',
    isCompactHeight: height < 520,
  };
}

export function useViewportLayout(): ViewportLayoutState {
  const [layout, setLayout] = useState<ViewportLayoutState>(() => {
    if (typeof window === 'undefined') {
      return computeLayout(1440, 900);
    }
    return computeLayout(window.innerWidth, window.innerHeight);
  });

  useEffect(() => {
    const handleResize = () => {
      const next = computeLayout(window.innerWidth, window.innerHeight);
      setLayout((prev) =>
        prev.width === next.width && prev.height === next.height && prev.mode === next.mode
          ? prev
          : next
      );
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return layout;
}
