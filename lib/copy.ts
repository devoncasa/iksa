import {useLanguage} from '../hooks/useLanguage';
import {discoveryDictionaries as dictionaries} from '../locales/discovery';
export function copy(language:string,en:string,ar?:string,th?:string) {return language==='ar'?(dictionaries.ar?.[en]||(ar&&ar!==en?ar:en)):language==='th'?(th||dictionaries.th?.[en]||en):(dictionaries[language]?.[en]||en);}
export function useCopy(){const {language}=useLanguage();return (en:string,ar?:string,th?:string)=>copy(language,en,ar,th);}
