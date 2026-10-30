import {CustomerGuidance} from '../components/CustomerGuidance';
import {canSubmitEnquiry,enquiryErrors,submitEnquiry,parseEnquiryDraft} from '../lib/enquiry';
import {interactionCopy} from '../locales/interactions';
import {MOCK_FABRICS} from '../constants';
import {navigationCopy} from '../locales/navigation';
import {track} from '../lib/analytics';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { BuildingIcon, PhoneIcon, EmailIcon, ClockIcon, IconProps } from '../components/icons';
import { SEOMetadata } from '../components/SEOMetadata';
import { ContentBlock } from '../components/ContentBlock';
import { SOCIAL_MEDIA_LINKS } from '../constants';
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/Schema';
import { ManagedImage } from '../components/ManagedImage';

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
  <div className="flex items-start text-start">
    <IconComponent className="w-5 h-5 me-3 mt-1 text-brandAccent-700 flex-shrink-0" /> 
    <div>
      {displayLabel && <p className="font-semibold text-stone-700 mb-0.5">{displayLabel}</p>} 
      {href ? (
        <a href={href} className="text-stone-600 hover:text-brandAccent-700 hover:underline transition-colors duration-150 ease-in-out block break-words text-sm md:text-base"> 
          {href?.startsWith('tel:')?<bdi dir="ltr">{displayValue}</bdi>:displayValue}
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
  const { translate,language } = useLanguage();
  const [formData,setFormData]=useState<FormData>(()=>{
    let draft:Partial<FormData>={},brief='';
    try{draft=parseEnquiryDraft(sessionStorage.getItem('hithobe-enquiry-draft'));brief=sessionStorage.getItem('hithobe-enquiry-brief')||'';}catch{}
    const id=new URLSearchParams(window.location.search||'').get('fabric');
    const fabric=MOCK_FABRICS.find(item=>item.id===id);
    let message=draft.message||'';
    if(brief&&!message.includes(brief))message=[message,brief].filter(Boolean).join('\n\n');
    if(fabric&&!message.includes(fabric.id))message=[message,`${navigationCopy[language].reference}: ${fabric.id} — ${translate(fabric.nameKey)}`].filter(Boolean).join('\n\n');
    return {name:draft.name||'',email:draft.email||'',subject:draft.subject||'',message};
  });
  const copy=interactionCopy[language];
  const formRef=useRef<HTMLFormElement>(null);
  const statusRef=useRef<HTMLDivElement>(null);
  const [submissionAllowed,setSubmissionAllowed]=useState(false);
  useEffect(()=>{setSubmissionAllowed(canSubmitEnquiry(window.location.hostname));},[]);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const hasStarted=useRef(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  useEffect(()=>{if(!isSubmitted)try{sessionStorage.setItem('hithobe-enquiry-draft',JSON.stringify(formData));}catch{}},[formData,isSubmitted]);

  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.836222623386!2d100.5191733!3d13.7285517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d280a52033%3A0x2967174e3049b161!2sJewelry%20Trade%20Center!5e0!3m2!1sen!2sth!4v1716382946571!5m2!1sen!2sth";

  const schemas = useMemo(() => {
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema()
    ];
  }, [translate]);

  const validate = (): boolean => {
    const failures=enquiryErrors(formData);
    const newErrors:Partial<FormData>={};
    for(const key of Object.keys(failures) as (keyof FormData)[])newErrors[key]=translate(failures[key]==='email'?'form_error_email':'form_error_required');
    setErrors(newErrors);
    const first=Object.keys(failures)[0];
    if(first)requestAnimationFrame(()=>formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
    return !first;
  };
  useEffect(()=>{if(isSubmitted||submitError)statusRef.current?.focus();},[isSubmitted,submitError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
        setErrors(prev => ({...prev, [name]: undefined}));
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !submissionAllowed) return;
    if (validate()) {
        setIsSubmitting(true); setSubmitError(false);
        try {
          await submitEnquiry(formData,String(new FormData(event.currentTarget).get('bot-field')||''),window.location.hostname);
          setIsSubmitted(true);track('enquiry_success');try{sessionStorage.removeItem('hithobe-enquiry-brief');sessionStorage.removeItem('hithobe-enquiry-draft')}catch{}
        } catch { setSubmitError(true); } finally { setIsSubmitting(false); }
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
        pagePath="/contact"
        schemas={schemas}
      />
      <ContentBlock 
        isHero
        heroImageSrc="/images/hithobe/editorial/sample-shade-1280.webp"
        heroImageAlt={translate('contact_hero_alt')}
        heroPageName="Contact"
        heroSectionTitle="Contact Hero"
      >
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-warm-terracotta mb-8 md:mb-10 section-title-underline">
          {translate('contact_pageTitle')}
        </h1>
        <p className="text-base md:text-lg text-stone-700 leading-relaxed">
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
                <ContactInfoItem IconComponent={PhoneIcon} href="tel:+66818519922" value="+66 81 851 9922" />
                <ContactInfoItem 
                    IconComponent={ClockIcon} 
                    labelKey="contact_hoursTitle" 
                    value={`${translate('contact_hoursLine1')}\n${translate('contact_hoursLine2')}\n${translate('contact_hoursLine3')}`} 
                />
                </div>
            </div>

            {/* Contact Form Section */}
            <div>
                <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-brandAccent-700 mb-6 md:mb-8 section-title-underline">
                {translate('contact_formTitle')}
                </h2>
                {isSubmitted ? (
                    <div ref={statusRef} tabIndex={-1} role="status" className="text-center p-4 bg-brandAccent-100/80 text-brandAccent-700 rounded-md">
                        {translate('contact_form_success')}
                    </div>
                ) : (
                <form ref={formRef} aria-busy={isSubmitting} name="hithobe-enquiry" method="POST" onSubmit={handleFormSubmit} onFocus={()=>{if(!hasStarted.current){hasStarted.current=true;track('enquiry_start')}}} className="space-y-5 md:space-y-6" noValidate>
<input type="hidden" name="form-name" value="hithobe-enquiry"/><input name="bot-field" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
{!submissionAllowed && <p className="enquiry-preview-notice" role="note">{copy.previewNotice} <a href="tel:+66818519922" dir="ltr">+66 81 851 9922</a></p>}
{Object.values(errors).some(Boolean)&&<p role="alert">{copy.errorSummary}</p>}
{submitError && <div ref={statusRef} tabIndex={-1} role="alert">{translate('formSubmitError')} <a href="tel:+66818519922" dir="ltr">+66 81 851 9922</a></div>}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1.5 text-start">{translate('yourName')}</label>
                    <input type="text" name="name" id="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name?'name-error':undefined} autoComplete="name" maxLength={150} value={formData.name} onChange={handleInputChange} required className={inputClass('name')} />
                    {errors.name && <p id="name-error" className="text-red-600 text-xs mt-1 text-start">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-1.5 text-start">{translate('yourEmail')}</label>
                    <input type="email" name="email" id="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email?'email-error':undefined} autoComplete="email" inputMode="email" dir="ltr" maxLength={254} value={formData.email} onChange={handleInputChange} required className={inputClass('email')} />
                    {errors.email && <p id="email-error" className="text-red-600 text-xs mt-1 text-start">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-600 mb-1.5 text-start">{translate('subject')}</label>
                    <input type="text" name="subject" id="subject" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject?'subject-error':undefined} maxLength={200} value={formData.subject} onChange={handleInputChange} required className={inputClass('subject')} />
                    {errors.subject && <p id="subject-error" className="text-red-600 text-xs mt-1 text-start">{errors.subject}</p>}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-600 mb-1.5 text-start">{translate('yourMessage')}</label>
                    <textarea name="message" id="message" rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message?'message-error':undefined} maxLength={12000} value={formData.message} onChange={handleInputChange} required className={inputClass('message')}></textarea>
                    {errors.message && <p id="message-error" className="text-red-600 text-xs mt-1 text-start">{errors.message}</p>}
                </div>
                <div>
                    <Button disabled={isSubmitting||!submissionAllowed} type="submit" variant="primary" size="lg" fullWidth className="focus:ring-offset-white py-3.5">
                    {isSubmitting?copy.sending:translate('sendMessage')}
                    </Button>
                </div>
                </form>
                )}
            </div>
            </div>
      </ContentBlock>

        <CustomerGuidance indices={[5]} cards/>
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
                <a className="inline-block rounded-md border border-muted-gold px-5 py-2.5 hover:bg-stone-100"
                    href="https://maps.app.goo.gl/uLd8hxpGg3eUv2w1A" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    
                        {translate('getDirections')}
                </a>
            </div>
        </ContentBlock>
    </>
  );
};
