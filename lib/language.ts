export function localeFromPath(path: string): 'en' | 'ar' | 'th' {
  const match = path.match(/^\/(ar|th)(?=\/|$)/);
  return match ? match[1] as 'ar'|'th' : 'en';
}
export function localePrefix(locale: string) { return locale === 'en' ? '' : `/${locale}`; }
export function localizedPath(path: string, locale: string) {
  return localePrefix(locale) + (path.replace(/^\/(ar|th)(?=\/|$)/, '') || '/');
}
