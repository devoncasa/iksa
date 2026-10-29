import { build } from 'esbuild';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
await build({entryPoints:['entry-server.tsx'],bundle:true,platform:'node',format:'esm',outfile:'.prerender.mjs',external:['react','react-dom','react-dom/server'],define:{'import.meta.env.DEV':'false','process.env.API_KEY':'undefined'}});
try {
 const { render } = await import('../.prerender.mjs');
 const template = await readFile('dist/index.html', 'utf8');
 const xml = await readFile('public/sitemap.xml', 'utf8');
 const paths = [...xml.matchAll(/<loc>https:\/\/www.hithobe.com([^<]*)<\/loc>/g)].map(m=>m[1]);
 for (const path of paths) {
  globalThis.window = { location: { pathname: path }, localStorage: { getItem:()=>null } };
  const ar = path === '/ar' || path.startsWith('/ar/');
  let body = render(path);
  let head = '';
  body = body.replace(/<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g, match=>{head+=match;return '';});
  let html = template.replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta name="description"[^>]*>/,'').replace('</head>',head+'</head>').replace('<div id="root"></div>',`<div id="root">${body}</div>`).replace('<html lang="en">',`<html lang="${ar?'ar':'en'}" dir="${ar?'rtl':'ltr'}">`);
  const dir = 'dist'+(path==='/'?'':path.replace(/\/$/,''));
  await mkdir(dir,{recursive:true});await writeFile(dir+'/index.html',html);
 }
 await writeFile('dist/404.html',template.replace('<head>','<head><meta name="robots" content="noindex">'));
 console.log(`Prerendered ${paths.length} pages`);
} finally { delete globalThis.window; }
