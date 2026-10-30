export const LOCALES = ['th','en','ar','fr','bn','ha','sw','so','ur'] as const;
export type Locale = typeof LOCALES[number];
export function localeFromPath(path:string):Locale {
 const match=path.match(/^\/(en|ar|th|fr|bn|ha|sw|so|ur)(?=\/|$)/);
 return match ? match[1] as Locale : 'en';
}
export function localePrefix(locale:string){return locale==='en'?'':`/${locale}`;}
export function localizedPath(path:string,locale:string){return localePrefix(locale)+(path.replace(/^\/(en|ar|th|fr|bn|ha|sw|so|ur)(?=\/|$)/,'')||'/');}
/** Explicit language URLs win; only a bare homepage reuses a remembered choice. */
export function rememberedHomePath(path:string,saved:string|null):string {
 return path==='/'&&saved&&LOCALES.includes(saved as Locale)?localizedPath('/',saved):path;
}
