import test from 'node:test';
import assert from 'node:assert/strict';
import {ALL_NAVIGATION,NAV_GROUPS,navigationEntry,nextPaths} from '../lib/navigation.ts';
import {navigationCopy} from '../locales/navigation.ts';
test('every public page family is discoverable without duplicate destinations',()=>{
 const required=['/','/collections','/atelier','/gallery','/thobe-guide','/fabric-library','/sourcing-guide','/trade-studio','/artisans-tool','/price-structure','/for-artisans','/about-us','/contact','/privacy','/terms','/shipping','/checkout'];
 assert.deepEqual(new Set(ALL_NAVIGATION.map(x=>x.path)),new Set(required));assert.equal(ALL_NAVIGATION.length,required.length);assert.equal(NAV_GROUPS.length,3);
});
test('next steps resolve and never point back to the current page',()=>{
 for(const route of ALL_NAVIGATION.map(x=>x.path).concat('/collections/heritage-weave-23'))for(const path of nextPaths(route)){assert.notEqual(path,route);assert.ok(navigationEntry(path),path);}
 assert.deepEqual(nextPaths('/'),[]);assert.ok(nextPaths('/collections/heritage-weave-23').includes('/contact'));
});
test('navigation copy is complete in all nine languages',()=>{
 const keys=Object.keys(navigationCopy.en).sort();for(const locale of ['th','en','ar','fr','bn','ha','sw','so','ur']){assert.deepEqual(Object.keys(navigationCopy[locale]).sort(),keys);assert.ok(Object.values(navigationCopy[locale]).every(s=>s.length>0));}
});
