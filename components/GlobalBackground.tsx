


import React, { useState, useEffect, useCallback } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { BACKGROUND_IMAGES, THOBE_GUIDE_BACKGROUND_IMAGES, getRandomImage } from '../constants';

export const GlobalBackground: React.FC = () => {
  const location = ReactRouterDOM.useLocation();
  
  const getImageSourceArray = useCallback(() => {
    if (location.pathname === '/thobe-guide') {
      return THOBE_GUIDE_BACKGROUND_IMAGES;
    }
    return BACKGROUND_IMAGES;
  }, [location.pathname]);

  const [backgroundImage, setBackgroundImage] = useState(() => getRandomImage(getImageSourceArray()));
  const [loading, setLoading] = useState(true);

  // Effect to change background image when route changes
  useEffect(() => {
    const newSourceArray = getImageSourceArray();
    setBackgroundImage(prev => getRandomImage(newSourceArray, prev));
  }, [location.pathname, getImageSourceArray]);

  // Effect to preload the image and handle loading state
  useEffect(() => {
    if (backgroundImage) {
      setLoading(true);
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => setLoading(false);
      img.onerror = () => {
        console.error(`Failed to load background image: ${backgroundImage}`);
        setLoading(false);
      }
    }
  }, [backgroundImage]);

  return (
    <div 
        className="fixed inset-0 z-[-1] w-full h-screen transition-opacity duration-1000 ease-in-out"
        style={{ opacity: loading ? 0 : 1 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundAttachment: 'fixed', // This creates the classic "still parallax" effect
          filter: 'blur(4px)',
          transform: 'scale(1.05)',
        }}
      ></div>
      <div className="absolute inset-0 bg-white/30"></div>
    </div>
  );
};