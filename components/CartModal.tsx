
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_FABRICS } from '../constants';
import { Button } from './Button';
import { CloseIcon, TrashIcon } from './icons';
import { ManagedImage } from './ManagedImage';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { translate } = useLanguage();
  const navigate = useNavigate();

  const { totalPrice } = getCartTotal();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cartModalTitle"
    >
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-stone-50/60 backdrop-blur-xl shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-200/50">
          <h2 id="cartModalTitle" className="text-2xl font-serif-display font-semibold text-stone-800">
            {translate('shoppingCart')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-600 hover:bg-stone-200/50 focus:outline-none focus:ring-2 focus:ring-brandAccent-700"
            aria-label="Close cart"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-stone-500 py-20">
              <p>{translate('yourCartIsEmpty')}</p>
            </div>
          ) : (
            <ul className="divide-y divide-stone-200/50">
              {cart.map(item => {
                const fabric = MOCK_FABRICS.find(f => f.id === item.fabricId);
                if (!fabric) return null;

                return (
                  <li key={item.fabricId} className="py-4 flex">
                    <div className="h-20 w-20 mr-4 flex-shrink-0">
                      <ManagedImage 
                          src={fabric.imageUrl} 
                          alt={translate(fabric.nameKey)} 
                          pageName="Cart Modal"
                          sectionTitle={`Cart Item: ${translate(fabric.nameKey)}`}
                          className="h-full w-full rounded-md object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-stone-700">{translate(fabric.nameKey)}</h3>
                      <p className="text-sm text-stone-500">{fabric.rollLengthInMeters}m / Roll</p>
                      <p className="text-sm font-semibold text-brandAccent-700">${fabric.pricePerRoll.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between ml-4">
                      <div className="flex items-center border border-stone-300 rounded-md bg-white/50">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.fabricId, parseInt(e.target.value, 10))}
                          className="w-12 text-center bg-transparent border-none focus:ring-0 text-sm"
                          aria-label={`Quantity for ${translate(fabric.nameKey)}`}
                        />
                      </div>
                       <button onClick={() => removeFromCart(item.fabricId)} className="text-stone-500 hover:text-red-600 transition-colors">
                          <TrashIcon className="w-5 h-5" />
                       </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-200/50 bg-white/70">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-stone-700">{translate('subtotal')}</span>
              <span className="text-2xl font-bold text-brandAccent-800">${totalPrice.toFixed(2)}</span>
            </div>
            <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
              {translate('proceedToCheckout')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
