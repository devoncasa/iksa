import {interfaceCopy} from '../locales/interface';
import {customerGuidance} from '../locales/customerGuidance';
import {interactionCopy} from '../locales/interactions';
import {localePrefix} from '../lib/language';

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_FABRICS, COLOR_MARKUPS, COLOR_PALETTE } from '../constants';
import { cartLineKey, cartUnitPrice } from '../lib/cart';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';
import { ContentBlock } from '../components/ContentBlock';
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/Schema';
import { ManagedImage } from '../components/ManagedImage';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal } = useCart();
  const { translate, language } = useLanguage();
  const [briefError,setBriefError]=useState(false);
  const { totalPrice } = getCartTotal();

  const schemas = useMemo(() => {
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema()
    ];
  }, [translate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const customer = Array.from(new FormData(form).entries()).map(([key, value]) => `${translate(key)}: ${value}`).join('\n');
    const lines = cart.map(item => {
      const fabric = MOCK_FABRICS.find(f => f.id === item.fabricId)!;
      return `${translate(fabric.nameKey)} | ${translate(COLOR_PALETTE[item.color??'white']?.nameKey)} | ${item.quantity} ${interfaceCopy[language].rolls} | USD ${(item.quantity * cartUnitPrice(fabric, item.color, COLOR_MARKUPS)).toFixed(2)}`;
    }).join('\n');
    const body = `${customer}\n\n${lines}\n\n${translate('subtotal')}: USD ${totalPrice.toFixed(2)}\n${customerGuidance[language].questions[5][1]}`;
    try { sessionStorage.setItem('hithobe-enquiry-brief',body); } catch { setBriefError(true); return; }
    window.location.assign(`${localePrefix(language)}/contact`);

  };

  if (cart.length === 0) {
    return (
      <>
        <SEOMetadata
            titleKey="page_checkout_title"
            descriptionKey="page_checkout_description"
            pagePath="/checkout"
            schemas={schemas}
        />
        <ContentBlock 
            isHero
            heroImageSrc="/images/hithobe/editorial/drape-taupe-1280.webp"
            heroImageAlt={translate('yourCartIsEmpty')}
            heroPageName="Checkout"
            heroSectionTitle="Empty Cart Hero"
        >
            <h1 className="text-3xl md:text-4xl font-serif-display font-bold text-warm-terracotta mb-4">{translate('yourCartIsEmpty')}</h1>
            <p className="text-lg text-stone-700 mb-8">{translate('checkout_emptyCartMessage') || 'Add some fabric rolls to your cart to proceed.'}</p>
            <div className="text-center md:text-start">
                <Link to="/collections">
                    <Button as="span" variant="primary">{translate('discoverCollections')}</Button>
                </Link>
            </div>
      </ContentBlock>
      </>
    );
  }

  return (
    <>
      <SEOMetadata
        titleKey="page_checkout_title"
        descriptionKey="page_checkout_description"
        pagePath="/checkout"
        schemas={schemas}
      />
      <ContentBlock 
        isHero
        heroImageSrc="/images/hithobe/editorial/drape-white-1280.webp"
        heroImageAlt={translate('checkout')}
        heroPageName="Checkout"
        heroSectionTitle="Checkout Hero"
      >
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-warm-terracotta">
          {translate('checkout')}
        </h1>
        <p className="mt-4 text-lg text-stone-700">{translate('checkout_intro')}</p>
      </ContentBlock>
      
      <section className="relative w-full pb-4 md:pb-6 mt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 text-start">
                {/* Shipping Form */}
                <div className="bg-white/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-stone-200/50">
                    <h2 className="text-2xl font-semibold font-serif-display text-brandAccent-700 mb-6">{translate('shippingAddress')}</h2>
                    <p role="alert">{briefError?interactionCopy[language].briefFailure:''}</p>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('fullName')}</label>
                        <input type="text" id="fullName" autoComplete="name" name="fullName" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('address')}</label>
                        <input type="text" id="address" autoComplete="street-address" name="address" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                        <label htmlFor="city" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('city')}</label>
                        <input type="text" id="city" autoComplete="address-level2" name="city" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                        </div>
                        <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('postalCode')}</label>
                        <input type="text" id="postalCode" autoComplete="postal-code" name="postalCode" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('country')}</label>
                        <input type="text" id="country" autoComplete="country-name" name="country" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('phone')}</label>
                        <input type="tel" id="phone" autoComplete="tel" name="phone" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                    </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-white/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-stone-200/50">
                    <h2 className="text-2xl font-semibold font-serif-display text-brandAccent-700 mb-6">{translate('orderSummary')}</h2>
                    <div className="space-y-4 divide-y divide-stone-200/50">
                    {cart.map(item => {
                        const fabric = MOCK_FABRICS.find(f => f.id === item.fabricId);
                        if (!fabric) return null;
                        return (
                        <div key={cartLineKey(item)} className="flex items-center justify-between pt-4 first:pt-0">
                            <div className="flex items-center">
                            <div className="w-16 h-16 me-4 flex-shrink-0 rounded-lg border-2 border-muted-gold/50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-muted-gold/30 hover:-translate-y-0.5 overflow-hidden">
                                <ManagedImage 
                                    src={fabric.imageUrl} 
                                    alt={translate(fabric.nameKey)}
                                    pageName="Checkout"
                                    sectionTitle="Order Summary Item"
                                    className="w-full h-full rounded-md object-cover" 
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-stone-700">{translate(fabric.nameKey)} · {translate(COLOR_PALETTE[item.color ?? 'white']?.nameKey)}</p>
                                <p className="text-sm text-stone-500">{item.quantity} {translate('rolls')} x ${cartUnitPrice(fabric, item.color, COLOR_MARKUPS).toFixed(2)}</p>
                            </div>
                            </div>
                            <p className="font-semibold text-stone-800">${(item.quantity * cartUnitPrice(fabric, item.color, COLOR_MARKUPS)).toFixed(2)}</p>
                        </div>
                        );
                    })}
                    </div>
                    <div className="mt-6 pt-6 border-t border-stone-300/50">
                    <div className="flex justify-between items-center text-lg">
                        <p className="font-semibold text-stone-700">{translate('total')}</p>
                        <p className="font-bold text-2xl text-brandAccent-800">${totalPrice.toFixed(2)}</p>
                    </div>
                    </div>
                    <Button type="submit" form="checkout-form" fullWidth size="lg" className="mt-8">
                    {translate('placeOrder')}
                    </Button>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};
