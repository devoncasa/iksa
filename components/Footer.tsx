import React from 'react';
import {Link} from 'react-router-dom';
import {useLanguage} from '../hooks/useLanguage';
import {useNavigation} from '../hooks/useNavigation';
import {NAV_GROUPS,COMPANY_LINKS,POLICY_LINKS} from '../lib/navigation';
import {PhoneIcon,BuildingIcon} from './icons';
export const Footer=()=>{
 const {translate}=useLanguage();const {copy,label}=useNavigation();
 return <footer className="bg-stone-900/60 backdrop-blur-xl border-t border-stone-700/50 text-white"><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 text-sm">{NAV_GROUPS.map(g=><nav key={g.id} aria-label={copy[g.id]}><h2 className="font-semibold mb-3">{copy[g.id]}</h2><ul className="space-y-2">{g.links.map(entry=><li key={entry.path}><Link to={entry.path} className="hover:underline">{label(entry)}</Link></li>)}</ul></nav>)}
 <div className="col-span-2 lg:col-span-1"><h2 className="font-semibold mb-3"><Link to="/contact" className="hover:underline">{translate('footer_contactTitle')}</Link></h2><div className="flex items-start gap-2"><BuildingIcon className="w-4 h-4 mt-1 shrink-0"/><address className="not-italic leading-relaxed">{translate('contact_addressLine1')}<br/>{translate('contact_addressLine2')}</address></div><a href="tel:+66818519922" className="flex items-center gap-2 mt-3 hover:underline"><PhoneIcon className="w-4 h-4"/><span dir="ltr">+66 81 851 9922</span></a></div></div>
 <nav aria-label={translate('legalTitle')} className="flex flex-wrap gap-x-6 gap-y-2 text-sm border-t border-stone-600/50 mt-6 pt-5">{[COMPANY_LINKS[0],...POLICY_LINKS].map(entry=><Link to={entry.path} key={entry.path} className="hover:underline">{label(entry)}</Link>)}</nav>
 <div className="text-center text-sm pt-5"><span className="font-serif-display text-2xl" aria-label="hithobe"><i className="text-muted-gold">hi</i>thobe</span><p className="mt-2">{translate('footerRights')}</p></div>
 </div></footer>;
};
