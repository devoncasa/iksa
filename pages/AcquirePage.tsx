

import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { BuildingIcon, PhoneIcon, EmailIcon, ClockIcon, IconProps } from '../components/icons';
import { SEOMetadata } from '../components/SEOMetadata';

interface ContactInfoItemProps {
  IconComponent: React.FC<IconProps>;
  label?: string;
  value?: string; // Made optional as valueKey can be used
  href?: string;
  valueKey?: string;
  labelKey?: string; 
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ IconComponent, label, value, href, valueKey, labelKey }) => {
  const { translate } = useLanguage();
  const displayLabel = labelKey ? translate(labelKey) : label;
  const displayValue = valueKey ? translate(valueKey) : value;
  
  return (
  <div className="flex items-start">
    <IconComponent className="w-5 h-5 mr-3 mt-1 text-brandAccent-700 flex-shrink-0" /> 
    <div>
      {displayLabel && <p className="font-semibold text-stone-700 mb-0.5">{displayLabel}</p>} 
      {href ? (
        <a href={href} className="text-stone-600 hover:text-brandAccent-700 hover:underline transition-colors duration-150 ease-in-out block break-words text-sm md:text-base"> 
          {displayValue}
        </a>
      ) : (
        <p className="text-stone-600 whitespace-pre-line break-words text-sm md:text-base">{displayValue}</p> 
      )}
    </div>
  </div>
  );
};

export const AcquirePage: React.FC = () => {
  const { translate } = useLanguage();
  const [name, setName] = useState('');
  const [emailContact, setEmailContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.836222623386!2d100.5191733!3d13.7285517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d280a52033%3A0x2967174e3049b161!2sJewelry%20Trade%20Center!5e0!3m2!1sen!2sth!4v1716382946571!5m2!1sen!2sth";

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, email: emailContact, message });
    setIsSubmitted(true);
    setTimeout(() => {
        setName('');
        setEmailContact('');
        setMessage('');
        setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <SEOMetadata
        titleKey="page_acquire_title"
        descriptionKey="page_acquire_description"
        keywordsKey="page_acquire_keywords"
        pagePath="/acquire"
      />
      <div className="py-12 md:py-16 transition-all duration-1000 ease-in-out">
        <div className="bg-stone-50/90 backdrop-blur-sm p-8 rounded-lg mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-stone-800 mb-8 md:mb-10 text-center section-title-underline transition-all duration-700 ease-in-out delay-100">
              {translate('acquire_pageTitle')}
            </h1>
            <p className="text-base md:text-lg text-stone-700 max-w-2xl mx-auto text-center leading-relaxed transition-all duration-700 ease-in-out delay-200">
              {translate('acquire_intro')}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Contact Information Section */}
          <section className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-stone-200/50 transition-all duration-700 ease-in-out delay-300">
            <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-brandAccent-700 mb-6 md:mb-8 section-title-underline">
              {translate('footer_contactTitle')}
            </h2>
            <div className="space-y-5 md:space-y-6">
              <ContactInfoItem 
                IconComponent={BuildingIcon} 
                labelKey="acquire_addressTitle" 
                value={`${translate('acquire_addressLine1')}\n${translate('acquire_addressLine2')}`} 
              />
              <ContactInfoItem IconComponent={PhoneIcon} href="https://wa.me/66818519922" valueKey="contact_whatsapp" />
              <ContactInfoItem IconComponent={EmailIcon} href="mailto:sales@iksa-textiles.com" value="sales@iksa-textiles.com" />
              <ContactInfoItem 
                IconComponent={ClockIcon} 
                labelKey="acquire_hoursTitle" 
                value={`${translate('acquire_hoursLine1')}\n${translate('acquire_hoursLine2')}\n${translate('acquire_hoursLine3')}`} 
              />
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-stone-200/50 transition-all duration-700 ease-in-out delay-400">
            <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-brandAccent-700 mb-6 md:mb-8 section-title-underline">
              {translate('acquire_formTitle')}
            </h2>
            {isSubmitted ? (
                <div className="text-center p-4 bg-brandAccent-100/80 text-brandAccent-700 rounded-md">
                    {translate('acquire_form_success')}
                </div>
            ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1.5">
                  {translate('yourName')}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-stone-50/80 border border-stone-300 text-stone-700 rounded-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="emailContact" className="block text-sm font-medium text-stone-600 mb-1.5">
                  {translate('yourEmail')}
                </label>
                <input
                  type="email"
                  name="emailContact"
                  id="emailContact"
                  value={emailContact}
                  onChange={(e) => setEmailContact(e.target.value)}
                  required
                  className="w-full bg-stone-50/80 border border-stone-300 text-stone-700 rounded-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-600 mb-1.5">
                  {translate('yourMessage')}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full bg-stone-50/80 border border-stone-300 text-stone-700 rounded-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors text-sm"
                ></textarea>
              </div>
              <div>
                <Button type="submit" variant="primary" size="lg" fullWidth className="focus:ring-offset-white py-3.5">
                  {translate('sendMessage')}
                </Button>
              </div>
            </form>
            )}
          </section>
        </div>

        {/* Google Maps Section */}
        <section className="mt-12 md:mt-16 transition-all duration-700 ease-in-out delay-500">
            <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-stone-200/50">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif-display font-semibold text-stone-800 mb-6 md:mb-8 text-center section-title-underline">
                {translate('acquire_mapTitle')}
              </h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg shadow-xl overflow-hidden border border-stone-200/50">
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={translate('acquire_mapTitle')}
                ></iframe>
              </div>
               <div className="mt-6 text-center">
                    <a 
                        href="https://maps.app.goo.gl/uLd8hxpGg3eUv2w1A" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" size="md" className="focus:ring-offset-white">
                            {translate('acquire_getDirections')}
                        </Button>
                    </a>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};
