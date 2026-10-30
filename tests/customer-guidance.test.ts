import test from 'node:test';
import assert from 'node:assert/strict';
import {customerGuidance,loadCustomerGuidance,referenceTipIndex} from '../locales/customerGuidance.ts';
test('customer guidance has six complete answers and seven distinct sample tips in every language',async()=>{
 for(const language of ['th','en','ar','fr','bn','ha','sw','so','ur']){
  await loadCustomerGuidance(language);const copy=customerGuidance[language];
  assert.ok(copy.title&&copy.evidence&&copy.aboutIntro&&copy.artisanIntro,language);
  assert.equal(copy.questions.length,6);assert.ok(copy.questions.every(row=>row.length===2&&row.every(text=>text.length>20)),language);
  assert.equal(copy.tips.length,7);assert.equal(new Set(copy.tips).size,7);
  assert.ok(copy.tips.every(text=>text.length>40),language);
 }
 assert.equal(new Set(Object.values(referenceTipIndex)).size,7);
});
