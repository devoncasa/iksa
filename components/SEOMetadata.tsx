


import React, { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Fabric } from '../types';
import { LANGUAGES } from '../constants';

const ORG_URL = "https://www.hithobe.com";

interface SEOMetadataProps {
  titleKey: string;
  descriptionKey: string;
  pagePath: string;
  item?: Fabric;
  schemas?: any[];
}

export const SEOMetadata: React.FC<SEOMetadataProps> = ({
  titleKey,
  descriptionKey,
  pagePath,
  item,
  schemas = [],
}) => {
  const { translate, language } = useLanguage();

  useEffect(() => {
    // Title
    let finalTitle = translate(titleKey);
    if (item) {
      finalTitle = finalTitle
        .replace('{fabricName}', translate(item.nameKey))
        .replace('{rollLength}', String(item.rollLengthInMeters));
    }
    document.title = finalTitle;

    // Description
    let finalDescription = translate(descriptionKey);
    if (item) {
        finalDescription = finalDescription
        .replace('{fabricName}', translate(item.nameKey))
        .replace('{rollLength}', String(item.rollLengthInMeters))
        .replace('{fabricFeel}', translate(`filterFeel${item.feel[0].charAt(0).toUpperCase() + item.feel[0].slice(1)}`))
        .replace('{fabricPerformance}', translate(`filterPerformance${item.performance[0].charAt(0).toUpperCase() + item.performance[0].slice(1)}`));
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', finalDescription);

    // Canonical URL
    const canonicalUrl = `${ORG_URL}${language === 'ar' ? '/ar' : ''}${pagePath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    // Hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e => e.remove());
    LANGUAGES.forEach(lang => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang.code;
        link.href = `${ORG_URL}${lang.code === 'ar' ? '/ar' : ''}${pagePath}`;
        document.head.appendChild(link);
    });
    
    const socialImage = `${ORG_URL}/images/hithobe/kandura-courtyard-1120.webp`;
    for (const [name, content] of Object.entries({ 'og:title': finalTitle, 'og:description': finalDescription, 'og:url': canonicalUrl, 'og:type': item ? 'product' : 'website', 'og:image': socialImage, 'og:site_name': 'hithobe', 'twitter:card': 'summary_large_image', 'twitter:title': finalTitle, 'twitter:description': finalDescription, 'twitter:image': socialImage })) {
      const attr = name.startsWith('og:') ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attr, name); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    }
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name', 'robots'); document.head.appendChild(robots); }
    robots.setAttribute('content', pagePath === '/checkout' || pagePath === '/admin' ? 'noindex,follow' : 'index,follow,max-image-preview:large');

    // Schema
    document.querySelectorAll('script[type="application/ld+json"]').forEach(e => e.remove());
    schemas.forEach((schema, index) => {
        if (schema) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = `schema-ld-${index}`;
            try {
                script.innerHTML = JSON.stringify(schema, null, 2);
                document.head.appendChild(script);
            } catch (e) {
                console.error("Failed to stringify schema", e);
            }
        }
    });

    return () => {
        document.querySelectorAll('script[id^="schema-ld-"]').forEach(e => e.remove());
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(e => e.remove());
    };

  }, [translate, language, titleKey, descriptionKey, pagePath, item, schemas]);

  if (typeof document === 'undefined') {
    const title = translate(titleKey).replace('{fabricName}', item ? translate(item.nameKey) : '').replace('{rollLength}', String(item?.rollLengthInMeters ?? ''));
    const description = item ? translate(item.detailDescriptionKey) : translate(descriptionKey);
    const url = `${ORG_URL}${language === 'ar' ? '/ar' : ''}${pagePath}`;
    return <><title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={url} /><link rel="alternate" hrefLang="en" href={`${ORG_URL}${pagePath}`} /><link rel="alternate" hrefLang="ar" href={`${ORG_URL}/ar${pagePath}`} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:url" content={url} /><meta property="og:image" content={`${ORG_URL}/images/hithobe/kandura-courtyard-1120.webp`} />{schemas.map((schema,index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g, '\\u003c')}} />)}</>;
  }
  return null; 
};