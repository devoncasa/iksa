export type CustomerGuidanceCopy={title:string;scope:string;aboutTitle:string;aboutIntro:string;artisanTitle:string;artisanIntro:string;productLabel:string;evidence:string;link:string;sources:string;questions:[string,string][];tips:string[]};
export const customerGuidance={} as Record<string,CustomerGuidanceCopy>;
const loaders={
 th:()=>import('./customer-th.ts').then(m=>m.copy),
 en:()=>import('./customer-en.ts').then(m=>m.copy),
 ar:()=>import('./customer-ar.ts').then(m=>m.copy),
 fr:()=>import('./customer-fr.ts').then(m=>m.copy),
 bn:()=>import('./customer-bn.ts').then(m=>m.copy),
 ha:()=>import('./customer-ha.ts').then(m=>m.copy),
 sw:()=>import('./customer-sw.ts').then(m=>m.copy),
 so:()=>import('./customer-so.ts').then(m=>m.copy),
 ur:()=>import('./customer-ur.ts').then(m=>m.copy)
};
export async function loadCustomerGuidance(locale:string){if(loaders[locale]&&!customerGuidance[locale])customerGuidance[locale]=await loaders[locale]();}
export const referenceTipIndex:Record<string,number>={'heritage-weave-23':0,'crisp-twill-w-23':1,'performance-matte-50':2,'feather-silk-23':3,'lustre-twill-23':4,'non-iron-cotton-25':5,'wind-voile-50':6};
