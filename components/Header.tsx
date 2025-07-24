
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import { NAV_LINKS } from '../constants';
import { CloseIcon, MenuIcon, ShoppingCartIcon } from './icons'; 
import { CartModal } from './CartModal';

export const Header: React.FC = () => {
  const { translate } = useLanguage();
  const { getCartTotal } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { totalItems } = getCartTotal();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false); 
    setIsCartOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 px-1 text-sm font-medium transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brandAccent-700 focus:ring-offset-2 focus:ring-offset-current rounded-sm
     after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:transition-all after:duration-300 after:ease-in-out
     after:bg-brandAccent-500 lg:after:bg-brandAccent-600
     ${isActive
        ? 'text-white lg:text-stone-500 after:w-full'
        : 'text-stone-300 lg:text-deep-chocolate after:w-0 hover:text-white hover:after:w-full'
     }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block py-3 px-4 rounded-md text-base font-medium transition-colors duration-200
     ${isActive
        ? 'bg-brandAccent-700 text-white'
        : 'text-stone-200 hover:bg-stone-700 hover:text-white'
     }`;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out lg:bg-brandAccent-500/90 lg:backdrop-blur-lg ${
          isScrolled || isMobileMenuOpen
            ? 'bg-stone-800/80 backdrop-blur-lg shadow-lg lg:bg-brandAccent-500/90'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 bg-white/[.95] p-2.5 rounded-xl backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md" aria-label="IKSA Home">
                <img src="https://i.postimg.cc/mZSFSj42/iksa-logo.webp" alt="IKSA Logo" className="h-10 w-auto" />
                <img src="https://i.postimg.cc/C5JBLh7f/iksa-name-logo.webp" alt="IKSA Name" className="h-5 w-auto hidden sm:block" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:space-x-4 xl:space-x-6 items-center">
              {NAV_LINKS.map(link => (
                <NavLink key={link.path} to={link.path} className={navLinkClasses}>
                  {translate('nav', link.labelKey)}
                </NavLink>
              ))}
            </nav>

            {/* Icons and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-stone-300 lg:text-deep-chocolate hover:text-white hover:bg-stone-700/50 lg:hover:bg-brandAccent-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-800 lg:focus:ring-offset-brandAccent-100 focus:ring-white transition-colors"
                aria-label="Open shopping cart"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brandAccent-600 text-white text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <div className="lg:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-stone-300 hover:text-white hover:bg-stone-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-stone-800/95 backdrop-blur-lg" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={mobileNavLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {translate('nav', link.labelKey)}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
