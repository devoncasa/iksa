
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
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
  const location = ReactRouterDOM.useLocation();

  const { totalItems } = getCartTotal();

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false); 
    setIsCartOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 px-1 text-sm font-medium transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brandAccent-600 focus:ring-offset-2 focus:ring-offset-creamy-beige rounded-sm
     after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 after:ease-in-out
     ${isActive
        ? 'text-white after:w-full'
        : 'text-deep-chocolate hover:text-white after:w-0 hover:after:w-full'
     }`;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-creamy-beige/75 shadow-md backdrop-blur-xl border-b border-warm-terracotta/20`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <ReactRouterDOM.Link to="/" className="relative z-10 flex items-center gap-x-3 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                <img src="https://i.postimg.cc/mZSFSj42/iksa-logo.webp" alt="IKSA Logo" className="h-11 md:h-14 w-auto" />
                <img src="https://i.postimg.cc/C5JBLh7f/iksa-name-logo.webp" alt="IKSA" className="h-7 md:h-9 w-auto" />
              </ReactRouterDOM.Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {NAV_LINKS.filter(l => l.path !== '/checkout').map((link) => (
                <ReactRouterDOM.NavLink
                  key={link.path}
                  to={link.path}
                  className={navLinkClasses}
                >
                  {translate('nav', link.labelKey)}
                </ReactRouterDOM.NavLink>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full text-deep-chocolate hover:text-white hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-creamy-beige focus:ring-white"
                aria-label="Open shopping cart"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brandAccent-600 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </button>
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  type="button"
                  className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-deep-chocolate hover:text-white hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? (
                    <CloseIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-40 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 transition-opacity"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>

        {/* Menu Panel */}
        <div className={`relative flex h-full w-full max-w-xs flex-col overflow-y-auto bg-creamy-beige pb-12 shadow-xl ml-auto transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
             <h2 className="text-lg font-semibold text-deep-chocolate">Menu</h2>
             <button
              type="button"
              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-deep-chocolate"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <CloseIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-warm-terracotta/20">
              <div className="space-y-2 py-6 px-4">
                 {NAV_LINKS.filter(l => l.path !== '/checkout').map((link) => (
                  <ReactRouterDOM.NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-md text-base font-medium transition-colors duration-150 ease-in-out ${
                        isActive
                          ? 'bg-warm-terracotta text-white'
                          : 'text-deep-chocolate hover:bg-warm-terracotta/50'
                      }`
                    }
                  >
                    {translate('nav', link.labelKey)}
                  </ReactRouterDOM.NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
