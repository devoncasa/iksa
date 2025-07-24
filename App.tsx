
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
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
import { GlobalBackground } from './components/GlobalBackground';

const MainLayout: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen text-stone-700 font-sans selection:bg-brandAccent-700 selection:text-white overflow-x-hidden isolate">
        <GlobalBackground />
        <Header />
        <main className="flex-grow pt-20 md:pt-24">
          <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path="/" element={<MainPage />} />
            <ReactRouterDOM.Route path="/about-us" element={<AboutUsPage />} />
            <ReactRouterDOM.Route path="/collections" element={<CollectionsPage />} />
            <ReactRouterDOM.Route path="/collections/:fabricId" element={<ProductDetailPage />} />
            <ReactRouterDOM.Route path="/price-structure" element={<PriceStructurePage />} />
            <ReactRouterDOM.Route path="/thobe-guide" element={<ThobeGuidePage />} />
            <ReactRouterDOM.Route path="/for-artisans" element={<ForArtisansPage />} />
            <ReactRouterDOM.Route path="/artisans-tool" element={<ArtisanToolPage />} />
            <ReactRouterDOM.Route path="/acquire" element={<AcquirePage />} />
            <ReactRouterDOM.Route path="/checkout" element={<CheckoutPage />} />
          </ReactRouterDOM.Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

const App: React.FC = () => {
  return (
    <ReactRouterDOM.HashRouter>
      <LanguageProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </LanguageProvider>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;