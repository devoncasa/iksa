
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_FABRICS } from '../constants';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { translate } = useLanguage();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { totalPrice } = getCartTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a server
    console.log("Order placed:", { cart });
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif-display font-bold text-brandAccent-700 mb-4">{translate('thankYouForYourOrder')}</h1>
          <p className="text-lg text-stone-700 mb-8">{translate('orderConfirmationMsg')}</p>
          <ReactRouterDOM.Link to="/collections">
            <Button variant="primary">{translate('continueShopping')}</Button>
          </ReactRouterDOM.Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !isOrderPlaced) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif-display font-bold text-stone-800 mb-4">{translate('yourCartIsEmpty')}</h1>
              <p className="text-lg text-stone-700 mb-8">{translate('checkout_emptyCartMessage') || 'Add some fabric rolls to your cart to proceed.'}</p>
              <ReactRouterDOM.Link to="/collections">
                  <Button variant="primary">{translate('discoverCollections')}</Button>
              </ReactRouterDOM.Link>
            </div>
      </div>
    );
  }

  return (
    <>
      <SEOMetadata
        titleKey="page_checkout_title"
        descriptionKey="page_checkout_description"
        keywordsKey="page_checkout_keywords"
        pagePath="/checkout"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-stone-800 mb-12 text-center section-title-underline">
          {translate('checkout')}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Shipping Form */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-stone-200/50">
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
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-stone-200/50">
            <h2 className="text-2xl font-semibold font-serif-display text-brandAccent-700 mb-6">{translate('orderSummary')}</h2>
            <div className="space-y-4 divide-y divide-stone-200/50">
              {cart.map(item => {
                const fabric = MOCK_FABRICS.find(f => f.id === item.fabricId);
                if (!fabric) return null;
                return (
                  <div key={item.fabricId} className="flex items-center justify-between pt-4 first:pt-0">
                    <div className="flex items-center">
                      <img src={fabric.imageUrl} alt={translate(fabric.nameKey)} className="w-16 h-16 rounded-md object-cover mr-4" />
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
    </>
  );
};
