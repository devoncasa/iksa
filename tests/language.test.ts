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
