import React from 'react';
import {useLanguage} from '../hooks/useLanguage';
import {SEOMetadata} from '../components/SEOMetadata';
import {ContentBlock} from '../components/ContentBlock';
import {CustomerGuidance} from '../components/CustomerGuidance';
import {customerGuidance} from '../locales/customerGuidance';
import {generateOrganizationSchema,generateWebsiteSchema} from '../components/Schema';
export const ForArtisansPage=()=>{
 const {translate,language}=useLanguage();const copy=customerGuidance[language];
 return <><SEOMetadata titleKey="page_forArtisans_title" descriptionKey="page_forArtisans_description" titleText={`${copy.artisanTitle} | hithobe`} descriptionText={copy.artisanIntro} pagePath="/for-artisans" schemas={[generateOrganizationSchema(translate),generateWebsiteSchema()]}/>
 <ContentBlock isHero heroImageSrc="/images/hithobe/editorial/sample-measuring-1280.webp" heroImageAlt={copy.artisanTitle} heroPageName="For Artisans" heroSectionTitle="Planning"><h1 className="font-serif-display text-4xl sm:text-5xl font-bold mb-5 text-warm-terracotta">{copy.artisanTitle}</h1><p className="text-lg leading-relaxed">{copy.artisanIntro}</p></ContentBlock>
 <CustomerGuidance indices={[1,4,5]} steps/><CustomerGuidance indices={[2,3]} showSources/>
 </>;
};
