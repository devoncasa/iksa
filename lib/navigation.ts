export type NavigationEntry={path:string;labelKey?:string;copyKey?:'atelier'|'library'|'trade'|'sourcing';flatKey?:string};
export const NAV_GROUPS=[
 {id:'browse',links:[{path:'/',labelKey:'main'},{path:'/collections',labelKey:'collections'},{path:'/atelier',copyKey:'atelier'},{path:'/gallery',labelKey:'gallery'}]},
 {id:'learn',links:[{path:'/thobe-guide',labelKey:'thobeGuide'},{path:'/fabric-library',copyKey:'library'},{path:'/sourcing-guide',copyKey:'sourcing'}]},
 {id:'tools',links:[{path:'/trade-studio',copyKey:'trade'},{path:'/artisans-tool',labelKey:'artisansTool'},{path:'/price-structure',labelKey:'pricing'},{path:'/for-artisans',labelKey:'forArtisans'}]}
] as const;
export const COMPANY_LINKS:NavigationEntry[]=[{path:'/about-us',labelKey:'aboutUs'},{path:'/contact',labelKey:'contact'}];
export const POLICY_LINKS:NavigationEntry[]=[{path:'/privacy',flatKey:'privacyLabel'},{path:'/terms',flatKey:'termsLabel'},{path:'/shipping',flatKey:'shippingLabel'}];
export const ALL_NAVIGATION:NavigationEntry[]=[...NAV_GROUPS.flatMap(g=>[...g.links]),...COMPANY_LINKS,...POLICY_LINKS,{path:'/checkout',labelKey:'checkout'}];
export function navigationEntry(path:string){return ALL_NAVIGATION.find(link=>link.path===path.replace(/\/$/,'')||link.path===path);}
export function nextPaths(path:string):string[]{
 if(path==='/')return [];
 if(path==='/contact')return ['/collections','/sourcing-guide'];
 if(path==='/collections')return ['/fabric-library','/trade-studio','/contact'];
 if(path.startsWith('/collections/'))return ['/sourcing-guide','/collections','/contact'];
 if(path==='/fabric-library')return ['/trade-studio','/sourcing-guide','/collections'];
 if(path==='/for-artisans')return ['/trade-studio','/collections','/contact'];
 return ['/collections','/sourcing-guide','/contact'].filter(next=>next!==path);
}
