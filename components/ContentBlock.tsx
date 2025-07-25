

import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ManagedImage } from './ManagedImage';

interface ContentBlockProps {
  children: React.ReactNode;
  className?: string;
  isHero?: boolean;
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroPageName?: string;
  heroSectionTitle?: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ children, className = '', isHero = false, heroImageSrc, heroImageAlt, heroPageName, heroSectionTitle }) => {
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
    return (
      <section 
        ref={ref}
        className={`relative w-full ${verticalSpacing} scroll-animate ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className={`${contentWrapperClass} ${internalPadding}`}>
             <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
                {/* Text column */}
                <div className="md:col-span-3 text-center md:text-left flex flex-col justify-center h-full">
                  {children}
                </div>
                {/* Image column */}
                <div className="md:col-span-2 w-full h-full">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-full border-2 border-muted-gold/50 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-muted-gold/30 hover:-translate-y-1">
                    <ManagedImage 
                      src={heroImageSrc} 
                      alt={heroImageAlt || ''}
                      pageName={heroPageName || 'Unknown Page'}
                      sectionTitle={heroSectionTitle || 'Hero Image'}
                      className="w-full h-full object-cover rounded-md" 
                      loading="lazy"
                    />
                  </div>
                </div>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className={`${contentWrapperClass} ${internalPadding} text-center`}>
            {children}
         </div>
      </div>
    </section>
  );
};