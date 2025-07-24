import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { LanguageCode, LanguageContextType, Translations } from '../types';
import { translations } from '../locales';
import { DEFAULT_LANGUAGE } from '../constants';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // Set document attributes for English
    document.documentElement.lang = LanguageCode.EN;
    document.documentElement.dir = 'ltr';
  }, []);

  const translate = useCallback((key: string, subKey?: string): string => {
    const langTranslations = translations[LanguageCode.EN] as Translations;
    
    let text = langTranslations[key];

    if (typeof text === 'object' && text !== null && subKey) {
      text = text[subKey];
    }
    
    if (typeof text === 'string') {
      return text;
    }

    console.warn(`Translation key "${key}${subKey ? '.' + subKey : ''}" not found.`);
    return subKey ? `${key}.${subKey}` : key;
  }, []);

  const setLanguage = (newLanguage: LanguageCode) => {
    // No-op for now as we are hardcoded to English.
    // This maintains the context shape for future localization.
    console.log("Language switching is currently disabled.");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};