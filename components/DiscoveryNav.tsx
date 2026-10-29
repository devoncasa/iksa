import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
export function DiscoveryNav() {
 const {language}=useLanguage();const ar=language==='ar';
 return <nav aria-label={ar?'استكشف هيثوب':'Explore hithobe'} className="discovery-nav">{[['/atelier','The edit','المختارات'],['/fabric-library','Fabric library','مكتبة الأقمشة'],['/trade-studio','Trade studio','استوديو التجارة'],['/sourcing-guide','Buying guides','أدلة الشراء']].map(([url,en,a])=><NavLink key={url} to={url}>{ar?a:en}<span aria-hidden="true"> ↗︎</span></NavLink>)}</nav>;
}
