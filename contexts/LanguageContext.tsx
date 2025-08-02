import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { LanguageCode, LanguageContextType, Translations } from '../types';
import { translations } from '../locales';
import { DEFAULT_LANGUAGE } from '../constants';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Check for saved language in localStorage
    const savedLanguage = localStorage.getItem('iksa-language') as LanguageCode;
    return savedLanguage && Object.values(LanguageCode).includes(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    // Set document attributes for language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === LanguageCode.AR ? 'rtl' : 'ltr';
    document.body.dir = language === LanguageCode.AR ? 'rtl' : 'ltr'; // Also set on body
    // Save language preference
    localStorage.setItem('iksa-language', language);
  }, [language]);

  const translate = useCallback((key: string, subKey?: string): string => {
    const langTranslations = translations[language] as Translations;
    
    let text = langTranslations[key];

    if (typeof text === 'object' && text !== null && subKey) {
      text = text[subKey];
    }
    
    if (typeof text === 'string') {
      return text;
    }
    
    // Fallback to English if translation is missing
    if (language !== LanguageCode.EN) {
        const fallbackTranslations = translations[LanguageCode.EN] as Translations;
        let fallbackText = fallbackTranslations[key];
        if (typeof fallbackText === 'object' && fallbackText !== null && subKey) {
            fallbackText = fallbackText[subKey];
        }
        if (typeof fallbackText === 'string') {
            return fallbackText;
        }
    }

    console.warn(`Translation key "${key}${subKey ? '.' + subKey : ''}" not found in language "${language}" or fallback.`);
    return subKey ? `${key}.${subKey}` : key;
  }, [language]);

  const setLanguage = (newLanguage: LanguageCode) => {
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};