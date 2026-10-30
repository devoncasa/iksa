import test from 'node:test';
import assert from 'node:assert/strict';
import {localeFromPath,localizedPath} from '../lib/language.ts';
test('language paths recognise only complete locale segments',()=>{
 assert.equal(localeFromPath('/th/collections'),'th');assert.equal(localeFromPath('/th'),'th');
 assert.equal(localeFromPath('/thobe-guide'),'en');assert.equal(localeFromPath('/artisans-tool'),'en');
 assert.equal(localeFromPath('/ar/atelier'),'ar');
});
test('switching languages preserves route without duplicate prefixes',()=>{
 assert.equal(localizedPath('/ar/collections/heritage-weave-23','th'),'/th/collections/heritage-weave-23');
 assert.equal(localizedPath('/th/atelier','en'),'/atelier');
 assert.equal(localizedPath('/th','ar'),'/ar/');
});
test('nine-language switching handles RTL and all new prefixes',()=>{
 for(const locale of ['th','en','ar','fr','bn','ha','sw','so','ur']){
  const path=localizedPath('/fr/collections/heritage-weave-23',locale);
  assert.equal(localeFromPath(path),locale);assert.ok(path.endsWith('/collections/heritage-weave-23'));
 }
 assert.equal(localeFromPath('/sourcing-guide'),'en');assert.equal(localeFromPath('/somali-guide'),'en');
});
import {rememberedHomePath} from '../lib/language.ts';
test('a remembered homepage choice never overwrites an explicit language or product URL',()=>{
 assert.equal(rememberedHomePath('/','th'),'/th/');assert.equal(rememberedHomePath('/','en'),'/');
 assert.equal(rememberedHomePath('/','xx'),'/');assert.equal(rememberedHomePath('/',null),'/');
 for(const path of ['/ar/','/ur/collections','/collections/heritage-weave-23','/en/'])assert.equal(rememberedHomePath(path,'th'),path);
});
