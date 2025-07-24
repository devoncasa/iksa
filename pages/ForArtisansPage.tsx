
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { SEOMetadata } from '../components/SEOMetadata';
import { Button } from '../components/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PointProps {
  titleKey: string;
  itemsKeys: string[];
  promiseKey: string;
}

const CommitmentPoint: React.FC<PointProps> = ({ titleKey, itemsKeys, promiseKey }) => {
  const { translate } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(0.2);

  return (
    <div 
      ref={ref}
      className={`mb-10 md:mb-12 p-6 md:p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-stone-200/50 transition-all duration-700 ease-in-out hover:shadow-xl hover:-translate-y-1 scroll-animate ${isVisible ? 'is-visible' : ''}`}
    >
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brandAccent-700 mb-5 md:mb-6 font-serif-display">{translate(titleKey)}</h3> 
      <ul className="space-y-2.5 md:space-y-3 mb-5 md:mb-6 list-disc list-inside text-stone-700 text-sm md:text-base leading-relaxed"> 
        {itemsKeys.map(itemKey => (
          <li key={itemKey} className="ml-2">{translate(itemKey)}</li> 
        ))}
      </ul>
      <p className="text-md md:text-lg font-semibold text-stone-800 italic">{translate(promiseKey)}</p> 
    </div>
  );
};

export const ForArtisansPage: React.FC = () => {
  const { translate } = useLanguage();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>(0.2);

  const pointsData = [ 
    { titleKey: 'forArtisans_point1_title', itemsKeys: ['forArtisans_point1_item1', 'forArtisans_point1_item2', 'forArtisans_point1_item3'], promiseKey: 'forArtisans_point1_promise' },
    { titleKey: 'forArtisans_point2_title', itemsKeys: ['forArtisans_point2_item1', 'forArtisans_point2_item2', 'forArtisans_point2_item3'], promiseKey: 'forArtisans_point2_promise' },
    { titleKey: 'forArtisans_point3_title', itemsKeys: ['forArtisans_point3_item1', 'forArtisans_point3_item2', 'forArtisans_point3_item3'], promiseKey: 'forArtisans_point3_promise' },
    { titleKey: 'forArtisans_point4_title', itemsKeys: ['forArtisans_point4_item1', 'forArtisans_point4_item2', 'forArtisans_point4_item3'], promiseKey: 'forArtisans_point4_promise' },
    { titleKey: 'forArtisans_point5_title', itemsKeys: ['forArtisans_point5_item1', 'forArtisans_point5_item2', 'forArtisans_point5_item3'], promiseKey: 'forArtisans_point5_promise' },
    { titleKey: 'forArtisans_point6_title', itemsKeys: ['forArtisans_point6_item1', 'forArtisans_point6_item2', 'forArtisans_point6_item3'], promiseKey: 'forArtisans_point6_promise' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SEOMetadata
        titleKey="page_forArtisans_title"
        descriptionKey="page_forArtisans_description"
        keywordsKey="page_forArtisans_keywords"
        pagePath="/for-artisans"
      />
      <div className="py-12 md:py-16 max-w-4xl mx-auto"> 
        <header ref={ref} className={`text-center mb-12 md:mb-16 bg-stone-50/90 backdrop-blur-sm p-8 rounded-lg transition-all duration-700 ease-in-out ${isVisible ? 'is-visible section-visible' : ''}`}>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-brandAccent-700 mb-6 md:mb-8 font-serif-display leading-tight section-title-underline scroll-animate ${isVisible ? 'is-visible' : ''}`}> 
            {translate('forArtisans_mainTitle')}
          </h1>
          <p className={`text-base md:text-lg text-stone-700 leading-relaxed max-w-3xl mx-auto scroll-animate ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}> 
            {translate('forArtisans_intro')}
          </p>
        </header>

        <div className="space-y-10 md:space-y-12"> 
          {pointsData.map((point) => (
            <CommitmentPoint
              key={point.titleKey}
              titleKey={point.titleKey}
              itemsKeys={point.itemsKeys}
              promiseKey={point.promiseKey}
            />
          ))}
        </div>

        <section className="mt-16 md:mt-20 text-center bg-stone-100/90 backdrop-blur-sm p-8 md:p-10 rounded-lg shadow-xl border border-stone-200/50"> 
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brandAccent-700 mb-5 md:mb-6 font-serif-display section-title-underline">{translate('forArtisans_conclusion_title')}</h2> 
          <p className="text-base md:text-lg text-stone-800 mb-4 md:mb-5 leading-relaxed">{translate('forArtisans_conclusion_text1')}</p> 
          <p className="text-lg md:text-xl font-bold text-brandAccent-800">{translate('forArtisans_conclusion_text2')}</p> 
           <div className="mt-8">
             <ReactRouterDOM.Link to="/acquire">
              <Button variant="primary" size="lg">{translate('forArtisans_cta_button')}</Button>
             </ReactRouterDOM.Link>
           </div>
        </section>
      </div>
    </div>
  );
};
