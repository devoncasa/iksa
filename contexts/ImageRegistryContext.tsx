
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { RegisteredImage, ImageRegistryContextType, ImageRecommendation } from '../types';

export const ImageRegistryContext = createContext<ImageRegistryContextType | undefined>(undefined);

export const ImageRegistryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<RegisteredImage[]>([]);

  const isImageRegistered = useCallback((src: string) => {
    return images.some(img => img.src === src);
  }, [images]);

  const registerImage = useCallback((image: Omit<RegisteredImage, 'id' | 'recommendations'>) => {
    setImages(prevImages => {
      if (prevImages.some(img => img.src === image.src)) {
        return prevImages;
      }
      const newImage: RegisteredImage = {
        ...image,
        id: `${image.src}-${prevImages.length}`, // Simple unique ID
      };
      return [...prevImages, newImage];
    });
  }, []);

  const updateImageRecommendations = useCallback((id: string, recommendations: ImageRecommendation) => {
    setImages(prevImages =>
      prevImages.map(img =>
        img.id === id ? { ...img, recommendations } : img
      )
    );
  }, []);

  const value: ImageRegistryContextType = {
    images,
    registerImage,
    updateImageRecommendations,
    isImageRegistered
  };

  return (
    <ImageRegistryContext.Provider value={value}>
      {children}
    </ImageRegistryContext.Provider>
  );
};
