export const discoveryDictionaries:Record<string,Record<string,string>>={};
const loaders={
 ar:()=>import('./discovery-ar').then(m=>m.discoveryAr),
 th:()=>import('./discovery-th').then(m=>m.discoveryThai),
 fr:()=>import('./discovery-fr').then(m=>m.discoveryFr),
 bn:()=>import('./discovery-bn').then(m=>m.discoveryBn),
 ha:()=>import('./discovery-ha').then(m=>m.discoveryHa),
 sw:()=>import('./discovery-sw').then(m=>m.discoverySw),
 so:()=>import('./discovery-so').then(m=>m.discoverySo),
 ur:()=>import('./discovery-ur').then(m=>m.discoveryUr),
};
export async function loadDiscovery(locale:string){if(loaders[locale]&&!discoveryDictionaries[locale])discoveryDictionaries[locale]=await loaders[locale]();}
