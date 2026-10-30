import test from 'node:test';import assert from 'node:assert/strict';
import {eventFields,analyticsPage,track,trackPageView} from '../lib/analytics.ts';
test('measurement payloads discard personal fields and reject arbitrary identifiers',()=>{
 assert.deepEqual(eventFields('enquiry_start',{email:'buyer@example.test',message:'Private text'}),{});
 assert.deepEqual(eventFields('product_view',{fabric:'heritage-weave-23',email:'buyer@example.test'}),{fabric:'heritage-weave-23'});
 assert.equal(eventFields('gallery_open',{image:'buyer@example.test'}),null);assert.equal(eventFields('fabric_compare',{reference:'ref-99',selected:'yes'}),null);
 assert.deepEqual(eventFields('fabric_compare',{reference:'ref-02',selected:'no'}),{reference:'ref-02',selected:'no'});
});
test('measurement accepts only known website routes without query data',()=>{
 assert.equal(analyticsPage('/th/collections/heritage-weave-23'),'/th/collections/heritage-weave-23');
 assert.equal(analyticsPage('/contact?email=buyer@example.test'),null);assert.equal(analyticsPage('/unknown-person'),null);assert.equal(analyticsPage('/admin'),null);
});
test('private preview events never call analytics',()=>{
 let calls=0;globalThis.window={location:{hostname:'preview.chatgpt.site',pathname:'/contact',origin:'https://preview.chatgpt.site'},gtag:()=>{calls++;}} as any;
 try{track('enquiry_start');trackPageView();assert.equal(calls,0);}finally{delete globalThis.window;}
});
