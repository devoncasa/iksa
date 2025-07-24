
import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback, ReactNode } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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
import { SECTION_BACKGROUND_IMAGES } from './constants';

// --- Static Background System ---
const DynamicBackground: React.FC = () => {
    // Select one image on component mount and memoize it to keep it static for the session.
    const selectedImageUrl = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * SECTION_BACKGROUND_IMAGES.length);
        return SECTION_BACKGROUND_IMAGES[randomIndex];
    }, []); // Empty dependency array ensures this runs only once per session.

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (selectedImageUrl) {
            const img = new Image();
            img.src = selectedImageUrl;
            img.onload = () => {
                setIsLoaded(true);
            };
            img.onerror = () => {
                console.error("Failed to load background image:", selectedImageUrl);
                // Allow content to render even if the background image fails
                setIsLoaded(true);
            };
        } else {
            // If for some reason there's no image, we are 'loaded' with no background
            setIsLoaded(true);
        }
    }, [selectedImageUrl]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-creamy-beige">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-1000 ease-in-out"
                style={{
                    backgroundImage: selectedImageUrl ? `url(${selectedImageUrl})` : 'none',
                    filter: 'blur(4px)',
                    transform: 'scale(1.15)', // Prevents blurred edges from being visible
                    opacity: isLoaded ? 1 : 0,
                }}
            >
                <div className="absolute inset-0 bg-white/[.20]" />
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
      <LanguageProvider>
        <CartProvider>
            <MainLayout />
        </CartProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;
