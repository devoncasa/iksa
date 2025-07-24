
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SectionWithBackgroundProps {
  backgroundImage: string;
  children: React.ReactNode;
  isHero?: boolean;
  parallaxFactor?: number;
}

export const SectionWithBackground: React.FC<SectionWithBackgroundProps> = ({
  backgroundImage,
  children,
  isHero = false,
  parallaxFactor = 0.2,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (backgroundImage) {
      setLoading(true);
      setError(false);
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => setLoading(false);
      img.onerror = () => {
        setError(true);
        setLoading(false);
        console.error(`Failed to load background image: ${backgroundImage}`);
      };
    }
  }, [backgroundImage]);

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight && sectionTop > -sectionRef.current.offsetHeight) {
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionRef.current.offsetHeight);
        const newOffsetY = scrollProgress * sectionRef.current.offsetHeight * parallaxFactor;
        setOffsetY(newOffsetY);
      }
    }
  }, [parallaxFactor]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden flex items-center justify-center text-center transition-opacity duration-500 ease-in-out ${isHero ? 'min-h-[70vh] md:min-h-[80vh]' : 'py-16 md:py-24'} ${loading ? 'opacity-0' : 'opacity-100'}`}
      style={{
        backgroundColor: '#FDF8F1', // Fallback color
      }}
    >
      {!error && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            filter: 'blur(15px)',
            transform: `scale(1.1) translateY(${offsetY}px)`,
            opacity: loading ? 0 : 1,
          }}
        ></div>
      )}

      <div className="absolute inset-0 bg-white opacity-15"></div>

      <div className="relative z-10 p-6 md:p-10 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl">
        {children}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-100/50 z-20">
          <div className="w-8 h-8 border-4 border-brandAccent-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100/75 z-20">
          <p className="text-red-700 text-lg">Error loading background image.</p>
        </div>
      )}
    </section>
  );
};
