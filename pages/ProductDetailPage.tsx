

import React, { useState, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import { MOCK_FABRICS, GARMENT_CATEGORIES, GARMENT_SIZES, FEATURE_ICONS } from '../constants';
import { Fabric } from '../types';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';

const YieldEstimator: React.FC<{ fabric: Fabric }> = ({ fabric }) => {
    const { translate } = useLanguage();
    const allGarmentStyles = useMemo(() => GARMENT_CATEGORIES.flatMap(category => category.styles), []);

    const [selectedGarmentStyleId, setSelectedGarmentStyleId] = useState<string>(allGarmentStyles[0]?.id || '');
    const [selectedGarmentSize, setSelectedGarmentSize] = useState<string>(GARMENT_SIZES[0]?.key || '');
    
    const { yieldValue } = useMemo(() => {
        const garmentStyle = allGarmentStyles.find(gs => gs.id === selectedGarmentStyleId);
        if (!garmentStyle) return { yieldValue: 0, remainder: 0 };

        const baseRequirement = garmentStyle.fabricPerSize[selectedGarmentSize] || 0;
        if (baseRequirement <= 0) return { yieldValue: 0, remainder: 0 };
        
        const yieldVal = Math.floor(fabric.rollLengthInMeters / baseRequirement);
        const rem = fabric.rollLengthInMeters % baseRequirement;

        return { yieldValue: yieldVal, remainder: rem };
    }, [selectedGarmentStyleId, selectedGarmentSize, fabric.rollLengthInMeters, allGarmentStyles]);

    return (
        <div className="bg-stone-100/90 backdrop-blur-sm p-6 rounded-lg border border-stone-200/50">
            <h3 className="text-xl font-semibold text-brandAccent-700 mb-4">{translate('product_productionYieldEstimatorTitle')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="garment-style" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('chooseGarmentStyle')}</label>
                    <select id="garment-style" value={selectedGarmentStyleId} onChange={e => setSelectedGarmentStyleId(e.target.value)} className="w-full bg-white/80 border border-stone-300 rounded-md py-2 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700">
                        {GARMENT_CATEGORIES.map(category => (
                            <optgroup key={category.nameKey} label={translate(category.nameKey)}>
                                {category.styles.map(style => <option key={style.id} value={style.id}>{translate(style.nameKey)}</option>)}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="garment-size" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('chooseGarmentSize')}</label>
                    <select id="garment-size" value={selectedGarmentSize} onChange={e => setSelectedGarmentSize(e.target.value)} className="w-full bg-white/80 border border-stone-300 rounded-md py-2 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700">
                        {GARMENT_SIZES.map(size => <option key={size.key} value={size.key}>{translate(size.nameKey)}</option>)}
                    </select>
                </div>
            </div>
            <div className="text-center bg-white/80 p-4 rounded-md">
                <p className="text-stone-700">{translate('calculatorResultIntro_short') || "Estimated Yield From This Roll:"}</p>
                <p className="text-3xl font-bold text-brandAccent-800">{yieldValue} <span className="text-xl font-normal">{translate('pieces')}</span></p>
                <p className="text-xs text-stone-500 mt-1">({translate('calculatorDisclaimer')})</p>
            </div>
        </div>
    );
};

const DeepDiveTabs: React.FC<{ fabric: Fabric }> = ({ fabric }) => {
    const { translate } = useLanguage();
    const [activeTab, setActiveTab] = useState('briefing');
    
    const tabs = [
        { id: 'briefing', labelKey: 'product_tabProBriefing' },
        { id: 'notes', labelKey: 'product_tabEngineersNotes' },
        { id: 'specs', labelKey: 'product_tabSpecifications' },
    ];

    const getTranslationWithFallback = (prefix: string, key: string, fallback?: string): string => {
        const translationKey = `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}`;
        const translatedValue = translate(translationKey);
        // Check if translation exists, otherwise use fallback (like the key itself)
        return translatedValue.startsWith(prefix) ? (fallback || key) : translatedValue;
    }
    
    const renderContent = () => {
        switch (activeTab) {
            case 'briefing':
                return <p className="whitespace-pre-line leading-relaxed">{translate(fabric.professionalBriefingKey)}</p>;
            case 'notes':
                return <p className="whitespace-pre-line leading-relaxed">{translate(fabric.detailDescriptionKey)}</p>;
            case 'specs':
                const collectionsText = fabric.useCases.map(key => translate(`filterUseCase${key.charAt(0).toUpperCase() + key.slice(1)}`)).join(', ');
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <p><strong>{getTranslationWithFallback('spec_', 'width', 'Width')}:</strong> {fabric.widthInMeters}m</p>
                        <p><strong>{getTranslationWithFallback('spec_', 'finish', 'Finish')}:</strong> {getTranslationWithFallback('finish', fabric.finishKey, fabric.finishKey)}</p>
                        <p><strong>{getTranslationWithFallback('spec_', 'weight', 'Weight')}:</strong> {getTranslationWithFallback('filterWeight', fabric.weightKey, fabric.weightKey)}</p>
                        <p><strong>{getTranslationWithFallback('spec_', 'shade', 'Shade')}:</strong> {getTranslationWithFallback('filterShade', fabric.shadeKey, fabric.shadeKey)}</p>
                        <div className="sm:col-span-2 mt-4">
                            <strong>{getTranslationWithFallback('spec_', 'features', 'Features')}:</strong>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                               {fabric.features.map(featureKey => {
                                    const IconComponent = FEATURE_ICONS[featureKey];
                                    const featureText = getTranslationWithFallback('feature_', featureKey, featureKey);
                                    return IconComponent ? (
                                      <div key={featureKey} className="flex items-center"><IconComponent className="w-5 h-5 mr-2 text-brandAccent-700" /><span>{featureText}</span></div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                        <p className="sm:col-span-2 mt-4"><strong>{getTranslationWithFallback('spec_', 'useCases', 'Recommended Use Cases')}:</strong> {collectionsText}</p>
                    </div>
                );
        }
    };

    return (
        <div>
            <div className="border-b border-stone-300 mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-brandAccent-700 text-brandAccent-700' : 'border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-400'}`}>
                            {translate(tab.labelKey)}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="text-stone-700">{renderContent()}</div>
        </div>
    );
};


export const ProductDetailPage: React.FC = () => {
  const { fabricId } = ReactRouterDOM.useParams<{ fabricId: string }>();
  const fabric = MOCK_FABRICS.find(f => f.id === fabricId);
  const { translate } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(fabric?.imageUrl || '');

  React.useEffect(() => {
    setMainImage(fabric?.imageUrl || '');
  }, [fabric]);

  if (!fabric) {
    return <div className="text-center py-20">Fabric not found.</div>;
  }
  
  const handleAddToCart = () => {
    if (quantity > 0) {
        addToCart(fabric.id, quantity);
    }
  };

  return (
    <>
      <SEOMetadata
        titleKey="page_product_detail_title"
        descriptionKey="page_product_detail_description"
        keywordsKey="page_product_detail_keywords"
        pagePath={`/collections/${fabric.id}`}
        item={fabric}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="bg-white/90 p-4 rounded-lg backdrop-blur-sm">
            <div className="aspect-square bg-stone-100/90 backdrop-blur-sm rounded-lg overflow-hidden mb-4 shadow-lg">
              <img src={mainImage} alt={translate(fabric.nameKey)} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {fabric.galleryImages.map((img, idx) => (
                <button key={idx} onClick={() => setMainImage(img)} className={`aspect-square bg-stone-100/90 backdrop-blur-sm rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-brandAccent-700 ${mainImage === img ? 'ring-2 ring-brandAccent-700' : ''}`}>
                  <img src={img} alt={`${translate(fabric.nameKey)} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info, Estimator, and Purchase */}
          <div className="flex flex-col bg-white/70 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-800 mb-2">{translate(fabric.nameKey)}</h1>
            <p className="text-lg text-stone-600 mb-4">{fabric.rollLengthInMeters}m {translate('pricePerRoll')}</p>
            <p className="text-4xl font-bold text-brandAccent-800 mb-8">${fabric.pricePerRoll.toFixed(2)}</p>
            
            <YieldEstimator fabric={fabric} />

            <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center border border-stone-300 rounded-md">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-lg font-semibold text-stone-600 hover:bg-stone-100/90 rounded-l-md">-</button>
                    <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center text-lg font-semibold border-y-0 border-x text-stone-800 focus:ring-0 bg-transparent" />
                    <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-lg font-semibold text-stone-600 hover:bg-stone-100/90 rounded-r-md">+</button>
                </div>
                <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-grow">
                    {translate('addRollToCart')}
                </Button>
            </div>
          </div>
        </div>

        {/* Deep Dive Section */}
        <section className="mt-16 md:mt-20 bg-white/90 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-3xl font-serif-display font-semibold text-center text-stone-800 mb-10 section-title-underline">{translate('product_deepDiveTitle')}</h2>
            <DeepDiveTabs fabric={fabric} />
        </section>

        {/* Project Inspiration Section */}
        <section className="mt-16 md:mt-20 bg-white/70 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-3xl font-serif-display font-semibold text-center text-stone-800 mb-10 section-title-underline">{translate('product_projectInspirationTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="text-center">
                    <img src="https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp" alt="Emirati Kandura" className="rounded-lg shadow-xl mb-4" />
                    <p className="text-stone-600 italic">{translate('product_inspirationCaption').replace('{garment}', 'Emirati Kandura').replace('{fabricName}', translate(fabric.nameKey))}</p>
                </div>
                <div className="text-center">
                    <img src="https://i.postimg.cc/k4GkYyv0/inspiration-abaya.webp" alt="Luxury Abaya" className="rounded-lg shadow-xl mb-4" />
                    <p className="text-stone-600 italic">{translate('product_inspirationCaption').replace('{garment}', 'Luxury Abaya').replace('{fabricName}', translate(fabric.nameKey))}</p>
                </div>
            </div>
        </section>
      </div>
    </>
  );
};