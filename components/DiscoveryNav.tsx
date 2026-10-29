import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
export function DiscoveryNav() {
 const {language}=useLanguage();const ar=language==='ar';const th=language==='th';
 return <nav aria-label={th?'สำรวจ hithobe':ar?'استكشف هيثوب':'Explore hithobe'} className="discovery-nav">{[['/atelier','The edit','المختارات'],['/fabric-library','Fabric library','مكتبة الأقمشة'],['/trade-studio','Trade studio','استوديو التجارة'],['/sourcing-guide','Buying guides','أدلة الشراء']].map(([url,en,a])=><NavLink key={url} to={url}>{th?({'The edit':'คอลเลกชันคัดสรร','Fabric library':'คลังข้อมูลผ้า','Trade studio':'เครื่องมือวางแผน','Buying guides':'คู่มือเลือกซื้อ'}[en]):ar?a:en}<span aria-hidden="true"> ↗︎</span></NavLink>)}</nav>;
}
