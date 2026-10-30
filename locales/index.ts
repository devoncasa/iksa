import {loadSearchCopy} from './searchCopy';
import {loadResearchTerms} from './researchTerms';
import {loadInterfaceCopy} from './interface';
import {loadCustomerGuidance} from './customerGuidance';
import {LanguageCode,Translations} from '../types';
import {loadDiscovery} from './discovery';
export const translations={} as Record<LanguageCode,Translations>;
const loaders={
 th:()=>import('./th').then(m=>m.th),en:()=>import('./en').then(m=>m.en),ar:()=>import('./ar').then(m=>m.ar),
 fr:()=>import('./fr').then(m=>m.fr),bn:()=>import('./bn').then(m=>m.bn),ha:()=>import('./ha').then(m=>m.ha),
 sw:()=>import('./sw').then(m=>m.sw),so:()=>import('./so').then(m=>m.so),ur:()=>import('./ur').then(m=>m.ur)
};
export async function loadTranslations(locale:LanguageCode){await Promise.all([...[...new Set([locale,LanguageCode.EN])].map(async code=>{if(!translations[code])translations[code]=await loaders[code]();}),loadDiscovery(locale),loadCustomerGuidance(locale),loadInterfaceCopy(locale),loadResearchTerms(locale),loadSearchCopy(locale)]);}
