export type InterfaceCopy={image:string;selectColour:string;details:string;illustration:string;courtyard:string;atelier:string;window:string;colourStudy:string;materialNotes:string;tableError:string;rolls:string;brief:string[]};
export const interfaceCopy={} as Record<string,InterfaceCopy>;
const loaders={
 th:()=>import('./interface-th.ts').then(m=>m.copy),
 en:()=>import('./interface-en.ts').then(m=>m.copy),
 ar:()=>import('./interface-ar.ts').then(m=>m.copy),
 fr:()=>import('./interface-fr.ts').then(m=>m.copy),
 bn:()=>import('./interface-bn.ts').then(m=>m.copy),
 ha:()=>import('./interface-ha.ts').then(m=>m.copy),
 sw:()=>import('./interface-sw.ts').then(m=>m.copy),
 so:()=>import('./interface-so.ts').then(m=>m.copy),
 ur:()=>import('./interface-ur.ts').then(m=>m.copy)
};
export async function loadInterfaceCopy(locale:string){if(loaders[locale]&&!interfaceCopy[locale])interfaceCopy[locale]=await loaders[locale]();}
