
import React, { useState, useEffect } from 'react';
import { SECTION_BACKGROUND_IMAGES } from '../constants';

export const GlobalBackground: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const randomImage = SECTION_BACKGROUND_IMAGES[Math.floor(Math.random() * SECTION_BACKGROUND_IMAGES.length)];
    const img = new Image();
    img.src = randomImage;
    img.onload = () => {
      setBackgroundImage(randomImage);
      setIsLoaded(true);
    };
    img.onerror = () => {
        // Fallback or error handling
        setIsLoaded(true); // Allow content to show even if image fails
    }
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-creamy-beige">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(8px)',
          transform: 'scale(1.15)', // To hide blurred edges
          opacity: isLoaded ? 1 : 0,
        }}
      ></div>
      <div className="absolute inset-0 bg-white/30"></div> {/* 30% white overlay */}
    </div>
  );
};
