

import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ContentBlockProps {
  children: React.ReactNode;
  className?: string;
  isHero?: boolean;
  heroImageSrc?: string;
  heroImageAlt?: string;
  imageOnLeft?: boolean;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ children, className = '', isHero = false, heroImageSrc, heroImageAlt, imageOnLeft = false }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>(isHero ? 0 : 0.25);
  const verticalSpacing = isHero ? 'pt-24 pb-12 md:pt-40 md:pb-16' : 'py-12 md:py-16';
  const internalPadding = 'p-8 md:p-12 lg:p-16';

  if (!isHero && !isVisible) {
    return (
      <section 
        ref={ref}
        className={`relative w-full ${verticalSpacing}`}
        style={{ minHeight: '50vh' }}
        aria-hidden="true"
      />
    );
  }
  
  const contentWrapperClass = `bg-[rgba(255,255,255,0.70)] backdrop-blur-sm rounded-2xl shadow-2xl ${className}`;

  if (isHero && heroImageSrc) {
    const textColumn = (
      <div className="text-center md:text-left flex flex-col justify-center h-full">
        {children}
      </div>
    );
    
    const imageColumn = (
      <div className="w-full h-full">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-full">
          <img 
            src={heroImageSrc} 
            alt={heroImageAlt || ''} 
            className="w-full h-full object-cover" 
            style={{ filter: 'blur(0.5px)', transform: 'scale(1.1)' }}
            loading="lazy"
          />
        </div>
      </div>
    );

    return (
      <section 
        ref={ref}
        className={`relative w-full ${verticalSpacing} scroll-animate ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className={`${contentWrapperClass} ${internalPadding}`}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                {imageOnLeft ? (
                  <>
                    {imageColumn}
                    {textColumn}
                  </>
                ) : (
                  <>
                    <div className="md:order-last">{imageColumn}</div>
                    {textColumn}
                  </>
                )}
             </div>
           </div>
        </div>
      </section>
    );
  }

  return (
    <section 
        ref={ref}
        className={`relative w-full ${verticalSpacing} scroll-animate ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
         <div className={`${contentWrapperClass} ${internalPadding} text-center`}>
            {children}
         </div>
      </div>
    </section>
  );
};