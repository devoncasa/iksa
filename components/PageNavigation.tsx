import React from 'react';
import {Link,useLocation} from 'react-router-dom';
import {useNavigation} from '../hooks/useNavigation';
import {useLanguage} from '../hooks/useLanguage';
import {navigationEntry,nextPaths} from '../lib/navigation';
import {MOCK_FABRICS} from '../constants';
export const PageWayfinding=()=>{
 const {pathname}=useLocation();const {copy,label}=useNavigation();const {translate}=useLanguage();if(pathname==='/')return null;
 const product=pathname.startsWith('/collections/')?MOCK_FABRICS.find(f=>f.id===pathname.split('/')[2]):undefined;
 const entry=navigationEntry(pathname);const current=product?translate(product.nameKey):entry?label(entry):translate('notFoundTitle');
 return <nav className="page-wayfinding" aria-label={copy.breadcrumbs}><ol><li><Link to="/">{translate('nav','main')}</Link></li>{product&&<li><span aria-hidden="true">/</span><Link to="/collections">{translate('nav','collections')}</Link></li>}<li><span aria-hidden="true">/</span><span aria-current="page">{current}</span></li></ol></nav>;
};
export const JourneyLinks=()=>{
 const {pathname}=useLocation();const {copy,label}=useNavigation();const paths=nextPaths(pathname);if(!paths.length||!navigationEntry(pathname)&&!pathname.startsWith('/collections/'))return null;
 const product=pathname.startsWith('/collections/')?MOCK_FABRICS.find(f=>f.id===pathname.split('/')[2]):undefined;
 return <aside className="journey-links"><h2>{copy.next}</h2><div>{paths.map(path=>{const entry=navigationEntry(path)!;return <Link key={path} to={path==='/contact'&&product?`/contact?fabric=${encodeURIComponent(product.id)}`:path}><span>{label(entry)}</span><span aria-hidden="true">↗</span></Link>})}</div></aside>;
};
