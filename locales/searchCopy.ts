export const searchPaths=['/','/collections','/atelier','/gallery','/fabric-library','/trade-studio','/sourcing-guide','/about-us','/price-structure','/thobe-guide','/for-artisans','/artisans-tool','/contact','/privacy','/terms','/shipping','/checkout'];
export type SearchCopy={home:string;collections:string;contact:string;descriptions:string[]};
export const searchCopy={} as Record<string,SearchCopy>;
const loaders={
 th:()=>import('./search-th.ts').then(m=>m.copy),
 en:()=>import('./search-en.ts').then(m=>m.copy),
 ar:()=>import('./search-ar.ts').then(m=>m.copy),
 fr:()=>import('./search-fr.ts').then(m=>m.copy),
 bn:()=>import('./search-bn.ts').then(m=>m.copy),
 ha:()=>import('./search-ha.ts').then(m=>m.copy),
 sw:()=>import('./search-sw.ts').then(m=>m.copy),
 so:()=>import('./search-so.ts').then(m=>m.copy),
 ur:()=>import('./search-ur.ts').then(m=>m.copy)
};
export async function loadSearchCopy(locale:string){if(loaders[locale]&&!searchCopy[locale])searchCopy[locale]=await loaders[locale]();}
