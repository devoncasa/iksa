
import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { CartItem, CartContextType } from '../types';
import { MOCK_FABRICS, COLOR_MARKUPS } from '../constants';
import { addCartLine, cartLineKey, cartTotals, normalizeCart, updateCartLine } from '../lib/cart';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const localData = (window.localStorage.getItem('hithobeCart') || window.localStorage.getItem('iksaCart'));
      return normalizeCart(localData ? JSON.parse(localData) : [], MOCK_FABRICS);
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('hithobeCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = (fabricId: string, quantity: number, color = 'white') => {
    setCart(previous => addCartLine(previous, { fabricId, quantity, color }, MOCK_FABRICS));
  };

  const updateQuantity = (fabricId: string, quantity: number, color = 'white') => {
    setCart(previous => updateCartLine(previous, cartLineKey({ fabricId, quantity, color }), quantity));
  };

  const removeFromCart = (fabricId: string, color = 'white') => {
    setCart(previous => previous.filter(item => cartLineKey(item) !== cartLineKey({ fabricId, color, quantity: 1 })));
  };

  const clearCart = () => setCart([]);
  const getCartTotal = useMemo(() => () => cartTotals(cart, MOCK_FABRICS, COLOR_MARKUPS), [cart]);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
