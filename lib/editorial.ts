import shots from '../data/editorial-images.json';
import {captions} from '../locales/editorial-captions';
import {useCopy} from './copy';
export function useEditorialCaption(){
 const c=useCopy();
 return (shot:typeof shots[number])=>c(shot.scene,...(captions[shot.id]||['','']) as [string,string]);
}
export function editorialShot(src:string){return shots.find(s=>src.endsWith(`/editorial/${s.id}-1280.webp`) || src.endsWith(`/editorial/${s.id}-800.webp`) || src.endsWith(`/editorial/${s.id}-480.webp`));}
