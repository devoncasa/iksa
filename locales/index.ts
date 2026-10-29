
import { LanguageCode, Translations } from '../types';
import { en } from './en';
import { ar } from './ar';
import { th } from './th';

export const translations: Record<LanguageCode, Translations> = {
  [LanguageCode.EN]: en,
  [LanguageCode.AR]: ar,
  [LanguageCode.TH]: th,
};