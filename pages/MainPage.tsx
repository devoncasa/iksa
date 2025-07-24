

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';
import { ChevronRightIcon } from '../components/icons'; 
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { StyledText } from '../components/StyledText';

const HeroSection: React.FC = () => {
    const { translate } = useLanguage();
    return (
        <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center text-center p-4">
            <div className="relative z-10 max-w-4xl w-full p-8 md:p-12 bg-gradient-to-br from-stone-100/90 to-brandAccent-100/90 backdrop-blur-sm rounded-xl shadow-2xl">
                <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight text-brandAccent-800 animate-fadeInUp">
                  {translate('main_heroTitle')}
                </h1>
                <StyledText 
                  text={translate('main_heroSubtitle')} 
                  className="text-lg sm:text-xl text-stone-700 mb-10 md:mb-12 leading-relaxed animate-fadeInUp" 
                  style={{ animationDelay: '0.2s' }}
                />
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}> 
                    <ReactRouterDOM.Link to="/collections">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto">{translate('main_cta_explore_collections')}</Button>
                    </ReactRouterDOM.Link>
                    <ReactRouterDOM.Link to="/acquire">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">{translate('contactUs')}</Button>
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </section>
    );
};

const MarketInsightsSection: React.FC = () => {
    const { translate } = useLanguage();
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(0.2);
    const insights = [
        { titleKey: 'main_marketInsights_card1_title', textKey: 'main_marketInsights_card1_text' },
        { titleKey: 'main_marketInsights_card2_title', textKey: 'main_marketInsights_card2_text' },
        { titleKey: 'main_marketInsights_card3_title', textKey: 'main_marketInsights_card3_text' },
    ];
    return (
        <section ref={ref} className="my-16 md:my-24">
            <div className={`container mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl ${isVisible ? 'section-visible' : ''}`}>
                    <h2 className={`text-3xl md:text-4xl font-serif-display font-semibold text-center mb-12 text-stone-800 section-title-underline scroll-animate ${isVisible ? 'is-visible' : ''}`}>
                        {translate('main_marketInsights_title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {insights.map((insight, index) => (
                            <div key={index} className={`bg-brandAccent-50/80 rounded-lg shadow-md p-6 text-center border border-brandAccent-200 scroll-animate transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                                <h3 className="text-2xl font-bold text-brandAccent-800 mb-3">{translate(insight.titleKey)}</h3>
                                <p className="text-stone-600 text-sm">{translate(insight.textKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

interface InfoSectionProps {
  titleKey: string;
  contentKey: string;
  ctaKey: string;
  linkTo: string;
  imageSrc?: string;
  imageAltKey?: string;
  reverseLayout?: boolean;
  titleColor?: string; 
  isPrimaryBg?: boolean;
}

const InfoSection: React.FC<InfoSectionProps> = ({ titleKey, contentKey, ctaKey, linkTo, imageSrc, imageAltKey, reverseLayout = false, titleColor = 'text-stone-800', isPrimaryBg = true }) => {
  const { translate } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(0.2);
  const bgColor = isPrimaryBg ? 'bg-stone-50/90' : 'bg-stone-100/90';

  const textContent = (
    <div className={`md:w-1/2 flex flex-col justify-center`}>
      <h2 className={`text-3xl lg:text-4xl font-serif-display font-semibold ${titleColor} mb-5 md:mb-6 section-title-underline scroll-animate ${isVisible ? 'is-visible' : ''}`}>{translate(titleKey)}</h2>
      <p className={`text-stone-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8 scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '150ms' }}>{translate(contentKey)}</p>
      <div className={`self-start scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
        <ReactRouterDOM.Link to={linkTo}>
          <Button variant="primary" size="md" className="group">
            {translate(ctaKey)}
            <ChevronRightIcon className="w-5 h-5 ml-2.5 inline-block group-hover:translate-x-1 transition-transform duration-300 ease-in-out" /> 
          </Button>
        </ReactRouterDOM.Link>
      </div>
    </div>
  );

  const imageContent = imageSrc ? (
    <div className={`md:w-1/2 mt-8 md:mt-0 group overflow-hidden rounded-lg scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '100ms' }}> 
      <img 
        src={imageSrc} 
        alt={imageAltKey ? translate(imageAltKey) : translate(titleKey)} 
        className="rounded-lg shadow-lg object-cover w-full h-auto max-h-[450px] md:max-h-[500px] transition-transform duration-500 ease-in-out group-hover:scale-105" 
      />
    </div>
  ) : null;

  return (
    <section ref={ref} className="my-8 md:my-12"> 
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isVisible ? 'section-visible' : ''}`}> 
        <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${bgColor} backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-xl ${reverseLayout ? 'md:flex-row-reverse' : ''}`}>
            {textContent}
            {imageContent}
        </div>
      </div>
    </section>
  );
};

const FinalCTASection: React.FC = () => {
    const { translate } = useLanguage();
    return (
        <section className="my-16 md:my-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-brandAccent-800/80 backdrop-blur-sm text-white text-center p-8 md:p-16 rounded-xl shadow-2xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display font-semibold mb-6 md:mb-8 section-title-underline">{translate('main_final_cta_title')}</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">{translate('main_final_cta_content')}</p>
                    <ReactRouterDOM.Link to="/acquire">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brandAccent-800 focus:ring-offset-brandAccent-800"> 
                        {translate('contactUs')}
                    </Button>
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </section>
    );
};


export const MainPage: React.FC = () => {
  return (
    <>
      <SEOMetadata
        titleKey="page_main_title"
        descriptionKey="page_main_description"
        keywordsKey="page_main_keywords"
        pagePath="/"
      />
      <HeroSection />
      <MarketInsightsSection />
      
        <InfoSection
            titleKey="main_section_about_title"
            contentKey="main_section_about_content"
            ctaKey="main_cta_learn_more" 
            linkTo="/about-us" 
            imageSrc="https://i.postimg.cc/y8gS2k42/about-us-summary.webp" 
            imageAltKey="main_alt_about_us_summary"
            reverseLayout={false}
            titleColor="text-stone-800"
            isPrimaryBg={true}
          />
        
        <InfoSection
            titleKey="main_section_collections_title"
            contentKey="main_section_collections_content"
            ctaKey="main_cta_explore_collections"
            linkTo="/collections"
            imageSrc="https://i.postimg.cc/BvW4fV2v/fabric-roll-collection-showcase-1.webp" 
            imageAltKey="main_alt_collections_summary"
            reverseLayout={true} 
            titleColor="text-brandAccent-800"
            isPrimaryBg={false}
          />

        <InfoSection
            titleKey="main_section_thobeGuide_title"
            contentKey="main_section_thobeGuide_content"
            ctaKey="main_cta_read_guide"
            linkTo="/thobe-guide"
            imageSrc="https://i.postimg.cc/q7x2D1rD/article-regional-styles.webp" 
            imageAltKey="main_alt_thobeGuide_summary"
            titleColor="text-stone-800"
            isPrimaryBg={true}
          />

        <InfoSection
            titleKey="main_section_forArtisans_title"
            contentKey="main_section_forArtisans_content"
            ctaKey="main_cta_explore_partnership"
            linkTo="/for-artisans"
            imageSrc="https://i.postimg.cc/50v2f5fK/artisans-tool-summary.webp" 
            imageAltKey="main_alt_for_artisans_summary"
            reverseLayout={true}
            titleColor="text-brandAccent-800"
            isPrimaryBg={false}
          />

      <FinalCTASection />
    </>
  );
};