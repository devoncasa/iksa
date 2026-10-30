import metadata from '../data/image-metadata.json';
type ImageMetadata={width:number;height:number;srcSet?:string};
export function imageMetadata(src:string):ImageMetadata|undefined {
 return (metadata as Record<string,ImageMetadata>)[src];
}
