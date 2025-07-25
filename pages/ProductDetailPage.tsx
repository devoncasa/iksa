
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import { MOCK_FABRICS, GARMENT_STYLES_ADVANCED, GARMENT_SIZES_ADVANCED, FEATURE_ICONS, COLOR_PALETTE, COLOR_MARKUPS } from '../constants';
import { Fabric, Breadcrumb } from '../types';
import { Button } from '../components/Button';
import { SEOMetadata } from '../components/SEOMetadata';
import { ContentBlock } from '../components/ContentBlock';
import { generateOrganizationSchema, generateWebsiteSchema, generateBreadcrumbSchema, generateProductSchema } from '../components/Schema';
import { ManagedImage } from '../components/ManagedImage';


const YieldEstimator: React.FC<{ fabric: Fabric }> = ({ fabric }) => {
    const { translate } = useLanguage();
    const [selectedGarmentId, setSelectedGarmentId] = useState<string>(GARMENT_STYLES_ADVANCED[0].id);
    const [selectedSizeKey, setSelectedSizeKey] = useState<string>('M');

    const { yieldValue } = useMemo(() => {
        const garmentStyle = GARMENT_STYLES_ADVANCED.find(g => g.id === selectedGarmentId);
        const size = GARMENT_SIZES_ADVANCED.find(s => s.key === selectedSizeKey);
        
        if (!garmentStyle || !size) return { yieldValue: 0 };

        const fabricPerGarment = garmentStyle.baseRequirement * size.multiplier;
        if (fabricPerGarment <= 0) return { yieldValue: 0 };

        const yieldVal = Math.floor(fabric.rollLengthInMeters / fabricPerGarment);
        return { yieldValue: yieldVal };
    }, [selectedGarmentId, selectedSizeKey, fabric.rollLengthInMeters]);

    return (
        <div className="bg-stone-100/90 backdrop-blur-sm p-6 rounded-lg border border-stone-200/50">
            <h3 className="text-xl font-semibold text-brandAccent-700 mb-4">{translate('product_productionYieldEstimatorTitle')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="garment-style" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('chooseGarmentStyle')}</label>
                    <select id="garment-style" value={selectedGarmentId} onChange={e => setSelectedGarmentId(e.target.value)} className="w-full bg-white/80 border border-stone-300 text-stone-800 rounded-md py-2 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors duration-150 ease-in-out text-base text-left">
                        {GARMENT_STYLES_ADVANCED.map(style => <option key={style.id} value={style.id} className="bg-white text-stone-800 font-medium">{translate(style.nameKey)}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="garment-size" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('chooseGarmentSize')}</label>
                    <select id="garment-size" value={selectedSizeKey} onChange={e => setSelectedSizeKey(e.target.value)} className="w-full bg-white/80 border border-stone-300 rounded-md py-2 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700">
                        {GARMENT_SIZES_ADVANCED.map(size => <option key={size.key} value={size.key}>{translate(size.nameKey)}</option>)}
                    </select>
                </div>
            </div>
            <div className="text-center bg-white/80 p-4 rounded-md">
                <p className="text-stone-700">Estimated Yield From This Roll:</p>
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
  const { fabricId } = useParams<{ fabricId: string }>();
  const fabric = MOCK_FABRICS.find(f => f.id === fabricId);
  const { translate } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(fabric?.imageUrl || '');
  const [selectedColor, setSelectedColor] = useState('white');
  
  const displayedPrice = useMemo(() => {
    if (!fabric) return 0;
    const markup = COLOR_MARKUPS[selectedColor]?.markup || 0;
    return fabric.pricePerRoll * (1 + markup);
  }, [fabric, selectedColor]);
  
  const schemas = useMemo(() => {
    if (!fabric) return [];
    const breadcrumbs: Breadcrumb[] = [
        { name: translate('nav', 'main'), path: '/' },
        { name: translate('nav', 'collections'), path: '/collections' },
        { name: translate(fabric.nameKey), path: `/collections/${fabric.id}` }
    ];
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema(),
        generateBreadcrumbSchema(breadcrumbs),
        generateProductSchema(fabric, translate)
    ];
  }, [fabric, translate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (fabric) {
        setMainImage(fabric.imageUrl);
        setSelectedColor('white'); // Reset color on fabric change
    }
  }, [fabric]);

  if (!fabric) {
    return (
        <ContentBlock isHero>
            <h1 className="text-2xl text-stone-700">Fabric not found.</h1>
            <Link to="/collections" className="mt-4">
                <Button>Back to Collections</Button>
            </Link>
        </ContentBlock>
    );
  }
  
  const handleAddToCart = () => {
    if (quantity > 0) {
        addToCart(fabric.id, quantity);
    }
  };

  const pageName = `Product Detail: ${translate(fabric.nameKey)}`;

  return (
    <>
      <SEOMetadata
        titleKey="page_product_detail_title"
        descriptionKey="page_product_detail_description"
        pagePath={`/collections/${fabric.id}`}
        item={fabric}
        schemas={schemas}
      />
      <section className="pt-24 md:pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[rgba(255,255,255,0.70)] backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="bg-white/50 backdrop-blur-xl p-4 rounded-lg">
                        <div className="mb-4">
                            <div className="aspect-square bg-stone-100/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border-2 border-muted-gold/50 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-muted-gold/30 hover:-translate-y-1">
                                <ManagedImage 
                                    src={mainImage} 
                                    alt={`${translate(fabric.nameKey)} - Main View`} 
                                    pageName={pageName}
                                    sectionTitle="Main Gallery Image"
                                    className="w-full h-full object-cover rounded-md" 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                        {fabric.galleryImages.map((img, idx) => (
                            <button key={idx} onClick={() => setMainImage(img)} className={`aspect-square bg-stone-100/90 backdrop-blur-sm rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-brandAccent-700 border-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-muted-gold/30 hover:-translate-y-0.5 ${mainImage === img ? 'ring-2 ring-brandAccent-700 border-brandAccent-700' : 'border-muted-gold/50'}`}>
                                <ManagedImage 
                                    src={img} 
                                    alt={`${translate(fabric.nameKey)} view ${idx + 1}`} 
                                    pageName={pageName}
                                    sectionTitle={`Gallery Thumbnail ${idx + 1}`}
                                    className="w-full h-full object-cover rounded-md" 
                                />
                            </button>
                        ))}
                        </div>
                    </div>

                    {/* Product Info, Estimator, and Purchase */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-stone-800 mb-2">{translate(fabric.nameKey)}</h1>
                        <p className="text-lg text-stone-600 mb-4">{fabric.rollLengthInMeters}m {translate('pricePerRoll')}</p>
                        <p className="text-4xl font-bold text-brandAccent-800 mb-4">${displayedPrice.toFixed(2)}</p>

                        {fabric.availableColors && fabric.availableColors.length > 1 && (
                            <div className="mb-8">
                            <h3 className="text-md font-semibold text-stone-700 mb-3">Color</h3>
                            <div className="flex flex-wrap gap-3">
                                {fabric.availableColors.map(colorKey => (
                                <button
                                    key={colorKey}
                                    onClick={() => setSelectedColor(colorKey)}
                                    className={`w-10 h-10 rounded-full focus:outline-none ring-offset-2 ring-offset-white/80 transition-all duration-150 ${selectedColor === colorKey ? 'ring-2 ring-brandAccent-700' : 'ring-1 ring-transparent hover:ring-1 hover:ring-stone-400'}`}
                                    title={translate(COLOR_PALETTE[colorKey]?.nameKey)}
                                    aria-label={`Select color ${translate(COLOR_PALETTE[colorKey]?.nameKey)}`}
                                >
                                    <div className={`w-full h-full rounded-full ${COLOR_PALETTE[colorKey]?.className} border border-black/10`}></div>
                                </button>
                                ))}
                            </div>
                            {selectedColor !== 'white' && (
                                <div className="mt-4 p-3 bg-stone-100/90 rounded-md border border-stone-200 text-sm text-stone-600">
                                    <p><strong className="text-stone-700">{translate('colorInfoTitle')}:</strong> {translate(COLOR_MARKUPS[selectedColor]?.infoKey)}</p>
                                </div>
                            )}
                            </div>
                        )}
                        
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
            </div>
        </div>
      </section>

        {/* Deep Dive Section */}
        <ContentBlock>
            <h2 className="text-3xl font-serif-display font-semibold text-center text-stone-800 mb-10 section-title-underline">{translate('product_deepDiveTitle')}</h2>
            <DeepDiveTabs fabric={fabric} />
        </ContentBlock>

        {/* Project Inspiration Section */}
        <ContentBlock>
            <h2 className="text-3xl font-serif-display font-semibold text-center text-stone-800 mb-10 section-title-underline">{translate('product_projectInspirationTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="text-center">
                    <div className="mb-4 rounded-lg border-2 border-muted-gold/50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-muted-gold/30 hover:-translate-y-1 overflow-hidden">
                        <ManagedImage 
                            src="https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp" 
                            alt={translate('product_inspiration_kandura_alt')} 
                            pageName={pageName}
                            sectionTitle="Inspiration Image: Kandura"
                            className="rounded-md aspect-[4/3] object-cover w-full" 
                        />
                    </div>
                    <p className="text-stone-600 italic">{translate('product_inspirationCaption').replace('{garment}', 'Emirati Kandura').replace('{fabricName}', translate(fabric.nameKey))}</p>
                </div>
                <div className="text-center">
                    <div className="mb-4 rounded-lg border-2 border-muted-gold/50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-muted-gold/30 hover:-translate-y-1 overflow-hidden">
                        <ManagedImage 
                            src="https://i.postimg.cc/k4GkYyv0/inspiration-abaya.webp" 
                            alt={translate('product_inspiration_abaya_alt')} 
                            pageName={pageName}
                            sectionTitle="Inspiration Image: Abaya"
                            className="rounded-md aspect-[4/3] object-cover w-full" 
                        />
                    </div>
                    <p className="text-stone-600 italic">{translate('product_inspirationCaption').replace('{garment}', 'Luxury Abaya').replace('{fabricName}', translate(fabric.nameKey))}</p>
                </div>
            </div>
        </ContentBlock>
    </>
  );
};
