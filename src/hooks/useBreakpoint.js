'use client';

import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1440,
  ultra: 1920,
};

const getBreakpoint = (width) => {
  if (width >= breakpoints.ultra) return 'ultra';
  if (width >= breakpoints.xxl) return 'xxl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('lg');
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      setBreakpoint(getBreakpoint(newWidth));
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = breakpoint === 'xs' || breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === 'xxl' || breakpoint === 'ultra';
  const isLargeScreen = breakpoint === 'xxl' || breakpoint === 'ultra';

  return {
    breakpoint,
    width,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    isXxl: breakpoint === 'xxl',
    isUltra: breakpoint === 'ultra',
  };
}; 