import { localeFromPath, localizedPath } from '../lib/language';
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
    return localeFromPath(window.location.pathname) as LanguageCode;
  });

  useEffect(() => {
    // Set document attributes for language and direction
    document.documentElement.lang = language;
    document.documentElement.dir = [LanguageCode.AR,LanguageCode.UR].includes(language) ? 'rtl' : 'ltr';
    document.body.dir = [LanguageCode.AR,LanguageCode.UR].includes(language) ? 'rtl' : 'ltr'; // Also set on body
    // Save language preference
    try { localStorage.setItem('hithobe-language', language); } catch { /* Storage may be disabled. */ }
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
    if (newLanguage === language) return;
    try {localStorage.setItem('hithobe-language',newLanguage);} catch {}
    window.location.assign(localizedPath(window.location.pathname, newLanguage) + window.location.search + window.location.hash);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};