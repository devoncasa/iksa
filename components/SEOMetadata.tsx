

import React, { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Fabric } from '../types';

const ORG_URL = "https://www.iksa-textiles.com";

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
  const { translate } = useLanguage();

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
    const canonicalUrl = `${ORG_URL}/#${pagePath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    // Schema
    // Remove existing schemas to prevent duplicates on navigation
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
        // Cleanup on unmount, good practice for SPAs
        document.querySelectorAll('script[id^="schema-ld-"]').forEach(e => e.remove());
    };

  }, [translate, titleKey, descriptionKey, pagePath, item, schemas]);

  return null; 
};