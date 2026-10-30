import React,{useEffect,useRef,useState} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {useLanguage} from '../hooks/useLanguage';
import {useNavigation} from '../hooks/useNavigation';
import {useCart} from '../hooks/useCart';
import {NAV_GROUPS,COMPANY_LINKS} from '../lib/navigation';
import {CloseIcon,MenuIcon,ShoppingCartIcon} from './icons';
import {CartModal} from './CartModal';
import {LanguageSwitcher} from './LanguageSwitcher';
export const Header=()=>{
 const {translate}=useLanguage();const {copy,label}=useNavigation();const {getCartTotal}=useCart();const {totalItems}=getCartTotal();const location=useLocation();
 const [mobile,setMobile]=useState(false);const [cart,setCart]=useState(false);const [scrolled,setScrolled]=useState(false);const [group,setGroup]=useState<string|null>(null);
 const header=useRef<HTMLElement>(null);const menu=useRef<HTMLDivElement>(null);const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>10);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
 useEffect(()=>{setMobile(false);setCart(false);setGroup(null)},[location.pathname]);
 useEffect(()=>{const media=window.matchMedia('(min-width:1024px)');const change=()=>{setGroup(null);if(media.matches)setMobile(false)};media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);
 useEffect(()=>{const previous=document.body.style.overflow;if(mobile||cart){document.body.style.overflow='hidden';if(mobile)menu.current?.querySelector<HTMLElement>('a')?.focus()}return()=>{document.body.style.overflow=previous}},[mobile,cart]);
 useEffect(()=>{const close=(e:PointerEvent)=>{if(header.current&&!header.current.contains(e.target as Node))setGroup(null)};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close)},[]);
 const closeMenu=()=>{setMobile(false);toggle.current?.focus()};
 return <><a className="skip-link" href="#main-content">{copy.skip}</a><header ref={header} className={`site-header ${scrolled||mobile||group?'is-solid':''}`} onKeyDown={e=>{if(e.key==='Escape'){if(group)header.current?.querySelector<HTMLButtonElement>(`[aria-controls=nav-${group}]`)?.focus();setGroup(null);if(mobile)closeMenu()}if(mobile&&e.key==='Tab'&&e.target===toggle.current){e.preventDefault();const links=menu.current?.querySelectorAll<HTMLElement>('a');if(links?.length)(e.shiftKey?links[links.length-1]:links[0]).focus()}}}>
 <div className="site-header-inner"><Link to="/" className="site-wordmark" aria-label="hithobe"><span className="font-serif-display"><i>hi</i>thobe</span></Link>
 <nav className="site-primary" aria-label={copy.primary}>{NAV_GROUPS.map(g=><div className="nav-group" key={g.id}><button aria-expanded={group===g.id} aria-controls={`nav-${g.id}`} onClick={()=>setGroup(group===g.id?null:g.id)}>{copy[g.id]} <span aria-hidden="true">⌄</span></button><ul id={`nav-${g.id}`} hidden={group!==g.id}>{g.links.map(entry=><li key={entry.path}><NavLink end={entry.path==='/'} to={entry.path}>{label(entry)}</NavLink></li>)}</ul></div>)}{COMPANY_LINKS.map(entry=><NavLink key={entry.path} to={entry.path}>{label(entry)}</NavLink>)}</nav>
 <div className="site-controls"><LanguageSwitcher/><button className="site-icon-button" aria-label={translate('openCart')} onClick={()=>{setMobile(false);setCart(true)}}><ShoppingCartIcon className="w-5 h-5"/>{totalItems>0&&<span className="cart-count">{totalItems}</span>}</button><button ref={toggle} className="site-menu-toggle site-icon-button" aria-label={mobile?copy.menuClose:copy.menuOpen} aria-expanded={mobile} aria-controls="mobile-menu" onClick={()=>setMobile(!mobile)}>{mobile?<CloseIcon className="w-5 h-5"/>:<MenuIcon className="w-5 h-5"/>}</button></div></div>
 {mobile&&<div ref={menu} id="mobile-menu" className="site-mobile-menu" onKeyDown={e=>{if(e.key!=='Tab')return;const nodes=menu.current?.querySelectorAll<HTMLElement>('a,button');if(!nodes?.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();toggle.current?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();toggle.current?.focus()}}}><nav aria-label={copy.primary}>{NAV_GROUPS.map(g=><section key={g.id}><h2>{copy[g.id]}</h2>{g.links.map(entry=><NavLink end={entry.path==='/'} to={entry.path} key={entry.path} onClick={()=>setMobile(false)}>{label(entry)}</NavLink>)}</section>)}<section>{COMPANY_LINKS.map(entry=><NavLink key={entry.path} to={entry.path} onClick={()=>setMobile(false)}>{label(entry)}</NavLink>)}</section></nav></div>}
 </header><CartModal isOpen={cart} onClose={()=>setCart(false)}/></>;
};
