import {loadTranslations} from './locales';
import {LanguageCode} from './types';
import { localeFromPath, localePrefix } from './lib/language';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';
export async function render(path: string) {
 await loadTranslations(localeFromPath(path) as LanguageCode);
 const prefix = localePrefix(localeFromPath(path));
 return renderToString(<StaticRouter location={path} basename={prefix || '/'}><AppContent /></StaticRouter>);
}
