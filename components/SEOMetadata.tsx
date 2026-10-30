import {editorialShot,useEditorialCaption} from '../lib/editorial';
import React,{useEffect} from 'react';
import {useLanguage} from '../hooks/useLanguage';
import {localizeSchema} from '../lib/schema';
import {pageSearchCopy,pageAlternates,robotsContent} from '../lib/seo';
import {imageMetadata} from '../lib/imageMetadata';
import {Fabric} from '../types';
interface SEOMetadataProps{titleKey:string;titleText?:string;descriptionText?:string;descriptionKey:string;pagePath:string;item?:Fabric;schemas?:any[];}
const ogLocales:Record<string,string>={th:'th_TH',en:'en_US',ar:'ar_AR',fr:'fr_FR',bn:'bn_BD',ha:'ha_NG',sw:'sw_KE',so:'so_SO',ur:'ur_PK'};
export const SEOMetadata=({titleKey,titleText,descriptionText,descriptionKey,pagePath,item,schemas=[]}:SEOMetadataProps)=>{
 const {translate,language}=useLanguage();
 const fallbackTitle=(titleText??translate(titleKey)).replace('{fabricName}',item?translate(item.nameKey):'').replace('{rollLength}',String(item?.rollLengthInMeters??''));
 const fallbackDescription=descriptionText??(item?translate(item.detailDescriptionKey):translate(descriptionKey));
 const data=pageSearchCopy(pagePath,language,translate,item,{title:fallbackTitle,description:fallbackDescription});
 const caption=useEditorialCaption();const shot=editorialShot(new URL(data.image).pathname);const imageAlt=shot?caption(shot):data.title;
 const alternates=pageAlternates(pagePath);const size=imageMetadata(new URL(data.image).pathname);
 const robots=robotsContent(pagePath,typeof document==='undefined'?undefined:window.location.hostname);
 const tags:Record<string,string>={description:data.description,robots,'og:title':data.title,'og:description':data.description,'og:url':data.url,'og:type':item?'product':'website','og:image':data.image,'og:image:alt':imageAlt,'og:image:width':String(size?.width||1280),'og:image:height':String(size?.height||853),'og:site_name':'hithobe','og:locale':ogLocales[language],'twitter:card':'summary_large_image','twitter:title':data.title,'twitter:description':data.description,'twitter:image':data.image,'twitter:image:alt':imageAlt};
 const contentSchemas=[...schemas.filter(s=>s&&!['HowTo','WebPage','AboutPage','ContactPage'].includes(s['@type'])),{'@context':'https://schema.org','@type':pagePath==='/contact'?'ContactPage':pagePath==='/about-us'?'AboutPage':'WebPage','@id':data.url+'#webpage',url:data.url,name:data.title,description:data.description,inLanguage:language,isPartOf:{'@type':'WebSite','@id':'https://www.hithobe.com/#website',url:'https://www.hithobe.com',name:'hithobe'}}].map(s=>localizeSchema(s,language));
 useEffect(()=>{
  document.title=data.title;
  for(const [key,value] of Object.entries(tags)){
   const attr=key.startsWith('og:')?'property':'name';let tag=document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
   if(!tag){tag=document.createElement('meta');tag.setAttribute(attr,key);document.head.appendChild(tag);}tag.content=value;
  }
  let canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=data.url;
  document.querySelectorAll('link[hreflang]').forEach(tag=>tag.remove());
  for(const alternate of alternates){const link=document.createElement('link');link.rel='alternate';link.hreflang=alternate.locale;link.href=alternate.url;document.head.appendChild(link);}
  document.querySelectorAll('script[type="application/ld+json"]').forEach(tag=>tag.remove());
  contentSchemas.forEach((schema,index)=>{const script=document.createElement('script');script.type='application/ld+json';script.id=`schema-ld-${index}`;script.textContent=JSON.stringify(schema).replace(/</g,'\\u003c');document.head.appendChild(script);});
 },[data.title,data.description,data.url,data.image,robots,language,pagePath]);
 if(typeof document!=='undefined')return null;
 return <><title>{data.title}</title>{Object.entries(tags).map(([key,value])=>key.startsWith('og:')?<meta key={key} property={key} content={value}/>:<meta key={key} name={key} content={value}/>)}<link rel="canonical" href={data.url}/>{alternates.map(alt=><link key={alt.locale} rel="alternate" hrefLang={alt.locale} href={alt.url}/>)}{contentSchemas.map((schema,index)=><script key={index} type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>)}</>;
};
