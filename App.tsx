

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
    const isFirstRender = useRef(true);
    
    // Use useMemo to ensure the initial image is calculated only once.
    const initialUrl = useMemo(() => getRandomImage(SECTION_BACKGROUND_IMAGES), []);
    
    const [currentUrl, setCurrentUrl] = useState(initialUrl);
    const [previousUrl, setPreviousUrl] = useState('');

    useEffect(() => {
        // Skip the effect on the initial render to prevent an immediate background change.
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setCurrentUrl(prevUrl => {
            const newUrl = getRandomImage(SECTION_BACKGROUND_IMAGES, prevUrl);
            if (newUrl !== prevUrl) {
                setPreviousUrl(prevUrl);
            }
            return newUrl;
        });

    }, [location.pathname]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-creamy-beige">
            {/* Render the previous image with a fade-out animation */}
            {previousUrl && (
                 <div
                    key={previousUrl}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: `url(${previousUrl})`,
                        filter: 'blur(8px)',
                        transform: 'scale(1.15)',
                        animation: 'fadeOut 1.5s ease-in-out forwards'
                    }}
                />
            )}
            {/* Render the current image with a fade-in animation */}
            <div
                key={currentUrl}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: `url(${currentUrl})`,
                    filter: 'blur(8px)',
                    transform: 'scale(1.15)',
                    animation: 'fadeIn 1.5s ease-in-out forwards'
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/[.30]" />
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
