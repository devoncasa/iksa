import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';
export function render(path: string) {
 const ar = path === '/ar' || path.startsWith('/ar/');
 return renderToString(<StaticRouter location={path} basename={ar ? '/ar' : '/'}><AppContent /></StaticRouter>);
}
