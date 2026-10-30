import {loadTranslations} from './locales';
import {localeFromPath,rememberedHomePath} from './lib/language';
import {LanguageCode} from './types';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Retain incoming links from the former hash router.
if (window.location.hash.startsWith('#/')) {
  const oldPath = window.location.hash.slice(1);
  const url = new URL(oldPath, window.location.origin);
  if (url.origin === window.location.origin) window.history.replaceState(null, '', url.pathname + url.search + url.hash);
}
const rootElement = document.getElementById('root');
let entryPath=window.location.pathname;
try{entryPath=rememberedHomePath(entryPath,localStorage.getItem('hithobe-language'));}catch{}
if(entryPath!==window.location.pathname){window.location.replace(entryPath+window.location.search+window.location.hash);}else{
loadTranslations(localeFromPath(window.location.pathname) as LanguageCode).then(()=> {
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

}).catch(error=>console.error('Language assets could not load',error));

}
