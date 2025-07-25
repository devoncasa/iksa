
import { useContext } from 'react';
import { AdminAuthContext } from '../contexts/AdminAuthContext';
import { AdminAuthContextType } from '../types';

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
