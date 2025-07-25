
import React, { createContext, useState, ReactNode } from 'react';
import { AdminAuthContextType } from '../types';

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (password: string): boolean => {
    // This is a simple, non-secure password check for demonstration purposes.
    // In a real application, this should be handled by a secure backend authentication system.
    if (password === '0007') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const value = { isAdmin, login, logout };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
