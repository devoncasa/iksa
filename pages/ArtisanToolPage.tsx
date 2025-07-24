
import React from 'react';
import { FabricYieldCalculator } from '../components/artisans-tool/FabricYieldCalculator';
import { useLanguage } from '../hooks/useLanguage';
import { SEOMetadata } from '../components/SEOMetadata';
import { LightbulbIcon } from '../components/icons';
import { ContentBlock } from '../components/ContentBlock';

interface ProTipProps {
    titleKey: string;
    contentKey: string;
    index: number;
    imageUrl: string;
}

const ProTip: React.FC<ProTipProps> = ({ titleKey, contentKey, index, imageUrl }) => {
    const { translate } = useLanguage();
    return (
        <div 
            className="bg-white/50 backdrop-blur-xl rounded-lg shadow-md border border-stone-200/50 transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-0.5 overflow-hidden"
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <img src={imageUrl} alt={translate('artisansTool_tips', titleKey)} className="w-full h-auto aspect-[4/3] object-cover" />
            <div className="p-6">
                <h3 className="font-semibold text-brandAccent-700 mb-2 font-serif-display text-lg">{translate('artisansTool_tips', titleKey)}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{translate('artisansTool_tips', contentKey)}</p>
            </div>
        </div>
    );
};

export const ArtisanToolPage: React.FC = () => {
  const { translate } = useLanguage();
  
  const proTipsData = [
      { titleKey: 'tip1_title', contentKey: 'tip1_content', imageUrl: 'https://i.postimg.cc/JhmPKBQW/IKSA-section-background-00130.webp' },
      { titleKey: 'tip2_title', contentKey: 'tip2_content', imageUrl: 'https://i.postimg.cc/YS38PqXL/IKSA-section-background-00131.webp' },
      { titleKey: 'tip3_title', contentKey: 'tip3_content', imageUrl: 'https://i.postimg.cc/tJLz61gw/IKSA-section-background-00132.webp' },
  ];

  return (
    <>
      <SEOMetadata
        titleKey="page_artisansTool_title"
        descriptionKey="page_artisansTool_description"
        keywordsKey="page_artisansTool_keywords"
        pagePath="/artisans-tool"
      />
      <ContentBlock isHero>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-stone-800 mb-8 md:mb-10 text-center section-title-underline"> 
          {translate('artisansTool_pageTitle')}
        </h1>
        <p className="text-center text-stone-700 text-base md:text-lg leading-relaxed">{translate('artisansTool_intro')}</p> 
      </ContentBlock>

      <ContentBlock>
          <FabricYieldCalculator />
      </ContentBlock>

      <ContentBlock>
            <h2 className="text-3xl md:text-4xl font-serif-display font-semibold text-stone-800 mb-10 text-center section-title-underline flex items-center justify-center">
                <LightbulbIcon className="w-8 h-8 mr-4 text-brandAccent-700" />
                {translate('artisansTool_proTipsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {proTipsData.map((tip, index) => (
                    <ProTip key={tip.titleKey} titleKey={tip.titleKey} contentKey={tip.contentKey} index={index} imageUrl={tip.imageUrl} />
                ))}
            </div>
      </ContentBlock>
    </>
  );
};
