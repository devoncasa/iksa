
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

// --- Dynamic Background System ---
const HERO_BACKGROUND_IMAGE = 'https://i.postimg.cc/FK3XkcH5/IKSA-section-background-0011.webp';

interface BackgroundContextType {
    activeImageUrl: string;
    registerSection: () => string;
    setActiveImageUrl: (url: string) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const useBackground = () => {
    const context = useContext(BackgroundContext);
    if (!context) {
        throw new Error("useBackground must be used within a BackgroundProvider");
    }
    return context;
};

const shuffleArray = (array: string[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const otherShuffledImages = useMemo(() => {
        const otherImages = SECTION_BACKGROUND_IMAGES.filter(img => img !== HERO_BACKGROUND_IMAGE);
        return shuffleArray(otherImages);
    }, []);
    const [activeImageUrl, setActiveImageUrl] = useState(HERO_BACKGROUND_IMAGE);
    const imageCounter = useRef(0);
    const heroRegistered = useRef(false);

    const registerSection = useCallback(() => {
        if (!heroRegistered.current) {
            heroRegistered.current = true;
            return HERO_BACKGROUND_IMAGE;
        }
        
        const imageUrl = otherShuffledImages[imageCounter.current % otherShuffledImages.length];
        imageCounter.current++;
        return imageUrl;
    }, [otherShuffledImages]);

    useEffect(() => {
        // Preload non-hero images in the background
        otherShuffledImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, [otherShuffledImages]);

    const value = { activeImageUrl, registerSection, setActiveImageUrl };

    return (
        <BackgroundContext.Provider value={value}>
            {children}
        </BackgroundContext.Provider>
    );
};

const DynamicBackground: React.FC = () => {
    const { activeImageUrl } = useBackground();
    const [current, setCurrent] = useState({ url: activeImageUrl, key: 0 });
    const [previous, setPrevious] = useState({ url: '', key: -1 });

    // Ref to track the URL we are currently loading, to prevent race conditions
    const loadingUrlRef = useRef<string | null>(null);

    useEffect(() => {
        // Only trigger if there's a new URL that we aren't already loading and is not the current one
        if (activeImageUrl && activeImageUrl !== current.url && activeImageUrl !== loadingUrlRef.current) {
            loadingUrlRef.current = activeImageUrl;
            const img = new Image();
            img.src = activeImageUrl;
            
            img.onload = () => {
                // Check if the loaded image is still the one we want.
                // This prevents race conditions if the user scrolls quickly.
                if (img.src === loadingUrlRef.current) {
                    setPrevious(current);
                    setCurrent({ url: img.src, key: current.key + 1 });
                    loadingUrlRef.current = null;
                }
            };
            img.onerror = () => {
                console.error("Failed to load background image:", activeImageUrl);
                // If loading fails, clear the loading ref so we can try again for this URL
                if (activeImageUrl === loadingUrlRef.current) {
                    loadingUrlRef.current = null;
                }
            };
        }
    }, [activeImageUrl, current]);

    const BgLayer: React.FC<{ url: string; active: boolean }> = ({ url, active }) => (
        <div
            className="absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1000 ease-in-out"
            style={{
                backgroundImage: url ? `url(${url})` : 'none',
                filter: 'blur(8px)',
                transform: 'scale(1.15)',
                opacity: active ? 1 : 0,
            }}
        >
            <div className="absolute inset-0 bg-white/30" />
        </div>
    );

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-creamy-beige">
            {/* The previous image is rendered but with active=false, so it fades out */}
            {previous.url && <BgLayer key={previous.key} url={previous.url} active={false} />}
            {/* The current image is rendered with active=true, so it fades in */}
            {current.url && <BgLayer key={current.key} url={current.url} active={true} />}
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
            <BackgroundProvider>
                <MainLayout />
            </BackgroundProvider>
        </CartProvider>
      </LanguageProvider>
    </HashRouter>
  );
};

export default App;
