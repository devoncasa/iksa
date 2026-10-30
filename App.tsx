import {imageMetadata} from './lib/imageMetadata';
import {PageWayfinding,JourneyLinks} from './components/PageNavigation';
import {EditorialGallery} from './components/EditorialGallery';
import {SEOMetadata} from './components/SEOMetadata';
import { localeFromPath, localePrefix } from './lib/language';


import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { ImageRegistryProvider } from './contexts/ImageRegistryContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { PolicyPage, NotFoundPage } from './pages/PolicyPage';
import { AtelierPage, FabricLibraryPage, TradeStudioPage, SourcingGuidePage } from './pages/DiscoveryPages';
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
import { SECTION_BACKGROUND_IMAGES, getRandomImage } from './constants';

const backgroundSource=(src:string)=>imageMetadata(src)?.srcSet?.split(', ')[0]?.split(' ')[0]||src;
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
                        backgroundImage: `url(${backgroundSource(previousUrl)})`,
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
                    backgroundImage: `url(${backgroundSource(currentUrl)})`,
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
  const {pathname}=useLocation();
  return (
    <>
      <div className="flex flex-col min-h-screen text-stone-700 font-sans selection:bg-brandAccent-700 selection:text-white overflow-x-hidden isolate">
        <DynamicBackground />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow" data-wayfinding={pathname!=='/'?'true':undefined}>
          <PageWayfinding/>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/gallery" element={<><SEOMetadata titleKey="galleryTitle" descriptionKey="galleryDescription" pagePath="/gallery"/><EditorialGallery/></>} />
            <Route path="/atelier" element={<AtelierPage />} />
            <Route path="/fabric-library" element={<FabricLibraryPage />} />
            <Route path="/trade-studio" element={<TradeStudioPage />} />
            <Route path="/sourcing-guide" element={<SourcingGuidePage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:fabricId" element={<ProductDetailPage />} />
            <Route path="/price-structure" element={<PriceStructurePage />} />
            <Route path="/thobe-guide" element={<ThobeGuidePage />} />
            <Route path="/for-artisans" element={<ForArtisansPage />} />
            <Route path="/artisans-tool" element={<ArtisanToolPage />} />
            <Route path="/contact" element={<AcquirePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/privacy" element={<PolicyPage kind="privacy" />} />
            <Route path="/terms" element={<PolicyPage kind="terms" />} />
            <Route path="/shipping" element={<PolicyPage kind="shipping" />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/admin" element={<NotFoundPage />} />
          </Routes>
          <JourneyLinks/>
        </main>
        <Footer />
      </div>
    </>
  );
}

export const AppContent = () => <>
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
 </>;

const App: React.FC = () => {
  return (
    <BrowserRouter basename={localePrefix(localeFromPath(window.location.pathname)) || '/'}>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
