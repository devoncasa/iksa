import {interfaceCopy} from '../locales/interface';
import {CustomerGuidance} from '../components/CustomerGuidance';
import {customerGuidance} from '../locales/customerGuidance';
import { DiscoveryNav } from '../components/DiscoveryNav';
import '../discovery.css';
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
import { DevelopmentBanner } from '../components/DevelopmentBanner';


const HeroSection: React.FC = () => {
    const { translate,language } = useLanguage();
    return (
        <ContentBlock
            isHero
            heroImageSrc="/images/hithobe/kandura-window-portrait-1120.webp"
            heroImageAlt={interfaceCopy[language].window}
            heroPageName="Main Page"
            heroSectionTitle="Main Hero"
            heroImagePriority={true}
        >
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold mb-6 md:mb-8 leading-tight text-warm-terracotta animate-fadeInUp">
              {customerGuidance[language].title}
            </h1>
            <StyledText
              text={customerGuidance[language].aboutIntro}
              className="text-lg text-stone-700 mb-10 md:mb-12 leading-relaxed animate-fadeInUp"
              style={{ animationDelay: '0.2s' }}
            />
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 sm:gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <Link to="/collections">
                    <Button as="span" variant="primary" size="lg" className="w-full sm:w-auto">{translate('main_cta_explore_collections')}</Button>
                </Link>
                <Link to="/contact">
                    <Button as="span" variant="outline" size="lg" className="w-full sm:w-auto">{translate('contactUs')}</Button>
                </Link>
            </div>
        </ContentBlock>
    );
};

const MarketInsightsSection=()=> <CustomerGuidance indices={[0,1,2]} cards/>;

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
  const { translate,language } = useLanguage();

  const textContent = (
    <div className={`md:w-1/2 flex flex-col justify-center text-center md:text-start`}>
      <h2 className={`text-3xl lg:text-4xl font-serif-display font-semibold ${titleColor} mb-5 md:mb-6 section-title-underline`}>{contentKey==='main_section_about_content'?customerGuidance[language].aboutTitle:contentKey==='main_section_forArtisans_content'?customerGuidance[language].artisanTitle:translate(titleKey)}</h2>
      <p className={`text-stone-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8`}>{contentKey==='main_section_about_content'?customerGuidance[language].aboutIntro:contentKey==='main_section_forArtisans_content'?customerGuidance[language].artisanIntro:contentKey==='main_section_collections_content'?customerGuidance[language].questions[1][1]:customerGuidance[language].questions[0][1]}</p>
      <div className={`self-center md:self-start`}>
        <Link to={linkTo}>
          <Button as="span" variant="primary" size="md" className="group">
            {translate(ctaKey)}
            <ChevronRightIcon className="w-5 h-5 ms-2.5 rtl-flip inline-block group-hover:translate-x-1 group-hover:dir-rtl:-translate-x-1 transition-transform duration-300 ease-in-out" />
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
    const { translate,language } = useLanguage();
    return (
      <ContentBlock className="!bg-brandAccent-800/80 text-white">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display font-semibold mb-6 md:mb-8 section-title-underline">{translate('main_final_cta_title')}</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">{translate('main_final_cta_content')}</p>
            <Link to="/contact">
            <Button as="span" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brandAccent-800 focus:ring-offset-brandAccent-800">
                {translate('contactUs')}
            </Button>
            </Link>
      </ContentBlock>
    );
};


export const MainPage: React.FC = () => {
  const { translate,language } = useLanguage();
  const schemas = useMemo(() => {
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema()
    ];
  }, [translate]);

  return (
    <>
      <DevelopmentBanner />
      <SEOMetadata
        titleKey="page_main_title"
        descriptionKey="page_main_description"
        titleText={`${customerGuidance[language].title} | hithobe`} descriptionText={customerGuidance[language].aboutIntro}
        pagePath="/"
        schemas={schemas}
      />
      <HeroSection />
        <section className="discovery-launch"><h2>{translate('discovery_heading')}</h2><p>{translate('discovery_intro')}</p><DiscoveryNav /></section>

      <InfoSection
          titleKey="main_section_about_title"
          contentKey="main_section_about_content"
          ctaKey="main_cta_learn_more"
          linkTo="/about-us"
          imageSrc="/images/hithobe/editorial/sample-inspection-1280.webp"
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
          imageSrc="/images/hithobe/editorial/palette-earth-1280.webp"
          imageAltKey="main_alt_collections_summary"
          reverseLayout={true}
          titleColor="text-brandAccent-800"
        />

      <InfoSection
          titleKey="main_section_thobeGuide_title"
          contentKey="main_section_thobeGuide_content"
          ctaKey="main_cta_read_guide"
          linkTo="/thobe-guide"
          imageSrc="/images/hithobe/kandura-courtyard-1120.webp"
          imageAltKey="main_alt_thobeGuide_summary"
          titleColor="text-stone-800"
        />

      <InfoSection
          titleKey="main_section_forArtisans_title"
          contentKey="main_section_forArtisans_content"
          ctaKey="main_cta_explore_partnership"
          linkTo="/for-artisans"
          imageSrc="/images/hithobe/editorial/sample-measuring-1280.webp"
          imageAltKey="main_alt_for_artisans_summary"
          reverseLayout={true}
          titleColor="text-brandAccent-800"
        />

      <FinalCTASection />
    </>
  );
};
