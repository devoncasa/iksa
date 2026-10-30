import {trackPageView} from '../lib/analytics';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollToTop=()=>{const {pathname}=useLocation();const last=useRef('');useEffect(()=>{window.scrollTo(0,0);const path=window.location.pathname;if(last.current===path)return;const changed=!!last.current;last.current=path;if(changed)document.getElementById('main-content')?.focus({preventScroll:true});trackPageView();},[pathname]);return null;};
export default ScrollToTop;
