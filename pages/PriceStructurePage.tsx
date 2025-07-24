

import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { MOCK_FABRICS } from '../constants';
import { SEOMetadata } from '../components/SEOMetadata';
import { Fabric } from '../types';
import { StyledText } from '../components/StyledText';

const PriceTable: React.FC<{ fabrics: Fabric[] }> = ({ fabrics }) => {
    const { translate } = useLanguage();

    return (
        <div className="overflow-x-auto bg-white/70 backdrop-blur-sm rounded-lg shadow-lg border border-stone-200/50">
            <table className="min-w-full divide-y divide-stone-200/50">
                <thead className="bg-stone-100/70">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">{translate('priceStructure_fabric')}</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">{translate('priceStructure_composition')}</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">{translate('priceStructure_roll_size')}</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">{translate('priceStructure_wholesale_meter')}</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">{translate('priceStructure_wholesale_roll')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white/70 divide-y divide-stone-200/50">
                    {fabrics.map((fabric) => {
                        const pricePerMeter = fabric.pricePerRoll / fabric.rollLengthInMeters;

                        return (
                            <tr key={fabric.id} className="hover:bg-stone-50/70 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-stone-900 align-top">{translate(fabric.nameKey)}</td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-stone-600 max-w-md align-top">
                                    <StyledText text={translate(fabric.detailDescriptionKey)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600 align-top">{fabric.rollLengthInMeters}m</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600 align-top">${pricePerMeter.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brandAccent-800 align-top">${fabric.pricePerRoll.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export const PriceStructurePage: React.FC = () => {
    const { translate } = useLanguage();
    const collections = [
        { key: 'heritage', nameKey: 'collection_heritage' },
        { key: 'performance', nameKey: 'collection_performance' }
    ];

    return (
        <>
            <SEOMetadata
                titleKey="page_priceStructure_title"
                descriptionKey="page_priceStructure_description"
                keywordsKey="page_priceStructure_keywords"
                pagePath="/price-structure"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <header className="text-center mb-12 md:mb-16 bg-stone-50/90 backdrop-blur-sm p-8 rounded-lg">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-stone-800 mb-6 section-title-underline">
                        {translate('priceStructure_pageTitle')}
                    </h1>
                    <p className="text-lg text-stone-700 max-w-3xl mx-auto leading-relaxed">
                        {translate('priceStructure_intro')}
                    </p>
                </header>
                
                <div className="space-y-16">
                    {collections.map((collection, index) => {
                        const collectionFabrics = MOCK_FABRICS.filter(f => f.collectionKey === collection.key);
                        const isPrimaryBg = index % 2 === 0;
                        const bgColor = isPrimaryBg ? 'bg-white/90' : 'bg-white/70';

                        if (collectionFabrics.length === 0) {
                            return null;
                        }
                        return (
                            <section key={collection.key} className={`${bgColor} backdrop-blur-sm p-8 rounded-lg`}>
                                <h2 className="text-3xl font-serif-display font-semibold text-brandAccent-700 mb-8">
                                    {translate(collection.nameKey)}
                                </h2>
                                <PriceTable fabrics={collectionFabrics} />
                            </section>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
