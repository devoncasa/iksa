

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { SEOMetadata } from '../components/SEOMetadata';
import { Button } from '../components/Button';
import { ContentBlock } from '../components/ContentBlock';
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/Schema';

interface PointProps {
  titleKey: string;
  itemsKeys: string[];
  promiseKey: string;
  imageUrl: string;
  altKey: string;
  reverseLayout?: boolean;
}

const CommitmentPoint: React.FC<PointProps> = ({ titleKey, itemsKeys, promiseKey, imageUrl, altKey, reverseLayout = false }) => {
  const { translate } = useLanguage();

  const textContent = (
    <div className="lg:w-1/2">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-brandAccent-700 mb-5 md:mb-6 font-serif-display">{translate(titleKey)}</h3>
      <ul className="space-y-2.5 md:space-y-3 mb-5 md:mb-6 list-disc list-inside text-stone-700 text-sm md:text-base leading-relaxed text-left">
        {itemsKeys.map(itemKey => (
          <li key={itemKey} className="ml-2">{translate(itemKey)}</li>
        ))}
      </ul>
      <p className="text-md md:text-lg font-semibold text-stone-800 italic">{translate(promiseKey)}</p>
    </div>
  );

  const imageContent = (
    <div className="lg:w-1/2 mt-6 lg:mt-0">
      <div className="relative">
        <img
          src={imageUrl}
          alt={translate(altKey)}
          className="w-full h-auto aspect-[4/3] object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );

  return (
    <div
      className={`p-6 md:p-8 bg-white/50 backdrop-blur-xl rounded-lg shadow-lg border border-stone-200/50 transition-all duration-700 ease-in-out hover:shadow-xl hover:-translate-y-1`}
    >
      <div className={`flex flex-col lg:flex-row items-start gap-8 lg:gap-12 ${reverseLayout ? 'lg:flex-row-reverse' : ''}`}>
        {textContent}
        {imageContent}
      </div>
    </div>
  );
};


export const ForArtisansPage: React.FC = () => {
  const { translate } = useLanguage();

  const pointsData: PointProps[] = [
    { titleKey: 'forArtisans_point1_title', itemsKeys: ['forArtisans_point1_item1', 'forArtisans_point1_item2', 'forArtisans_point1_item3'], promiseKey: 'forArtisans_point1_promise', imageUrl: 'https://i.postimg.cc/sDv8ZST6/IKSA-section-background-00120.webp', altKey: 'forArtisans_point1_alt', reverseLayout: false },
    { titleKey: 'forArtisans_point2_title', itemsKeys: ['forArtisans_point2_item1', 'forArtisans_point2_item2', 'forArtisans_point2_item3'], promiseKey: 'forArtisans_point2_promise', imageUrl: 'https://i.postimg.cc/KYysVWxw/IKSA-section-background-00121.webp', altKey: 'forArtisans_point2_alt', reverseLayout: true },
    { titleKey: 'forArtisans_point3_title', itemsKeys: ['forArtisans_point3_item1', 'forArtisans_point3_item2', 'forArtisans_point3_item3'], promiseKey: 'forArtisans_point3_promise', imageUrl: 'https://i.postimg.cc/3NWLm5F4/IKSA-section-background-00122.webp', altKey: 'forArtisans_point3_alt', reverseLayout: false },
    { titleKey: 'forArtisans_point4_title', itemsKeys: ['forArtisans_point4_item1', 'forArtisans_point4_item2', 'forArtisans_point4_item3'], promiseKey: 'forArtisans_point4_promise', imageUrl: 'https://i.postimg.cc/GpJS1jp2/IKSA-section-background-00123.webp', altKey: 'forArtisans_point4_alt', reverseLayout: true },
    { titleKey: 'forArtisans_point5_title', itemsKeys: ['forArtisans_point5_item1', 'forArtisans_point5_item2', 'forArtisans_point5_item3'], promiseKey: 'forArtisans_point5_promise', imageUrl: 'https://i.postimg.cc/vBY2861v/IKSA-section-background-00124.webp', altKey: 'forArtisans_point5_alt', reverseLayout: false },
    { titleKey: 'forArtisans_point6_title', itemsKeys: ['forArtisans_point6_item1', 'forArtisans_point6_item2', 'forArtisans_point6_item3'], promiseKey: 'forArtisans_point6_promise', imageUrl: 'https://i.postimg.cc/MT9PnKVJ/IKSA-section-background-00125.webp', altKey: 'forArtisans_point6_alt', reverseLayout: true },
  ];

  const schemas = useMemo(() => {
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema()
    ];
  }, [translate]);

  return (
    <>
      <SEOMetadata
        titleKey="page_forArtisans_title"
        descriptionKey="page_forArtisans_description"
        pagePath="/for-artisans"
        schemas={schemas}
      />
      <ContentBlock 
        isHero
        heroImageSrc="https://i.postimg.cc/50v2f5fK/artisans-tool-summary.webp"
        heroImageAlt={translate('forArtisans_hero_alt')}
      >
          <h1 className={`text-3xl sm:text-4xl font-bold text-brandAccent-700 mb-6 md:mb-8 font-serif-display leading-tight section-title-underline`}> 
            {translate('forArtisans_mainTitle')}
          </h1>
          <p className={`text-base md:text-lg text-stone-700 leading-relaxed`}> 
            {translate('forArtisans_intro')}
          </p>
      </ContentBlock>

      <ContentBlock>
        <div className="space-y-10 md:space-y-12"> 
        {pointsData.map((point) => (
            <CommitmentPoint
            key={point.titleKey}
            titleKey={point.titleKey}
            itemsKeys={point.itemsKeys}
            promiseKey={point.promiseKey}
            imageUrl={point.imageUrl}
            altKey={point.altKey}
            reverseLayout={point.reverseLayout}
            />
        ))}
        </div>
      </ContentBlock>

      <ContentBlock>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brandAccent-700 mb-5 md:mb-6 font-serif-display section-title-underline">{translate('forArtisans_conclusion_title')}</h2> 
            <p className="text-base md:text-lg text-stone-800 mb-4 md:mb-5 leading-relaxed">{translate('forArtisans_conclusion_text1')}</p> 
            <p className="text-lg md:text-xl font-bold text-brandAccent-800">{translate('forArtisans_conclusion_text2')}</p> 
            <div className="mt-8">
                <Link to="/contact">
                <Button variant="primary" size="lg">{translate('forArtisans_cta_button')}</Button>
                </Link>
            </div>
      </ContentBlock>
    </>
  );
};