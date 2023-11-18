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
  tablet: 720,
  phone: 360,
};

export function useScreen() {
  const { width } = useWindowDimensions();

  const tablet = width >= screenSizes.phone && width < screenSizes.desktop;
  const obj = {
    desktop: width > screenSizes.desktop && !tablet,
    tablet,
    phone: width < screenSizes.phone,
  };

  return obj;
}
