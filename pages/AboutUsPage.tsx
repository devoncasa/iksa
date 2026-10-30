import React from 'react';
import {useLanguage} from '../hooks/useLanguage';
import {SEOMetadata} from '../components/SEOMetadata';
import {ContentBlock} from '../components/ContentBlock';
import {CustomerGuidance} from '../components/CustomerGuidance';
import {customerGuidance} from '../locales/customerGuidance';
import {generateOrganizationSchema,generateWebsiteSchema} from '../components/Schema';
export const AboutUsPage=()=>{
 const {translate,language}=useLanguage();const copy=customerGuidance[language];
 return <><SEOMetadata titleKey="page_about_title" descriptionKey="page_about_description" titleText={copy.aboutTitle} descriptionText={copy.aboutIntro} pagePath="/about-us" schemas={[generateOrganizationSchema(translate),generateWebsiteSchema()]}/>
 <ContentBlock isHero heroImageSrc="/images/hithobe/editorial/sample-shade-1280.webp" heroImageAlt={copy.aboutTitle} heroPageName="About Us" heroSectionTitle="Fabric brief"><h1 className="font-serif-display text-4xl sm:text-5xl font-bold mb-5 text-warm-terracotta">{copy.aboutTitle}</h1><p className="text-lg leading-relaxed">{copy.aboutIntro}</p></ContentBlock>
 <CustomerGuidance indices={[1,2,5]} cards/><CustomerGuidance indices={[0,3]} showSources/>
 </>;
};
