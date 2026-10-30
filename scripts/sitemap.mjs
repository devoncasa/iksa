import {writeFile} from 'node:fs/promises';
const locales=['th','en','ar','fr','bn','ha','sw','so','ur'];
const paths=['/','/atelier','/gallery','/fabric-library','/trade-studio','/sourcing-guide','/about-us','/collections','/price-structure','/thobe-guide','/for-artisans','/artisans-tool','/contact','/privacy','/terms','/shipping'];
const {readFile}=await import('node:fs/promises');const constants=await readFile('constants.ts','utf8');
for(const id of constants.matchAll(/id: '(heritage-weave-[^']+|performance-knit-[^']+|luxe-flow-[^']+|sundus-[^']+)'/g)){if(!paths.includes('/collections/'+id[1]))paths.push('/collections/'+id[1]);}
// The catalog has additional families. Use all top-level SKU object IDs from its declaration.
const catalog=constants.split('export const MOCK_FABRICS')[1]?.split('export const ')[0]||'';
for(const match of catalog.matchAll(/id:\s*['"]([^'"]+)['"]/g)){const path='/collections/'+match[1];if(!paths.includes(path))paths.push(path);}
const origin='https://www.hithobe.com';const url=(lang,path)=>origin+(lang==='en'?'':'/'+lang)+path;
const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+paths.flatMap(path=>locales.map(lang=>'<url><loc>'+url(lang,path)+'</loc>'+locales.map(alt=>`<xhtml:link rel="alternate" hreflang="${alt}" href="${url(alt,path)}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${url('en',path)}"/></url>`)).join('')+'</urlset>';
await writeFile('public/sitemap.xml',xml);await writeFile('sitemap.xml',xml);console.log(`Sitemap: ${paths.length} page paths × ${locales.length} languages`);
