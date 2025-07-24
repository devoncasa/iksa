

import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useBackground } from '../App';

interface ContentBlockProps {
  children: React.ReactNode;
  className?: string;
  isHero?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ children, className = '', isHero = false }) => {
  // isHero renders immediately (threshold 0), others when 25% visible
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(isHero ? 0 : 0.25);
  const { registerSection, setActiveImageUrl } = useBackground();
  const [imageUrl] = useState(() => registerSection());

  useEffect(() => {
    if (isVisible) {
      setActiveImageUrl(imageUrl);
    }
  }, [isVisible, imageUrl, setActiveImageUrl]);


  // Vertical spacing for the entire section block
  const verticalSpacing = isHero ? 'pt-24 pb-12 md:pt-40 md:pb-16' : 'py-12 md:py-16';
  
  // For non-hero sections, render a placeholder until they are visible to lazy-load content
  if (!isHero && !isVisible) {
    return (
      <section 
        ref={ref}
        className={`relative w-full ${verticalSpacing}`}
        style={{ minHeight: '50vh' }} // A placeholder to prevent layout shift
        aria-hidden="true"
      />
    );
  }
  
  // Padding inside the semi-transparent content box
  const internalPadding = 'p-8 md:p-12 lg:p-16';

  return (
    <section 
        ref={ref}
        className={`relative w-full ${verticalSpacing} scroll-animate ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
         <div className={`bg-[rgba(255,255,255,0.70)] backdrop-blur-sm rounded-2xl shadow-2xl ${internalPadding} text-center ${className}`}>
            {children}
         </div>
      </div>
    </section>
  );
};