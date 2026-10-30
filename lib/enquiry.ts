export type EnquiryFields={name:string;email:string;subject:string;message:string};
export function enquiryErrors(fields:EnquiryFields):Partial<Record<keyof EnquiryFields,'required'|'email'>>{
 const errors:Partial<Record<keyof EnquiryFields,'required'|'email'>>={};
 for(const key of ['name','email','subject','message'] as const)if(!fields[key].trim())errors[key]='required';
 if(!errors.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))errors.email='email';
 return errors;
}
/** The private preview must never imply that a real enquiry has been delivered. */
export const canSubmitEnquiry=(hostname:string)=>['hithobe.com','www.hithobe.com'].includes(hostname.toLowerCase());
export async function submitEnquiry(fields:EnquiryFields,botField:string,hostname:string,request:typeof fetch=fetch,timeoutMs=15000):Promise<void>{
 if(!canSubmitEnquiry(hostname))throw new Error('Preview submission disabled');
 if(Object.keys(enquiryErrors(fields)).length)throw new Error('Invalid enquiry');
 const controller=new AbortController();
 const timeout=setTimeout(()=>controller.abort(),timeoutMs);
 try{
  const response=await request('/__forms.html',{method:'POST',redirect:'error',signal:controller.signal,headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({'form-name':'hithobe-enquiry',...fields,'bot-field':botField}).toString()});
  if(!response.ok)throw new Error('Submission failed');
 }finally{clearTimeout(timeout);}
}
/** Session-only draft data never goes in URLs or analytics. */
export function parseEnquiryDraft(raw:string|null):Partial<EnquiryFields>{
 try{
  const value=JSON.parse(raw||'null');if(!value||typeof value!=='object'||Array.isArray(value))return {};
  const limits={name:150,email:254,subject:200,message:12000};const result:Partial<EnquiryFields>={};
  for(const key of Object.keys(limits) as (keyof EnquiryFields)[])if(typeof value[key]==='string')result[key]=value[key].slice(0,limits[key]);
  return result;
 }catch{return {};}
}
