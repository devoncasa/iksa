import test from 'node:test';import assert from 'node:assert/strict';
import {canonicalURL,pageAlternates,robotsContent,pageSearchCopy} from '../lib/seo.ts';
import {loadSearchCopy,searchCopy,searchPaths} from '../locales/searchCopy.ts';
test('search copy covers every page purpose in all nine languages without repeated descriptions',async()=>{
 for(const locale of ['th','en','ar','fr','bn','ha','sw','so','ur']){await loadSearchCopy(locale);const copy=searchCopy[locale];assert.equal(copy.descriptions.length,searchPaths.length);assert.equal(new Set(copy.descriptions).size,searchPaths.length);assert.ok(copy.descriptions.every(text=>text.length>45));}
});
test('canonicals and language clusters preserve independent localized URLs',()=>{
 assert.equal(canonicalURL('/','th'),'https://www.hithobe.com/th/');assert.equal(canonicalURL('/collections/item','ar'),'https://www.hithobe.com/ar/collections/item');assert.equal(pageAlternates('/collections').length,10);assert.equal(pageAlternates('/checkout').length,0);
});
test('private previews retain noindex after client metadata updates',()=>{
 assert.equal(robotsContent('/','preview.chatgpt.site'),'noindex,nofollow');assert.equal(robotsContent('/collections','localhost'),'noindex,nofollow');assert.match(robotsContent('/','www.hithobe.com'),/^index/);assert.equal(robotsContent('/checkout','www.hithobe.com'),'noindex,follow');
});
