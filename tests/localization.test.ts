import test from 'node:test';import assert from 'node:assert/strict';
import {interfaceCopy,loadInterfaceCopy} from '../locales/interface.ts';
import {researchTerm,hasResearchTerm,loadResearchTerms} from '../locales/researchTerms.ts';
import {fabricReference} from '../data/fabricReference.ts';
import {discoveryAr} from '../locales/discovery-ar.ts';
test('new interface labels and enquiry prompts cover all nine locales',async()=>{
 for(const locale of ['th','en','ar','fr','bn','ha','sw','so','ur'])await loadInterfaceCopy(locale);
 const keys=Object.keys(interfaceCopy.en).sort();
 for(const locale of ['th','en','ar','fr','bn','ha','sw','so','ur']){const values=interfaceCopy[locale];assert.deepEqual(Object.keys(values).sort(),keys);assert.equal(values.brief.length,8);assert.ok(Object.values(values).every(v=>Array.isArray(v)||v.length>0));}
});
test('every research attribute has a localized term or a retained common name',async()=>{
 for(const locale of ['th','ar','fr','bn','ha','sw','so','ur'])await loadResearchTerms(locale);
 const common=new Set(['Oxford']);
 for(const locale of ['th','ar','fr','bn','ha','sw','so','ur'])for(const record of fabricReference)for(const field of ['weave','composition','drape','origin']){
  const value=record[field];const translated=researchTerm(value,locale);assert.ok(translated.length>0);
  assert.ok(hasResearchTerm(value),`${locale}: ${value}`);
  if(!common.has(value)&&field!=='origin')assert.notEqual(translated,value,`${locale}: ${value}`);
 }
});
test('Arabic fallback dictionary covers shade, request-format and formula explanations',()=>{
 for(const value of ['Bluish white','Snow white','Natural white','Sukkari cream','Lemon cream','Warm sand','Sample swatch / shade card','Cut length','Full roll','Carton / bulk enquiry'])assert.match(discoveryAr[value],/[\u0600-\u06ff]/);
 assert.ok(Object.keys(discoveryAr).filter(key=>key.length>50).length>=5);
});
