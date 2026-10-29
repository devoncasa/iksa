
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Retain incoming links from the former hash router.
if (window.location.hash.startsWith('#/')) {
  const oldPath = window.location.hash.slice(1);
  window.history.replaceState(null, '', oldPath);
}
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
