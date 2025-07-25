
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_FABRICS } from '../constants';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';
import { ContentBlock } from '../components/ContentBlock';
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/Schema';
import { ManagedImage } from '../components/ManagedImage';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { translate } = useLanguage();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { totalPrice } = getCartTotal();

  const schemas = useMemo(() => {
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema()
    ];
  }, [translate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a server
    console.log("Order placed:", { cart });
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced) {
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
        heroImageSrc="https://i.postimg.cc/d0HN1V8P/IKSA-section-background-00151.webp"
        heroImageAlt={translate('thankYouForYourOrder')}
        heroPageName="Checkout"
        heroSectionTitle="Thank You Hero"
      >
          <h1 className="text-3xl md:text-4xl font-serif-display font-bold text-warm-terracotta mb-4">{translate('thankYouForYourOrder')}</h1>
          <p className="text-lg text-stone-700 mb-8">{translate('orderConfirmationMsg')}</p>
          <div className="text-center md:text-left">
            <Link to="/collections">
                <Button variant="primary">{translate('continueShopping')}</Button>
            </Link>
          </div>
      </ContentBlock>
      </>
    );
  }

  if (cart.length === 0 && !isOrderPlaced) {
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
            heroImageSrc="https://i.postimg.cc/wBTbgmRQ/IKSA-section-background-00150.webp"
            heroImageAlt={translate('yourCartIsEmpty')}
            heroPageName="Checkout"
            heroSectionTitle="Empty Cart Hero"
        >
            <h1 className="text-3xl md:text-4xl font-serif-display font-bold text-warm-terracotta mb-4">{translate('yourCartIsEmpty')}</h1>
            <p className="text-lg text-stone-700 mb-8">{translate('checkout_emptyCartMessage') || 'Add some fabric rolls to your cart to proceed.'}</p>
            <div className="text-center md:text-left">
                <Link to="/collections">
                    <Button variant="primary">{translate('discoverCollections')}</Button>
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
        heroImageSrc="https://i.postimg.cc/fRY8xvmK/IKSA-section-background-00129.webp"
        heroImageAlt={translate('checkout')}
        heroPageName="Checkout"
        heroSectionTitle="Checkout Hero"
      >
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-warm-terracotta">
          {translate('checkout')}
        </h1>
        <p className="mt-4 text-lg text-stone-700">Please provide your details to complete your professional order.</p>
      </ContentBlock>
      
      <section className="relative w-full pb-12 md:pb-16 -mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 text-left">
                {/* Shipping Form */}
                <div className="bg-white/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-stone-200/50">
                    <h2 className="text-2xl font-semibold font-serif-display text-brandAccent-700 mb-6">{translate('shippingAddress')}</h2>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('fullName')}</label>
                        <input type="text" id="fullName" name="fullName" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('address')}</label>
                        <input type="text" id="address" name="address" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                        <label htmlFor="city" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('city')}</label>
                        <input type="text" id="city" name="city" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                        </div>
                        <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('postalCode')}</label>
                        <input type="text" id="postalCode" name="postalCode" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('country')}</label>
                        <input type="text" id="country" name="country" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('phone')}</label>
                        <input type="tel" id="phone" name="phone" required className="w-full bg-stone-50/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700" />
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
                        <div key={item.fabricId} className="flex items-center justify-between pt-4 first:pt-0">
                            <div className="flex items-center">
                            <div className="w-16 h-16 mr-4 flex-shrink-0">
                                <ManagedImage 
                                    src={fabric.imageUrl} 
                                    alt={translate(fabric.nameKey)}
                                    pageName="Checkout"
                                    sectionTitle="Order Summary Item"
                                    className="w-full h-full rounded-md object-cover" 
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-stone-700">{translate(fabric.nameKey)}</p>
                                <p className="text-sm text-stone-500">{item.quantity} x ${fabric.pricePerRoll.toFixed(2)}</p>
                            </div>
                            </div>
                            <p className="font-semibold text-stone-800">${(item.quantity * fabric.pricePerRoll).toFixed(2)}</p>
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
