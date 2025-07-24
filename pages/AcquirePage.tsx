

import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { BuildingIcon, PhoneIcon, EmailIcon, ClockIcon, IconProps } from '../components/icons';
import { SEOMetadata } from '../components/SEOMetadata';
import { ContentBlock } from '../components/ContentBlock';
import { SOCIAL_MEDIA_LINKS } from '../constants';

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
  <div className="flex items-start text-left">
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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const AcquirePage: React.FC = () => {
  const { translate } = useLanguage();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: ''});
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.836222623386!2d100.5191733!3d13.7285517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d280a52033%3A0x2967174e3049b161!2sJewelry%20Trade%20Center!5e0!3m2!1sen!2sth!4v1716382946571!5m2!1sen!2sth";

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = translate('form_error_required');
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = translate('form_error_required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = translate('form_error_email');
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = translate('form_error_required');
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = translate('form_error_required');
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
        console.log("Form Submitted:", formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitted(false);
        }, 3000);
    }
  };

  const inputClass = (field: keyof FormData) => 
    `w-full bg-stone-50/80 border text-stone-700 rounded-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-all text-sm duration-150 ease-in-out hover:border-brandAccent-600 focus:shadow-md ${
      errors[field] ? 'border-red-500' : 'border-stone-300'
    }`;
  
  return (
    <>
      <SEOMetadata
        titleKey="page_contact_title"
        descriptionKey="page_contact_description"
        keywordsKey="page_contact_keywords"
        pagePath="/contact"
      />
      <ContentBlock isHero>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-stone-800 mb-8 md:mb-10 text-center section-title-underline">
          {translate('contact_pageTitle')}
        </h1>
        <p className="text-base md:text-lg text-stone-700 max-w-2xl mx-auto text-center leading-relaxed">
          {translate('contact_intro')}
        </p>
      </ContentBlock>

      <ContentBlock>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Contact Information Section */}
            <div>
                <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-brandAccent-700 mb-6 md:mb-8 section-title-underline">
                {translate('footer_contactTitle')}
                </h2>
                <div className="space-y-5 md:space-y-6">
                <ContactInfoItem 
                    IconComponent={BuildingIcon} 
                    labelKey="contact_addressTitle" 
                    value={`${translate('contact_addressLine1')}\n${translate('contact_addressLine2')}`} 
                />
                <ContactInfoItem IconComponent={PhoneIcon} href="https://wa.me/66818519922" valueKey="contact_whatsapp" />
                <ContactInfoItem IconComponent={EmailIcon} href="mailto:sales@iksa-textiles.com" value="sales@iksa-textiles.com" />
                <ContactInfoItem 
                    IconComponent={ClockIcon} 
                    labelKey="contact_hoursTitle" 
                    value={`${translate('contact_hoursLine1')}\n${translate('contact_hoursLine2')}\n${translate('contact_hoursLine3')}`} 
                />
                </div>
                <div className="mt-8 md:mt-10">
                    <h3 className="text-lg font-semibold text-brandAccent-700 mb-4">{translate('footer_followUsTitle')}</h3>
                    <div className="flex flex-wrap gap-4">
                        {SOCIAL_MEDIA_LINKS.map(social => (
                            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                            className="text-stone-400 hover:text-brandAccent-500 transition-transform duration-200 ease-in-out hover:scale-110"
                            aria-label={`Follow us on ${social.name}`}>
                                <img src={social.icon} alt={`${social.name} logo`} className="w-8 h-8" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div>
                <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-brandAccent-700 mb-6 md:mb-8 section-title-underline">
                {translate('contact_formTitle')}
                </h2>
                {isSubmitted ? (
                    <div className="text-center p-4 bg-brandAccent-100/80 text-brandAccent-700 rounded-md">
                        {translate('contact_form_success')}
                    </div>
                ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 md:space-y-6" noValidate>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1.5 text-left">{translate('yourName')}</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className={inputClass('name')} />
                    {errors.name && <p className="text-red-600 text-xs mt-1 text-left">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-1.5 text-left">{translate('yourEmail')}</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className={inputClass('email')} />
                    {errors.email && <p className="text-red-600 text-xs mt-1 text-left">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-600 mb-1.5 text-left">{translate('subject')}</label>
                    <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange} required className={inputClass('subject')} />
                    {errors.subject && <p className="text-red-600 text-xs mt-1 text-left">{errors.subject}</p>}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-600 mb-1.5 text-left">{translate('yourMessage')}</label>
                    <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleInputChange} required className={inputClass('message')}></textarea>
                    {errors.message && <p className="text-red-600 text-xs mt-1 text-left">{errors.message}</p>}
                </div>
                <div>
                    <Button type="submit" variant="primary" size="lg" fullWidth className="focus:ring-offset-white py-3.5">
                    {translate('sendMessage')}
                    </Button>
                </div>
                </form>
                )}
            </div>
            </div>
      </ContentBlock>

        {/* Google Maps Section */}
        <ContentBlock>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif-display font-semibold text-stone-800 mb-6 md:mb-8 text-center section-title-underline">
                {translate('contact_mapTitle')}
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
                title={translate('contact_mapTitle')}
            ></iframe>
            </div>
            <div className="mt-6 text-center">
                <a 
                    href="https://maps.app.goo.gl/uLd8hxpGg3eUv2w1A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <Button variant="outline" size="md" className="focus:ring-offset-white">
                        {translate('contact_getDirections')}
                    </Button>
                </a>
            </div>
        </ContentBlock>
    </>
  );
};