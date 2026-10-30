import {useLanguage} from './useLanguage';
import {navigationCopy} from '../locales/navigation';
import {NavigationEntry} from '../lib/navigation';
export function useNavigation(){const {language,translate}=useLanguage();const copy=navigationCopy[language]||navigationCopy.en;return {copy,label:(entry:NavigationEntry)=>entry.copyKey?copy[entry.copyKey]:entry.flatKey?translate(entry.flatKey):translate('nav',entry.labelKey)};}
