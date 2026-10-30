import test from 'node:test';
import assert from 'node:assert/strict';
import {enquiryErrors,canSubmitEnquiry,submitEnquiry} from '../lib/enquiry.ts';
import {interactionCopy} from '../locales/interactions.ts';
const fields={name:'Test buyer',email:'buyer@example.test',subject:'Fabric enquiry & shade',message:'Reference: heritage-weave-23\nColour: ivory + sand'};
test('enquiry validation identifies the first missing field and invalid email',()=>{
 assert.deepEqual(enquiryErrors({name:' ',email:'',subject:'',message:''}),{name:'required',email:'required',subject:'required',message:'required'});
 assert.deepEqual(enquiryErrors({...fields,email:'invalid@'}),{email:'email'});
 assert.deepEqual(enquiryErrors(fields),{});
});
test('private and lookalike hosts cannot issue an enquiry request',async()=>{
 let calls=0;const request=(async()=>{calls++;return new Response(null,{status:200});}) as typeof fetch;
 for(const hostname of ['localhost','hithobe-private-review-oct29.goodmochi12.chatgpt.site','hithobe.com.evil.test','preview.netlify.app','']){
  assert.equal(canSubmitEnquiry(hostname),false);
  await assert.rejects(()=>submitEnquiry(fields,'',hostname,request),/Preview/);
 }
 assert.equal(calls,0);assert.equal(canSubmitEnquiry('www.hithobe.com'),true);
});
test('an accepted enquiry preserves the reference and encodes fields in the POST body',async()=>{
 let calls=0;
 const request=(async(url,options)=>{
  calls++;assert.equal(url,'/__forms.html');assert.equal(options?.method,'POST');assert.equal(options?.redirect,'error');
  const body=new URLSearchParams(options?.body as string);
  assert.equal(body.get('form-name'),'hithobe-enquiry');assert.equal(body.get('message'),fields.message);assert.equal(body.get('subject'),fields.subject);assert.equal(body.get('email'),fields.email);assert.equal(body.get('bot-field'),'');
  return new Response(null,{status:200});
 }) as typeof fetch;
 await submitEnquiry(fields,'','www.hithobe.com',request);assert.equal(calls,1);
});
test('HTTP and network failures do not resolve as success',async()=>{
 for(const status of [400,404,429,500])await assert.rejects(()=>submitEnquiry(fields,'','hithobe.com',(async()=>new Response(null,{status})) as typeof fetch),/failed/);
 await assert.rejects(()=>submitEnquiry(fields,'','hithobe.com',(async()=>{throw new Error('Network unavailable');}) as typeof fetch),/Network/);
 let calls=0;await assert.rejects(()=>submitEnquiry({...fields,message:' '},'','hithobe.com',(async()=>{calls++;return new Response(null,{status:200});}) as typeof fetch),/Invalid/);assert.equal(calls,0);
});
test('stalled enquiry requests are aborted',async()=>{
 const request=((url,options)=>new Promise((resolve,reject)=>options?.signal?.addEventListener('abort',()=>reject(new Error('Aborted')),{once:true}))) as typeof fetch;
 await assert.rejects(()=>submitEnquiry(fields,'','hithobe.com',request,10),/Aborted/);
});
test('interaction messages cover all nine languages',()=>{
 const keys=Object.keys(interactionCopy.en).sort();
 for(const language of ['th','en','ar','fr','bn','ha','sw','so','ur']){assert.deepEqual(Object.keys(interactionCopy[language]).sort(),keys);assert.ok(Object.values(interactionCopy[language]).every(value=>value.length>0));}
});
import {parseEnquiryDraft} from '../lib/enquiry.ts';
test('session enquiry drafts retain entered text but reject malformed fields',()=>{
 assert.deepEqual(parseEnquiryDraft(JSON.stringify(fields)),fields);
 assert.deepEqual(parseEnquiryDraft('{bad'),{});assert.deepEqual(parseEnquiryDraft('[]'),{});
 assert.deepEqual(parseEnquiryDraft('{"name":42,"subject":"Saved subject","unknown":"ignored"}'),{subject:'Saved subject'});
 assert.equal(parseEnquiryDraft(JSON.stringify({...fields,message:'x'.repeat(14000)})).message?.length,12000);
});
