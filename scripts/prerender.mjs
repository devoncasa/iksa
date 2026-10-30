import { build } from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
await build({entryPoints:['entry-server.tsx'],bundle:true,platform:'node',format:'esm',outfile:'.prerender.mjs',external:['react','react-dom','react-dom/server'],define:{'import.meta.env.DEV':'false','process.env.API_KEY':'undefined'}});
try {
 const { render } = await import('../.prerender.mjs');
 let template = await readFile('dist/index.html', 'utf8');
 template = template
  .replace(/<script src="https:\/\/cdn.tailwindcss.com[^>]*><\/script>/g,'')
  .replace(/<script>\s*tailwind.config = [\s\S]*?<\/script>/g,'')
  .replace(/<script type="importmap">[\s\S]*?<\/script>/g,'')
  .replace(/<link rel="preload" href="https:\/\/i.postimg.cc\/[^>]*>/g,'')
  .replace(/gtag\('config', ([^)]+)\);/,"gtag('config', $1, {send_page_view:false});")
  .replace(/<link\b[^>]*href="https:\/\/fonts\.googleapis\.com\/css[^>]*>/g,'');
 const xml = await readFile('public/sitemap.xml', 'utf8');
 const paths = [...xml.matchAll(/<loc>https:\/\/www.hithobe.com([^<]*)<\/loc>/g)].map(m=>m[1]);
 paths.push(...['','/th','/ar','/fr','/bn','/ha','/sw','/so','/ur'].map(prefix=>prefix+'/checkout'));
 for (const path of paths) {
  globalThis.window = { location: { pathname: path, search: '' }, localStorage: { getItem:()=>null } };
  const locale = path.match(/^\/(ar|th|fr|bn|ha|sw|so|ur)(?=\/|$)/)?.[1] || 'en';
  const ar = locale === 'ar' || locale === 'ur';
  let body = await render(path);
  let head = '';
  body = body.replace(/<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g, match=>{head+=match;return '';});
  const regionalFont={th:'Noto+Sans+Thai',ar:'Cairo',bn:'Noto+Sans+Bengali',ur:'Noto+Naskh+Arabic'}[locale];
  const fontURL='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=Playfair+Display:wght@700'+(regionalFont?'&amp;family='+regionalFont+':wght@400;600;700':'')+'&amp;display=swap';
  let html = template.replace('</head>',`<link rel="stylesheet" href="${fontURL}"></head>`).replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta name="description"[^>]*>/,'').replace('</head>',head+'</head>').replace('<div id="root"></div>',`<div id="root">${body}</div>`).replace('<html lang="en">',`<html lang="${locale}" dir="${ar?'rtl':'ltr'}">`);
  const dir = 'dist'+(path==='/'?'':path.replace(/\/$/,''));
  await mkdir(dir,{recursive:true});await writeFile(dir+'/index.html',html);
 }
 await writeFile('dist/404.html',template.replace('<head>','<head><meta name="robots" content="noindex">'));
 console.log(`Prerendered ${paths.length} pages`);
} finally { delete globalThis.window; }
