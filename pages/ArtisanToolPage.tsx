
import React from 'react';
import { FabricYieldCalculator } from '../components/artisans-tool/FabricYieldCalculator';
import { useLanguage } from '../hooks/useLanguage';
import { SEOMetadata } from '../components/SEOMetadata';
import { LightbulbIcon } from '../components/icons';

const ProTip: React.FC<{ titleKey: string, contentKey: string, index: number }> = ({ titleKey, contentKey, index }) => {
    const { translate } = useLanguage();
    return (
        <div 
            className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-md border border-stone-200/50 transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <h3 className="font-semibold text-brandAccent-700 mb-2 font-serif-display text-lg">{translate('artisansTool_tips', titleKey)}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{translate('artisansTool_tips', contentKey)}</p>
        </div>
    );
};

export const ArtisanToolPage: React.FC = () => {
  const { translate } = useLanguage();
  
  const proTips = [
      { titleKey: 'tip1_title', contentKey: 'tip1_content' },
      { titleKey: 'tip2_title', contentKey: 'tip2_content' },
      { titleKey: 'tip3_title', contentKey: 'tip3_content' },
  ];

  return (
    <>
      <SEOMetadata
        titleKey="page_artisansTool_title"
        descriptionKey="page_artisansTool_description"
        keywordsKey="page_artisansTool_keywords"
        pagePath="/artisans-tool"
      />
      <div className="py-8 md:py-12 max-w-4xl mx-auto transition-all duration-1000 ease-in-out px-4"> 
        <div className="bg-stone-50/90 backdrop-blur-sm p-8 rounded-lg mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-stone-800 mb-8 md:mb-10 text-center section-title-underline transition-all duration-700 ease-in-out delay-100"> 
              {translate('artisansTool_pageTitle')}
            </h1>
            <p className="text-center text-stone-700 text-base md:text-lg leading-relaxed transition-all duration-700 ease-in-out delay-200">{translate('artisansTool_intro')}</p> 
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-stone-200/50 transition-all duration-700 ease-in-out delay-300">
          <FabricYieldCalculator />
        </div>

        <section className="mt-16 md:mt-20">
            <h2 className="text-3xl md:text-4xl font-serif-display font-semibold text-stone-800 mb-10 text-center section-title-underline flex items-center justify-center">
                <LightbulbIcon className="w-8 h-8 mr-4 text-brandAccent-700" />
                {translate('artisansTool_proTipsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {proTips.map((tip, index) => (
                    <ProTip key={tip.titleKey} titleKey={tip.titleKey} contentKey={tip.contentKey} index={index} />
                ))}
            </div>
        </section>
      </div>
    </>
  );
};
