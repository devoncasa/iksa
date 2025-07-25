

import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback, ReactNode } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { ImageRegistryProvider } from './contexts/ImageRegistryContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { MainPage } from './pages/MainPage'; 
import { AboutUsPage } from './pages/AboutUsPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ThobeGuidePage } from './pages/ThobeGuidePage';
import { ForArtisansPage } from './pages/ForArtisansPage';
import { ArtisanToolPage } from './pages/ArtisanToolPage';
import { AcquirePage } from './pages/AcquirePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PriceStructurePage } from './pages/PriceStructurePage';
import { AdminPage } from './pages/admin/AdminPage';
import { SECTION_BACKGROUND_IMAGES, getRandomImage } from './constants';

// --- Dynamic Background System ---
const DynamicBackground: React.FC = () => {
    const location = useLocation();
    const [displayUrl, setDisplayUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const currentUrlRef = useRef('');

    useEffect(() => {
        // When navigation happens, get a new image that's different from the current one.
        const newUrl = getRandomImage(SECTION_BACKGROUND_IMAGES, currentUrlRef.current);
        
        // Start the fade-out transition
        setIsLoaded(false);

        // Preload the new image.
        const img = new Image();
        img.src = newUrl;
        
        img.onload = () => {
            // Once loaded, set it as the new display URL.
            // A short delay can make the fade-out/fade-in transition appear smoother.
            setTimeout(() => {
                currentUrlRef.current = newUrl;
                setDisplayUrl(newUrl);
                setIsLoaded(true); // Trigger fade-in
            }, 300);
        };
        
        img.onerror = () => {
            console.error("Failed to load background image:", newUrl);
            // If there's an error, just fade the current image back in.
            setIsLoaded(true);
        };
    }, [location.pathname]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-creamy-beige">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out"
                style={{
                    backgroundImage: displayUrl ? `url(${displayUrl})` : 'none',
                    filter: 'blur(8px)',
                    transform: 'scale(1.15)', // Prevents blurred edges from being visible
                    opacity: isLoaded ? 1 : 0,
                }}
            >
                <div className="absolute inset-0 bg-white/[.30]" />
            </div>
        </div>
    );
};


// --- App Structure ---

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen text-stone-700 font-sans selection:bg-brandAccent-700 selection:text-white overflow-x-hidden isolate">
        <DynamicBackground />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:fabricId" element={<ProductDetailPage />} />
            <Route path="/price-structure" element={<PriceStructurePage />} />
            <Route path="/thobe-guide" element={<ThobeGuidePage />} />
            <Route path="/for-artisans" element={<ForArtisansPage />} />
            <Route path="/artisans-tool" element={<ArtisanToolPage />} />
            <Route path="/contact" element={<AcquirePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <LanguageProvider>
        <AdminAuthProvider>
          <CartProvider>
            <ImageRegistryProvider>
              <MainLayout />
            </ImageRegistryProvider>
          </CartProvider>
        </AdminAuthProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;
