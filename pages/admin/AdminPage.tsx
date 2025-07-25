
import React from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { AdminAuth } from './AdminAuth';
import { ImageReport } from './ImageReport';

export const AdminPage: React.FC = () => {
  const { isAdmin } = useAdminAuth();

  return isAdmin ? <ImageReport /> : <AdminAuth />;
};
