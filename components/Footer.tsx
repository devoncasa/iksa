import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { SOCIAL_MEDIA_LINKS } from '../constants';
import { PhoneIcon, EmailIcon, BuildingIcon } from './icons';

export const Footer: React.FC = () => {
  const { translate } = useLanguage();

  const sitemapLinks = [
    { path: '/', labelKey: 'nav.main' },
    { path: '/about-us', labelKey: 'nav.aboutUs' },
    { path: '/collections', labelKey: 'nav.collections' },
    { path: '/price-structure', labelKey: 'nav.pricing' },
    { path: '/thobe-guide', labelKey: 'nav.thobeGuide' },
    { path: '/for-artisans', labelKey: 'nav.forArtisans' },
    { path: '/artisans-tool', labelKey: 'nav.artisansTool' },
    { path: '/contact', labelKey: 'nav.contact' },
  ];

  const legalLinks = [
    { path: '#', label: 'Privacy Policy' },
    { path: '#', label: 'Terms of Service' },
    { path: '#', label: 'Shipping Policy' },
  ];

  const renderLinkColumn = (title: string, links: { path: string; label?: string; labelKey?: string }[]) => (
    <div>
      <h5 className="font-semibold text-base text-white mb-4 uppercase tracking-wider">{title}</h5>
      <ul className="space-y-2.5">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.path} 
              className="text-white hover:text-brandAccent-500 hover:underline transition-colors"
            >
              {link.label || (link.labelKey ? translate('nav', link.labelKey.split('.').pop()) : '')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-stone-900/40 backdrop-blur-xl border-t border-stone-700/50 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-10 text-sm">
          {renderLinkColumn('Sitemap', sitemapLinks)}
          {renderLinkColumn('Legal & Policies', legalLinks)}
          
          {/* Contact & Socials Section */}
          <div>
            <h5 className="font-semibold text-base text-white mb-4 uppercase tracking-wider">{translate('footer_contactTitle')}</h5>
            <ul className="space-y-3 mb-6">
              <li>
                <div className="flex items-start">
                  <BuildingIcon className="w-4 h-4 mr-2.5 mt-0.5 text-brandAccent-500 flex-shrink-0" />
                  <address className="not-italic leading-relaxed">
                    {translate('contact_addressLine1')}<br />
                    {translate('contact_addressLine2')}
                  </address>
                </div>
              </li>
              <li>
                <a href="https://wa.me/66818519922" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-brandAccent-500 hover:underline transition-colors">
                  <PhoneIcon className="w-4 h-4 mr-2.5 text-brandAccent-500 flex-shrink-0" />
                  <span>{translate('contact_whatsapp')}</span>
                </a>
              </li>
              <li>
                <a href="mailto:sales@iksa-textiles.com" className="flex items-center hover:text-brandAccent-500 hover:underline transition-colors">
                  <EmailIcon className="w-4 h-4 mr-2.5 text-brandAccent-500 flex-shrink-0" />
                  <span>sales@iksa-textiles.com</span>
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_MEDIA_LINKS.map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group transition-transform duration-200 ease-in-out hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <img 
                    src={social.icon} 
                    alt={`${social.name} logo`} 
                    className="w-7 h-7 social-icon-filter"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-sm pt-8 md:pt-10 border-t border-stone-700/50">
          <div className="flex items-center justify-center gap-3">
            <img 
              src="https://i.postimg.cc/mZSFSj42/iksa-logo.webp" 
              alt="IKSA Logo" 
              className="h-6 w-auto footer-logo-filter" 
            />
            <p>{translate('footerRights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};