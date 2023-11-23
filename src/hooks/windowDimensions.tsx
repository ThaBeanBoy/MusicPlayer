// orginal: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const screenSizes = {
  desktop: 1280,
  tablet: 1120,
  phone: 800,
};

export type screen = 'mobile' | 'tablet' | 'desktop';

export function useScreen(): screen {
  const { width } = useWindowDimensions();

  if (width < screenSizes.phone) return 'mobile';

  if (width < screenSizes.tablet) return 'tablet';

  return 'desktop';
}
