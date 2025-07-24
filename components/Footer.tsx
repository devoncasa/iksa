

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { NAV_LINKS } from '../constants';
import { PhoneIcon, EmailIcon, BuildingIcon } from './icons';

export const Footer: React.FC = () => {
  const { translate } = useLanguage();
  const accountId = "iksatextile";
  const socialMedia = [
    { name: 'Facebook', icon: 'https://i.postimg.cc/YCMfNbVb/facebook.webp', url: `https://facebook.com/${accountId}` },
    { name: 'Instagram', icon: 'https://i.postimg.cc/P5ybS1nh/instagram.webp', url: `https://instagram.com/${accountId}` },
    { name: 'TikTok', icon: 'https://i.postimg.cc/cJJR26d3/tiktok.webp', url: `https://tiktok.com/@${accountId}` },
    { name: 'YouTube', icon: 'https://i.postimg.cc/hG3LBgG5/youtube.webp', url: `https://youtube.com/@${accountId}` },
    { name: 'LinkedIn', icon: 'https://i.postimg.cc/bNXRrzRX/linkedin.webp', url: `https://linkedin.com/company/${accountId}` },
    { name: 'Twitter', icon: 'https://i.postimg.cc/632d6S25/twitter.webp', url: `https://twitter.com/${accountId}` },
    { name: 'Pinterest', icon: 'https://i.postimg.cc/JnfjsqZ3/pinterest.webp', url: `https://pinterest.com/${accountId}` },
  ];

  return (
    <footer className="bg-stone-900/40 backdrop-blur-xl border-t border-stone-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-10 text-sm">
          {/* Sitemap Section */}
          <div>
            <h5 className="font-semibold text-base text-stone-300 mb-4 uppercase tracking-wider">{translate('footer_sitemapTitle')}</h5>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <ReactRouterDOM.Link 
                    to={link.path} 
                    className="text-stone-400 hover:text-brandAccent-500 hover:underline transition-colors"
                  >
                    {translate('nav', link.labelKey)}
                  </ReactRouterDOM.Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h5 className="font-semibold text-base text-stone-300 mb-4 uppercase tracking-wider">{translate('footer_contactTitle')}</h5>
            <ul className="space-y-3">
              <li>
                <a href="https://wa.me/66818519922" target="_blank" rel="noopener noreferrer" className="flex items-center text-stone-400 hover:text-brandAccent-500 hover:underline transition-colors">
                  <PhoneIcon className="w-4 h-4 mr-2.5 text-brandAccent-500 flex-shrink-0" />
                  <span>{translate('contact_whatsapp')}</span>
                </a>
              </li>
              <li>
                <a href="mailto:sales@iksa-textiles.com" className="flex items-center text-stone-400 hover:text-brandAccent-500 hover:underline transition-colors">
                  <EmailIcon className="w-4 h-4 mr-2.5 text-brandAccent-500 flex-shrink-0" />
                  <span>sales@iksa-textiles.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Our Office Section */}
          <div>
            <h5 className="font-semibold text-base text-stone-300 mb-4 uppercase tracking-wider">{translate('footer_addressTitle')}</h5>
            <div className="flex items-start text-stone-400">
              <BuildingIcon className="w-4 h-4 mr-2.5 mt-0.5 text-brandAccent-500 flex-shrink-0" />
              <address className="not-italic leading-relaxed">
                {translate('acquire_addressLine1')}<br />
                {translate('acquire_addressLine2')}
              </address>
            </div>
          </div>
          
          {/* Social Media Section */}
          <div>
            <h5 className="font-semibold text-base text-stone-300 mb-4 uppercase tracking-wider">{translate('footer_followUsTitle')}</h5>
            <div className="flex flex-wrap gap-3">
              {socialMedia.map(social => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-brandAccent-500 transition-transform duration-200 ease-in-out hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <img src={social.icon} alt={`${social.name} logo`} className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="text-center text-sm text-stone-500 pt-8 md:pt-10 border-t border-stone-700/50">
          <div className="flex items-center justify-center gap-2">
            <img src="https://i.postimg.cc/mZSFSj42/iksa-logo.webp" alt="IKSA Logo" className="h-5 w-auto" />
            <p>{translate('footerRights')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};