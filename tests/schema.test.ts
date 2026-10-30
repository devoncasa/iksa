import test from 'node:test';
import assert from 'node:assert/strict';
import {localizeSchema} from '../lib/schema.ts';
test('content schema follows locale while business identity remains stable',()=>{
 const value={'@type':'Article',url:'https://www.hithobe.com/thobe-guide',image:'/images/example.webp',publisher:{url:'https://www.hithobe.com'},mainEntityOfPage:'https://www.hithobe.com/thobe-guide'};
 const result=localizeSchema(value,'ur');assert.equal(result.url,'https://www.hithobe.com/ur/thobe-guide');assert.equal(result.mainEntityOfPage,result.url);assert.equal(result.inLanguage,'ur');assert.equal(result.publisher.url,value.publisher.url);assert.equal(result.image,'https://www.hithobe.com/images/example.webp');assert.equal(value.url,'https://www.hithobe.com/thobe-guide');
});
