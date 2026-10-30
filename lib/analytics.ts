import {LOCALES,localeFromPath,localePrefix} from './language.ts';
import {ALL_NAVIGATION} from './navigation.ts';
import {referenceTipIndex} from '../locales/customerGuidance.ts';
import shots from '../data/editorial-images.json' with {type:'json'};
type EventName='gallery_filter'|'gallery_open'|'enquiry_start'|'enquiry_success'|'product_view'|'fabric_compare';
const categories=new Set(['All','Texture','Drape','Styling','Coordination','Care','Sourcing']);
const images=new Set(shots.map(s=>s.id));
export function eventFields(event:EventName,fields:Record<string,string>={}):Record<string,string>|null{
 if(event==='enquiry_start'||event==='enquiry_success')return {};
 if(event==='gallery_filter')return categories.has(fields.category)?{category:fields.category}:null;
 if(event==='gallery_open')return images.has(fields.image)?{image:fields.image}:null;
 if(event==='product_view')return Object.hasOwn(referenceTipIndex,fields.fabric)?{fabric:fields.fabric}:null;
 if(event==='fabric_compare')return /^ref-(0[1-9]|[1-4]\d|5[0-2])$/.test(fields.reference)&&['yes','no'].includes(fields.selected)?{reference:fields.reference,selected:fields.selected}:null;
 return null;
}
export function analyticsPage(path:string):string|null{
 const locale=localeFromPath(path);const clean=path.replace(/^\/(th|en|ar|fr|bn|ha|sw|so|ur)(?=\/|$)/,'')||'/';
 const route=clean==='/'?'/':clean.replace(/\/$/,'');
 if(ALL_NAVIGATION.some(entry=>entry.path===route)||Object.keys(referenceTipIndex).some(id=>route==='/collections/'+id))return localePrefix(locale)+(route==='/'?'/':route);
 return null;
}
const permittedHost=(host:string)=>['hithobe.com','www.hithobe.com'].includes(host);
/** Explicit allowlists exclude form text, query strings and arbitrary path segments. */
export function track(event:EventName,fields:Record<string,string>={}){
 if(!permittedHost(window.location.hostname))return;
 const safe=eventFields(event,fields);const page=analyticsPage(window.location.pathname);if(!safe||!page)return;
 const gtag=(window as unknown as {gtag?:(...args:unknown[])=>void}).gtag;
 gtag?.('event',event,{...safe,language:localeFromPath(page),page_path:page});
}
export function trackPageView(){
 if(!permittedHost(window.location.hostname))return;
 const path=analyticsPage(window.location.pathname);if(!path)return;
 const gtag=(window as unknown as {gtag?:(...args:unknown[])=>void}).gtag;
 gtag?.('event','page_view',{page_location:window.location.origin+path,page_path:path,language:localeFromPath(path)});
}
