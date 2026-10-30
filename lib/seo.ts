import {localePrefix,LOCALES} from './language.ts';
import {navigationEntry} from './navigation.ts';
import {navigationCopy} from '../locales/navigation.ts';
import {searchCopy,searchPaths} from '../locales/searchCopy.ts';
export const SITE_ORIGIN='https://www.hithobe.com';
const images:Record<string,string>={'/':'plain-weave-ivory','/collections':'palette-warm','/atelier':'thobe-saudi','/gallery':'drape-taupe','/fabric-library':'sample-inspection','/trade-studio':'sample-measuring','/sourcing-guide':'sample-shade','/about-us':'sample-shade','/price-structure':'drape-ivory','/thobe-guide':'kandura-emirati','/for-artisans':'sample-measuring','/artisans-tool':'sample-measuring','/contact':'sample-shade','/privacy':'care-storage','/terms':'sample-inspection','/shipping':'drape-blue','/checkout':'drape-white'};
export const indexablePath=(path:string)=>path!=='/checkout'&&!path.startsWith('/admin');
export const canonicalURL=(path:string,locale:string)=>SITE_ORIGIN+localePrefix(locale)+(path==='/'?'/':path.replace(/\/$/,''));
export const pageAlternates=(path:string)=>indexablePath(path)?[...LOCALES.map(locale=>({locale,url:canonicalURL(path,locale)})),{locale:'x-default',url:canonicalURL(path,'en')}]:[];
export function robotsContent(path:string,host?:string){return host&&!['hithobe.com','www.hithobe.com'].includes(host)?'noindex,nofollow':indexablePath(path)?'index,follow,max-image-preview:large':'noindex,follow';}
export function pageSearchCopy(path:string,locale:string,translate:(key:string,subKey?:string)=>string,item?:{nameKey:string},fallback?:{title:string;description:string}){
 const copy=searchCopy[locale];const entry=navigationEntry(path);const position=searchPaths.indexOf(path);
 const label=path==='/'?copy.home:path==='/collections'?copy.collections:path==='/contact'?copy.contact:path==='/checkout'?translate('checkout'):entry?.copyKey?navigationCopy[locale][entry.copyKey]:entry?.flatKey?translate(entry.flatKey):entry?.labelKey?translate('nav',entry.labelKey):item?translate(item.nameKey):fallback?.title||'hithobe';
 const title=label.endsWith('hithobe')?label:`${label} | hithobe`;
 const description=position>=0?copy.descriptions[position]:fallback?.description||copy.descriptions[0];
 return {title,description,url:canonicalURL(path,locale),image:SITE_ORIGIN+`/images/hithobe/editorial/${images[path]||'plain-weave-ivory'}-1280.webp`};
}
