const dictionaries:Record<string,Record<string,string>>={};
const termKeys=new Set(["Plain", "Diagonal Weave", "V-Type Weave", "Japanese V-Type Weave", "Oxford", "Soft Plain", "Soft Twill", "Basket Mesh Weave", "Dense Plain", "Step Fine Soft", "Warm Diagonal Plain", "Soft Flannel", "Winter Wool Twill", "Herringbone / Winter Twill", "Rich Draped Plain", "Twill Plain", "Silk Draped", "Ultra Fine Plain", "Tah-yeh", "Rub' Waqif", "Nisf Waqif", "Waqif", "100% Micro-Polyester", "Premium Polyester", "Poly-Cotton", "Micro-Polyester", "Spun Polyester", "Poly-Cotton Blend", "Heavy Winter Wool Blend", "Cashmere & Wool Blend", "Pure & Luxury Wool Blend", "Warm English Wool", "Spun-Filament Mix", "Manard Composite Yarn", "100% Pure Spun Poly", "100% Spun Poly", "Thai Premium Poly Blend", "85/15 TR Blend", "85% Poly / 15% Rayon", "Poly-Polynosic", "Poly-HWM Modal", "70% Triacetate / 30% Poly", "100% Pure Swiss Cotton", "Micro-Poly Nano Treated"]);
const loaders={
 th:()=>import('./research-th.ts').then(m=>m.terms),
 ar:()=>import('./research-ar.ts').then(m=>m.terms),
 fr:()=>import('./research-fr.ts').then(m=>m.terms),
 bn:()=>import('./research-bn.ts').then(m=>m.terms),
 ha:()=>import('./research-ha.ts').then(m=>m.terms),
 sw:()=>import('./research-sw.ts').then(m=>m.terms),
 so:()=>import('./research-so.ts').then(m=>m.terms),
 ur:()=>import('./research-ur.ts').then(m=>m.terms)
};
export async function loadResearchTerms(locale:string){if(loaders[locale]&&!dictionaries[locale])dictionaries[locale]=await loaders[locale]();}
const countryCodes:Record<string,string>={Japan:'JP','South Korea':'KR',Thailand:'TH',Indonesia:'ID',China:'CN'};
export function researchTerm(value:string,locale:string):string{
 if(locale==='en')return value;
 if(dictionaries[locale]?.[value])return dictionaries[locale][value];
 if(countryCodes[value])return new Intl.DisplayNames([locale],{type:'region'}).of(countryCodes[value])??value;
 if(value==='India/UK'){const names=new Intl.DisplayNames([locale],{type:'region'});return `${names.of('IN')} / ${names.of('GB')}`;}
 return value;
}
export function hasResearchTerm(value:string):boolean{return termKeys.has(value)||Boolean(countryCodes[value])||value==='India/UK';}
