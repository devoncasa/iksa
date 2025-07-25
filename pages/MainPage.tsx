
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';
import { ChevronRightIcon } from '../components/icons'; 
import { StyledText } from '../components/StyledText';
import { ContentBlock } from '../components/ContentBlock';
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/Schema';
import { ManagedImage } from '../components/ManagedImage';


const HeroSection: React.FC = () => {
    const { translate } = useLanguage();
    return (
        <ContentBlock 
            isHero
            heroImageSrc="https://i.postimg.cc/nrY3WbnL/iksa-about-us-summary.webp"
            heroImageAlt={translate('main_hero_alt')}
            heroPageName="Main Page"
            heroSectionTitle="Main Hero"
        >
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold mb-6 md:mb-8 leading-tight text-warm-terracotta animate-fadeInUp">
              {translate('main_heroTitle')}
            </h1>
            <StyledText 
              text={translate('main_heroSubtitle')} 
              className="text-lg text-stone-700 mb-10 md:mb-12 leading-relaxed animate-fadeInUp" 
              style={{ animationDelay: '0.2s' }}
            />
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 sm:gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}> 
                <Link to="/collections">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">{translate('main_cta_explore_collections')}</Button>
                </Link>
                <Link to="/contact">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">{translate('contactUs')}</Button>
                </Link>
            </div>
        </ContentBlock>
    );
};

const MarketInsightsSection: React.FC = () => {
    const { translate } = useLanguage();
    const insights = [
        { titleKey: 'main_marketInsights_card1_title', textKey: 'main_marketInsights_card1_text' },
        { titleKey: 'main_marketInsights_card2_title', textKey: 'main_marketInsights_card2_text' },
        { titleKey: 'main_marketInsights_card3_title', textKey: 'main_marketInsights_card3_text' },
    ];
    return (
        <ContentBlock>
            <h2 className={`text-3xl md:text-4xl font-serif-display font-semibold text-center mb-12 text-stone-800 section-title-underline`}>
                {translate('main_marketInsights_title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {insights.map((insight, index) => (
                    <div key={index} className={`bg-brandAccent-50/80 rounded-lg shadow-md p-6 text-center border border-brandAccent-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                        <h3 className="text-2xl font-bold text-brandAccent-800 mb-3">{translate(insight.titleKey)}</h3>
                        <p className="text-stone-600 text-sm">{translate(insight.textKey)}</p>
                    </div>
                ))}
            </div>
        </ContentBlock>
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
}

const InfoSection: React.FC<InfoSectionProps> = ({ titleKey, contentKey, ctaKey, linkTo, imageSrc, imageAltKey, reverseLayout = false, titleColor = 'text-stone-800' }) => {
  const { translate } = useLanguage();

  const textContent = (
    <div className={`md:w-1/2 flex flex-col justify-center text-center md:text-left`}>
      <h2 className={`text-3xl lg:text-4xl font-serif-display font-semibold ${titleColor} mb-5 md:mb-6 section-title-underline`}>{translate(titleKey)}</h2>
      <p className={`text-stone-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8`}>{translate(contentKey)}</p>
      <div className={`self-center md:self-start`}>
        <Link to={linkTo}>
          <Button variant="primary" size="md" className="group">
            {translate(ctaKey)}
            <ChevronRightIcon className="w-5 h-5 ml-2.5 inline-block group-hover:translate-x-1 transition-transform duration-300 ease-in-out" /> 
          </Button>
        </Link>
      </div>
    </div>
  );

  const imageContent = imageSrc ? (
    <div className={`md:w-1/2 mt-8 md:mt-0`}>
        <div className="relative group overflow-hidden rounded-lg border-2 border-muted-gold/50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-muted-gold/30 hover:-translate-y-1">
            <ManagedImage
                src={imageSrc}
                alt={imageAltKey ? translate(imageAltKey) : translate(titleKey)}
                pageName="Main Page"
                sectionTitle={`Info: ${translate(titleKey)}`}
                className="rounded-md object-cover w-full aspect-[4/3] transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
        </div>
    </div>
  ) : null;

  return (
    <ContentBlock className="text-center">
        <div className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${reverseLayout ? 'md:flex-row-reverse' : ''}`}>
            {textContent}
            {imageContent}
        </div>
    </ContentBlock>
  );
};

const FinalCTASection: React.FC = () => {
    const { translate } = useLanguage();
    return (
      <ContentBlock className="!bg-brandAccent-800/80 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display font-semibold mb-6 md:mb-8 section-title-underline">{translate('main_final_cta_title')}</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">{translate('main_final_cta_content')}</p>
            <Link to="/contact">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brandAccent-800 focus:ring-offset-brandAccent-800"> 
                {translate('contactUs')}
            </Button>
            </Link>
      </ContentBlock>
    );
};


export const MainPage: React.FC = () => {
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
        titleKey="page_main_title"
        descriptionKey="page_main_description"
        pagePath="/"
        schemas={schemas}
      />
      <HeroSection />
      
      <InfoSection
          titleKey="main_section_about_title"
          contentKey="main_section_about_content"
          ctaKey="main_cta_learn_more" 
          linkTo="/about-us" 
          imageSrc="https://i.postimg.cc/nrY3WbnL/iksa-about-us-summary.webp" 
          imageAltKey="main_alt_about_us_summary"
          reverseLayout={false}
          titleColor="text-stone-800"
        />

      <MarketInsightsSection />
      
      <InfoSection
          titleKey="main_section_collections_title"
          contentKey="main_section_collections_content"
          ctaKey="main_cta_explore_collections"
          linkTo="/collections"
          imageSrc="https://i.postimg.cc/BvW4fV2v/fabric-roll-collection-showcase-1.webp" 
          imageAltKey="main_alt_collections_summary"
          reverseLayout={true} 
          titleColor="text-brandAccent-800"
        />

      <InfoSection
          titleKey="main_section_thobeGuide_title"
          contentKey="main_section_thobeGuide_content"
          ctaKey="main_cta_read_guide"
          linkTo="/thobe-guide"
          imageSrc="https://i.postimg.cc/q7x2D1rD/article-regional-styles.webp" 
          imageAltKey="main_alt_thobeGuide_summary"
          titleColor="text-stone-800"
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
        />

      <FinalCTASection />
    </>
  );
};
