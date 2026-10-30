

import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LANGUAGES } from '../constants';
import { LanguageCode } from '../types';
import { ChevronDownIcon } from './icons';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, translate } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as LanguageCode);
  };

  return (
    <div className="relative">
      <select
        value={language}
        onChange={handleChange}
        className="site-language-select"
        aria-label={translate('selectLanguage')}
      >
        {LANGUAGES.map((lang) => (
          <option lang={lang.code} dir={['ar','ur'].includes(lang.code)?'rtl':'ltr'} key={lang.code} value={lang.code} className="bg-stone-800 text-white">
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-deep-chocolate">
        <ChevronDownIcon className="w-4 h-4" />
      </div>
    </div>
  );
};