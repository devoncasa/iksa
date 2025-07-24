
import React, { useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const companyName = "IKSA";

interface SEOMetadataProps {
  titleKey: string;
  descriptionKey: string; // Kept for potential future-proofing with safer libraries
  keywordsKey: string;    // Kept for potential future-proofing
  pagePath: string;
  item?: any;
}

export const SEOMetadata: React.FC<SEOMetadataProps> = ({
  titleKey,
  item,
}) => {
  const { translate } = useLanguage();

  useEffect(() => {
    let finalTitle = translate(titleKey);

    if (item) {
      finalTitle = finalTitle
        .replace('{fabricName}', translate(item.nameKey))
        .replace('{rollLength}', item.rollLengthInMeters);
    }
    
    const translatedTitle = finalTitle || companyName;
    
    document.title = translatedTitle;

  }, [translate, titleKey, item]);

  return null; 
};
