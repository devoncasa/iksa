
import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { CartItem, CartContextType } from '../types';
import { MOCK_FABRICS } from '../constants';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const localData = window.localStorage.getItem('iksaCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('iksaCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = (fabricId: string, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.fabricId === fabricId);
      if (existingItem) {
        return prevCart.map(item =>
          item.fabricId === fabricId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { fabricId, quantity }];
    });
  };

  const updateQuantity = (fabricId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(fabricId);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.fabricId === fabricId ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (fabricId: string) => {
    setCart(prevCart => prevCart.filter(item => item.fabricId !== fabricId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = useMemo(() => () => {
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(cartItem => {
      const fabric = MOCK_FABRICS.find(f => f.id === cartItem.fabricId);
      if (fabric) {
        totalItems += cartItem.quantity;
        totalPrice += fabric.pricePerRoll * cartItem.quantity;
      }
    });

    return { totalItems, totalPrice };
  }, [cart]);

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
