import {localizedPath} from './language.ts';
const origin='https://www.hithobe.com';
/** Keep business identity global while pointing content entities to their locale. */
export function localizeSchema(value:any,locale:string):any {
 if(typeof value==='string'&&value.startsWith('/images/'))return origin+value;
 if(Array.isArray(value))return value.map(item=>localizeSchema(item,locale));
 if(!value||typeof value!=='object')return value;
 const result=Object.fromEntries(Object.entries(value).map(([key,item])=>{
  if(typeof item==='string'){
   if((key==='image'||key==='url')&&item.startsWith('/images/'))return [key,origin+item];
   if(['url','item','mainEntityOfPage','@id'].includes(key)&&item.startsWith(origin+'/')){
    const path=item.slice(origin.length);
    if(key==='item'&&path==='/')return [key,origin+localizedPath('/',locale)];
    if(/^\/(collections|thobe-guide|atelier|gallery|fabric-library|trade-studio|sourcing-guide|about-us|contact|for-artisans|artisans-tool|price-structure)(\/|$)/.test(path))return [key,origin+localizedPath(path,locale)];
   }
  }
  return [key,localizeSchema(item,locale)];
 }));
 if(['Article','WebPage','AboutPage','ContactPage','HowTo'].includes(result['@type']))result.inLanguage=locale;
 return result;
}
