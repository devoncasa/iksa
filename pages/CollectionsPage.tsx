
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from '../components/Button';
import { MOCK_FABRICS, FABRIC_FILTERS, FEATURE_ICONS, COLOR_MARKUPS } from '../constants';
import { Fabric, Breadcrumb } from '../types';
import { SEOMetadata } from '../components/SEOMetadata';
import { ContentBlock } from '../components/ContentBlock';
import { generateOrganizationSchema, generateWebsiteSchema, generateBreadcrumbSchema } from '../components/Schema';
import { ManagedImage } from '../components/ManagedImage';

interface FabricFiltersState {
  useCase: string;
  feel: string;
  performance: string;
  rollLength: string;
}

const FabricCard: React.FC<{ fabric: Fabric; }> = ({ fabric }) => {
  const { translate } = useLanguage();
  
  const defaultThobeMeters = 2.9;
  const estimatedYield = Math.floor(fabric.rollLengthInMeters / defaultThobeMeters);

  const priceRange = useMemo(() => {
    if (!fabric.availableColors || fabric.availableColors.length <= 1) {
      return { min: fabric.pricePerRoll, max: fabric.pricePerRoll };
    }
    const markups = fabric.availableColors.map(color => COLOR_MARKUPS[color]?.markup || 0);
    const maxMarkup = Math.max(...markups);
    const maxPrice = fabric.pricePerRoll * (1 + maxMarkup);
    return { min: fabric.pricePerRoll, max: maxPrice };
  }, [fabric]);

  return (
    <div 
      className="bg-white/70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1 border border-stone-200/50 group h-full" 
      id={fabric.id} 
    >
      <div className="relative overflow-hidden">
        <ManagedImage 
            src={fabric.imageUrl} 
            alt={translate(fabric.nameKey)}
            pageName="Collections"
            sectionTitle={`Fabric Card: ${translate(fabric.nameKey)}`}
            className="w-full aspect-[4/3] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex-grow mb-4">
          <h3 className="text-xl md:text-2xl font-serif-display font-semibold text-brandAccent-800 mb-2">{translate(fabric.nameKey)}</h3> 
          <div className="text-stone-600 text-sm mb-3 space-x-2">
              <span>{fabric.rollLengthInMeters}m / Roll</span>
              <span className="text-stone-300">|</span>
              <span className="font-semibold text-brandAccent-800">{translate('yieldsApprox')} {estimatedYield} {translate('pieces')}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {fabric.features.slice(0, 4).map(featureKey => {
              const IconComponent = FEATURE_ICONS[featureKey];
              return IconComponent ? (
                <IconComponent 
                  key={featureKey} 
                  title={translate(`feature_${featureKey}`)} 
                  className="w-5 h-5 md:w-6 md:h-6 text-brandAccent-700" 
                />
              ) : null;
            })}
          </div>
          {priceRange.min === priceRange.max ? (
            <p className="text-xl md:text-2xl font-semibold text-brandAccent-800">${fabric.pricePerRoll.toFixed(2)} <span className="text-lg text-stone-600 font-normal">{translate('pricePerRoll')}</span></p> 
          ) : (
            <p className="text-xl md:text-2xl font-semibold text-brandAccent-800">
                ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
                <span className="block text-sm text-stone-500 font-normal -mt-1">{translate('priceVariesByColor')}</span>
            </p>
          )}
        </div>
        
        <div className="mt-auto"> 
          <Link to={`/collections/${fabric.id}`} className="block">
              <Button 
                variant="primary" 
                size="sm" 
                fullWidth
                aria-label={`${translate('viewDetails')} for ${translate(fabric.nameKey)}`}
                className="focus:ring-offset-white py-2.5" 
              >
                {translate('viewDetails')}
              </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


const FabricFilter: React.FC<{
  filters: FabricFiltersState;
  onFilterChange: <K extends keyof FabricFiltersState>(filterType: K, value: string) => void;
}> = ({ filters, onFilterChange }) => {
  const { translate } = useLanguage();

  const renderSelect = (filterType: keyof FabricFiltersState, options: {key: string, nameKey: string}[]) => (
    <div>
      <label htmlFor={`${filterType}-filter`} className="block text-sm font-medium text-stone-600 mb-1.5"> 
        {translate(`filterBy${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`)}
      </label>
      <select
        id={`${filterType}-filter`}
        name={filterType}
        value={filters[filterType]}
        onChange={(e) => onFilterChange(filterType, e.target.value)}
        className="w-full bg-white/80 border border-stone-300 text-stone-800 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors duration-150 ease-in-out text-sm"
      >
        {options.map(option => (
          <option key={option.key} value={option.key} className="bg-white text-stone-800 font-medium">{translate(option.nameKey)}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="p-0"> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"> 
        {renderSelect('useCase', FABRIC_FILTERS.useCases)}
        {renderSelect('feel', FABRIC_FILTERS.feel)}
        {renderSelect('performance', FABRIC_FILTERS.performance)}
        {renderSelect('rollLength', FABRIC_FILTERS.rollLengths)}
      </div>
    </div>
  );
};


export const CollectionsPage: React.FC = () => {
  const { translate } = useLanguage();
  const [filters, setFilters] = useState<FabricFiltersState>({
    useCase: 'all',
    feel: 'all',
    performance: 'all',
    rollLength: 'all',
  });

  const handleFilterChange = <K extends keyof FabricFiltersState>(filterType: K, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredFabrics = useMemo(() => {
    return MOCK_FABRICS.filter(fabric => {
      return (
        (filters.useCase === 'all' || fabric.useCases.includes(filters.useCase)) &&
        (filters.feel === 'all' || fabric.feel.includes(filters.feel)) &&
        (filters.performance === 'all' || fabric.performance.includes(filters.performance)) &&
        (filters.rollLength === 'all' || fabric.rollLengthInMeters.toString() === filters.rollLength)
      );
    });
  }, [filters]); 

  const schemas = useMemo(() => {
    const breadcrumbs: Breadcrumb[] = [
        { name: translate('nav', 'main'), path: '/' },
        { name: translate('nav', 'collections'), path: '/collections' }
    ];
    return [
        generateOrganizationSchema(translate),
        generateWebsiteSchema(),
        generateBreadcrumbSchema(breadcrumbs)
    ];
  }, [translate]);

  return (
    <>
      <SEOMetadata
        titleKey="page_collections_title"
        descriptionKey="page_collections_description"
        pagePath="/collections"
        schemas={schemas}
      />
      <ContentBlock 
        isHero
        heroImageSrc="https://i.postimg.cc/t4d7WvHh/fabric-roll-collection-showcase-2.webp"
        heroImageAlt={translate('collections_hero_alt')}
        heroPageName="Collections"
        heroSectionTitle="Collections Hero"
      >
          <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-warm-terracotta mb-4">{translate('collections_heroTitle')}</h1>
          <p className="text-lg text-stone-700">{translate('collections_heroSubtitle')}</p>
          <div className="mt-6 text-center md:text-left">
            <Link to="/price-structure">
                <Button variant="outline">{translate('collections_viewPricing')}</Button>
            </Link>
          </div>
      </ContentBlock>

      <ContentBlock>
        <FabricFilter filters={filters} onFilterChange={handleFilterChange} />
      </ContentBlock>

      <section className="relative w-full py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFabrics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> 
                {filteredFabrics.map((fabric) => (
                <FabricCard 
                    key={fabric.id} 
                    fabric={fabric} 
                />
                ))}
            </div>
            ) : (
            <div className="text-center bg-[rgba(255,255,255,0.70)] backdrop-blur-sm rounded-2xl p-16 shadow-2xl">
                <p className="text-stone-500 text-xl">{translate('noResultsFound')}</p> 
            </div>
            )}
        </div>
      </section>
      
    </>
  );
};
