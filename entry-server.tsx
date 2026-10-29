import { localeFromPath, localePrefix } from './lib/language';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';
export function render(path: string) {
 const prefix = localePrefix(localeFromPath(path));
 return renderToString(<StaticRouter location={path} basename={prefix || '/'}><AppContent /></StaticRouter>);
}
