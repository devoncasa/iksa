

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';
import { ContentBlock } from '../components/ContentBlock';
import { SECTION_BACKGROUND_IMAGES } from '../constants';
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/Schema';


const HeroSection: React.FC = () => {
  const { translate } = useLanguage();
  return (
    <ContentBlock 
        isHero
        heroImageSrc="https://i.postimg.cc/sgJ0kcx2/IKSA-section-background-00149.webp"
        heroImageAlt={translate('about_hero_alt')}
    >
        <h1 className="font-serif-display text-4xl sm:text-5xl font-bold mb-6 md:mb-8 leading-tight text-brandAccent-700 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}> 
          {translate('about_heroTitle')}
        </h1>
        <p className="text-lg text-stone-800 mb-10 md:mb-12 whitespace-pre-line leading-relaxed opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}> 
          {translate('about_heroSubtitle')}
        </p>
    </ContentBlock>
  );
};

const FourPillarsSection: React.FC = () => {
  const { translate } = useLanguage();
  const pillars = ['pillar1', 'pillar2', 'pillar3', 'pillar4'];
  const pillarImages = SECTION_BACKGROUND_IMAGES.slice(8, 12); // Using a slice for placeholder images

  return (
    <ContentBlock>
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif-display font-semibold text-brandAccent-700 mb-12 md:mb-16 section-title-underline`}>
            {translate('about_pillars_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {pillars.map((pillar, index) => (
            <div 
            key={pillar}
            className={`p-6 bg-stone-50/80 rounded-lg shadow-lg hover:shadow-brandAccent-700/20 transition-all duration-300 ease-in-out border border-stone-200 hover:-translate-y-1 h-full flex flex-col`}
            >
                <div className="flex-grow">
                    <h3 className="text-2xl font-serif-display font-bold text-brandAccent-800 mb-3">{translate('about_pillars', `${pillar}_name`)}</h3>
                    <p className="text-md font-semibold text-stone-600 mb-4">{translate('about_pillars', `${pillar}_tagline`)}</p>
                    <p className="text-sm text-stone-700 leading-relaxed">{translate('about_pillars', `${pillar}_desc`)}</p>
                </div>
                <div className="mt-6 relative">
                    <img 
                        src={pillarImages[index]} 
                        alt={translate('about_pillar_alt')}
                        className="w-full h-auto aspect-[4/3] object-cover rounded-md shadow-inner"
                    />
                </div>
            </div>
        ))}
        </div>
    </ContentBlock>
  );
};

const CtaSection: React.FC = () => {
  const { translate } = useLanguage();
  return (
    <ContentBlock>
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif-display font-semibold text-brandAccent-700 mb-6 md:mb-8`}>
            {translate('about_cta_title')}
        </h2>
        <p className={`text-lg md:text-xl text-stone-700 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed`}>
            {translate('about_cta_content')}
        </p>
        <div>
            <Link to="/collections">
            <Button variant="primary" size="lg" className="focus:ring-offset-stone-100">
                {translate('discoverCollections')}
            </Button>
            </Link>
        </div>
    </ContentBlock>
  );
};

export const AboutUsPage: React.FC = () => { 
  const { translate } = useLanguage();
  const schemas = useMemo(() => {
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema()
    ];
  }, [translate]);
  
  return (
    <>
      <SEOMetadata
        titleKey="page_about_title" 
        descriptionKey="page_about_description"
        pagePath="/about-us"
        schemas={schemas}
      />
      <HeroSection />
      <FourPillarsSection />
      <CtaSection />
    </>
  );
};