

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HeroSection: React.FC = () => {
  const { translate } = useLanguage();
  return (
    <section 
      className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center text-center p-4"
    >
      <div className="relative z-10 max-w-4xl container mx-auto p-8 md:p-12 bg-stone-100/90 backdrop-blur-sm rounded-xl shadow-2xl">
        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight text-brandAccent-700 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}> 
          {translate('about_heroTitle')}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-stone-800 mb-10 md:mb-12 whitespace-pre-line leading-relaxed opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}> 
          {translate('about_heroSubtitle')}
        </p>
      </div>
    </section>
  );
};

const FourPillarsSection: React.FC = () => {
  const { translate } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(0.2);

  const pillars = ['pillar1', 'pillar2', 'pillar3', 'pillar4'];

  return (
    <section ref={ref} className="my-16 md:my-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl text-center ${isVisible ? 'section-visible' : ''}`}>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif-display font-semibold text-brandAccent-700 mb-12 md:mb-16 scroll-animate ${isVisible ? 'is-visible' : ''} section-title-underline`}>
            {translate('about_pillars_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {pillars.map((pillar, index) => (
              <div 
                key={pillar}
                className={`p-6 bg-stone-50/80 rounded-lg shadow-lg hover:shadow-brandAccent-700/20 transition-all duration-300 ease-in-out border border-stone-200 hover:-translate-y-1 scroll-animate ${isVisible ? 'is-visible' : ''} h-full`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <h3 className="text-2xl font-serif-display font-bold text-brandAccent-800 mb-3">{translate('about_pillars', `${pillar}_name`)}</h3>
                <p className="text-md font-semibold text-stone-600 mb-4">{translate('about_pillars', `${pillar}_tagline`)}</p>
                <p className="text-sm text-stone-700 leading-relaxed">{translate('about_pillars', `${pillar}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CtaSection: React.FC = () => {
  const { translate } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(0.3);
  return (
    <section ref={ref} className="my-16 md:my-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100/90 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl text-center">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif-display font-semibold text-brandAccent-700 mb-6 md:mb-8 scroll-animate ${isVisible ? 'is-visible' : ''} `}>
              {translate('about_cta_title')}
            </h2>
            <p className={`text-lg md:text-xl text-stone-700 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
              {translate('about_cta_content')}
            </p>
            <div className={`scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
              <ReactRouterDOM.Link to="/collections">
                <Button variant="primary" size="lg" className="focus:ring-offset-stone-100">
                  {translate('discoverCollections')}
                </Button>
              </ReactRouterDOM.Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export const AboutUsPage: React.FC = () => { 
  return (
    <div>
      <SEOMetadata
        titleKey="page_about_title" 
        descriptionKey="page_about_description"
        keywordsKey="page_about_keywords"
        pagePath="/about-us"
      />
      <div> 
        <HeroSection />
        <FourPillarsSection />
        <CtaSection />
      </div>
    </div>
  );
};