
import { useContext } from 'react';
import { ImageRegistryContext } from '../contexts/ImageRegistryContext';
import { ImageRegistryContextType } from '../types';

export const useImageRegistry = (): ImageRegistryContextType => {
  const context = useContext(ImageRegistryContext);
  if (!context) {
    throw new Error('useImageRegistry must be used within an ImageRegistryProvider');
  }
  return context;
};
