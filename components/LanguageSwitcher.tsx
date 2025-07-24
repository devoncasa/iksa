
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LANGUAGES } from '../constants';
import { LanguageCode } from '../types';
import { ChevronDownIcon } from './icons';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as LanguageCode);
  };

  return (
    <div className="relative">
      <select
        value={language}
        onChange={handleChange}
        className="appearance-none bg-transparent border border-stone-600 hover:border-stone-400 text-stone-200 text-sm rounded-md py-1.5 ps-3 pe-8 focus:outline-none focus:ring-1 focus:ring-brandAccent-500 focus:border-brandAccent-500 focus:ring-offset-stone-800 transition-colors ease-in-out"
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-stone-800 text-white">
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-brandAccent-500"> {/* Chevron: Deep Sandstone */}
        <ChevronDownIcon className="w-4 h-4" />
      </div>
    </div>
  );
};
