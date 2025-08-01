
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { SEOMetadata } from '../components/SEOMetadata';
import { Button } from '../components/Button';
import { StyledText } from '../components/StyledText';
import { MOCK_FABRICS } from '../constants';
import { PricingSettings, CountrySettings } from '../types';
import { ContentBlock } from '../components/ContentBlock';
import { ChevronDownIcon } from '../components/icons';
import { PolicySubsection } from '../components/PolicySubsection';
import { generateOrganizationSchema, generateWebsiteSchema } from '../components/Schema';
import { ManagedImage } from '../components/ManagedImage';

interface Product {
    id: string;
    nameKey: string;
    basePriceUSD: number;
    weightKg: number;
    image: string;
    hsCode: string;
    category: 'apparel' | 'textile';
}

interface CalculatedPrice {
    totalPrice: number;
    breakdown: string;
    currency: string;
}

const initialCountrySettings: Record<string, CountrySettings> = {
    'TH': { currency: 'THB', exchangeRateToUSD: 36.5, shipping: { base: 50, perKg: 20 }, taxes: { vatRate: 0.07, alwaysApplies: true }, duties: { deMinimisUSD: 0, rates: {} }, notes: 'Thai VAT (7%) included.' },
    'US': { currency: 'USD', exchangeRateToUSD: 1, shipping: { base: 15, perKg: 10 }, taxes: { salesTaxRate: 0, alwaysApplies: false, deMinimisUSD: 800 }, duties: { deMinimisUSD: 800, rates: { apparel: 0.05, textile: 0.03 } }, notes: 'Sales tax may vary by state.' },
    'GB': { currency: 'GBP', exchangeRateToUSD: 0.80, shipping: { base: 15, perKg: 10 }, taxes: { vatRate: 0.20, alwaysApplies: true }, duties: { deMinimisUSD: 168, rates: { apparel: 0.12, textile: 0.08 } }, notes: 'UK VAT (20%) & duties included.' },
    'EU': { currency: 'EUR', exchangeRateToUSD: 0.92, shipping: { base: 15, perKg: 10 }, taxes: { vatRate: 0.20, alwaysApplies: true }, duties: { deMinimisUSD: 163, rates: { apparel: 0.12, textile: 0.08 } }, notes: 'EU VAT & duties included.' },
    'AU': { currency: 'AUD', exchangeRateToUSD: 1.50, shipping: { base: 15, perKg: 10 }, taxes: { gstRate: 0.10, alwaysApplies: false, deMinimisUSD: 1000 }, duties: { deMinimisUSD: 1000, rates: { apparel: 0.05, textile: 0.05 } }, notes: 'Australia GST (10%) & duties included.' },
    'CA': { currency: 'CAD', exchangeRateToUSD: 1.35, shipping: { base: 15, perKg: 10 }, taxes: { salesTaxRate: 0.13, alwaysApplies: false, deMinimisUSD: 20 }, duties: { deMinimisUSD: 20, rates: { apparel: 0.18, textile: 0.10 } }, notes: 'Canada taxes & duties included.' },
    'AE': { currency: 'AED', exchangeRateToUSD: 3.67, shipping: { base: 20, perKg: 12 }, taxes: { vatRate: 0.05, alwaysApplies: true }, duties: { deMinimisUSD: 80, rates: { apparel: 0.05, textile: 0.05 } }, notes: 'UAE VAT (5%) & duties included.' },
    'IN': { currency: 'INR', exchangeRateToUSD: 83.00, shipping: { base: 30, perKg: 25 }, taxes: { gstRate: 0.18, alwaysApplies: true }, duties: { deMinimisUSD: 60, rates: { apparel: 0.20, textile: 0.10, swsRateOnDuty: 0.10 } }, notes: 'India GST & duties included.' },
    'SA': { currency: 'SAR', exchangeRateToUSD: 3.75, shipping: { base: 25, perKg: 15 }, taxes: { vatRate: 0.15, alwaysApplies: true }, duties: { deMinimisUSD: 800, rates: { apparel: 0.05, textile: 0.05 } }, notes: 'Saudi VAT (15%) & duties included.' },
    'MY': { currency: 'MYR', exchangeRateToUSD: 4.70, shipping: { base: 10, perKg: 8 }, taxes: { sstRate: 0.06, alwaysApplies: false, deMinimisUSD: 120 }, duties: { deMinimisUSD: 120, rates: { apparel: 0.05, textile: 0.05 } }, notes: 'Malaysia SST & duties included.' },
    'ID': { currency: 'IDR', exchangeRateToUSD: 16200, shipping: { base: 18, perKg: 10 }, taxes: { vatRate: 0.11, alwaysApplies: true }, duties: { deMinimisUSD: 3, rates: { apparel: 0.15, textile: 0.10 } }, notes: 'Indonesia VAT (11%) & duties included.' },
    'PK': { currency: 'PKR', exchangeRateToUSD: 278.00, shipping: { base: 25, perKg: 15 }, taxes: { vatRate: 0.17, alwaysApplies: true }, duties: { deMinimisUSD: 0, rates: { apparel: 0.20, textile: 0.15 } }, notes: 'Pakistan VAT/GST & duties included.' },
    'EG': { currency: 'EGP', exchangeRateToUSD: 48.00, shipping: { base: 35, perKg: 20 }, taxes: { vatRate: 0.14, alwaysApplies: true }, duties: { deMinimisUSD: 0, rates: { apparel: 0.20, textile: 0.15 } }, notes: 'Egypt VAT & duties included.' }
};

const initialPricingSettings: PricingSettings = {
    baseDeliveryChargeTH: 50,
    perKgDeliveryChargeTH: 20,
    internationalSurchargePercentageDefault: 0.15,
    currencyExchangeRateTHB_USD: 36.5,
    countries: initialCountrySettings
};

const products: Product[] = [
    { id: 'product1', nameKey: 'priceStructure_premiumThobe', basePriceUSD: 50.00, weightKg: 0.5, image: 'https://i.postimg.cc/SNvBZVXb/IKSA-section-background-00111.webp', hsCode: '6211.33.10', category: 'apparel' },
    { id: 'product2', nameKey: 'priceStructure_deluxeFabric', basePriceUSD: 120.00, weightKg: 1.2, image: 'https://i.postimg.cc/TP8Zxwqk/IKSA-section-background-00112.webp', hsCode: '5407.52', category: 'textile' }
];

const StaticPriceTable: React.FC = () => {
    const { translate } = useLanguage();
    return (
        <div className="mb-12">
            <h2 className="text-3xl font-serif-display font-semibold text-brandAccent-700 mb-2">{translate('priceStructure_pageTitle')}</h2>
            <p className="text-stone-600 mb-6">{translate('priceStructure_intro')}</p>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-300">
                    <thead className="bg-stone-100/70">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-stone-900 sm:pl-6">{translate('priceStructure_fabric')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900 hidden md:table-cell">{translate('priceStructure_composition')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">{translate('priceStructure_roll_size')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-stone-900">{translate('priceStructure_wholesale_meter')}</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">{translate('priceStructure_wholesale_roll')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white/80">
                        {MOCK_FABRICS.map((fabric) => (
                            <tr key={fabric.id}>
                                <td className="align-top whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-stone-900 sm:pl-6">{translate(fabric.nameKey)}</td>
                                <td className="align-top px-3 py-4 text-sm text-stone-500 hidden md:table-cell max-w-sm">
                                    <StyledText text={translate(fabric.detailDescriptionKey)} className="text-xs leading-snug" />
                                </td>
                                <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-stone-500">{fabric.rollLengthInMeters}m</td>
                                <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-stone-500">${(fabric.pricePerRoll / fabric.rollLengthInMeters).toFixed(2)}</td>
                                <td className="align-top whitespace-nowrap py-4 pl-3 pr-4 text-sm font-bold text-brandAccent-800 sm:pr-6">${fabric.pricePerRoll.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const formatCurrency = (amount: number, currencyCode: string) => {
    try {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
    } catch (e) {
        return `${currencyCode} ${amount.toFixed(2)}`;
    }
};

export const PriceStructurePage: React.FC = () => {
    const { translate } = useLanguage();
    const mainPolicyRef = useRef<HTMLDetailsElement | null>(null);
    const subsectionRefs = useRef<(HTMLDetailsElement | null)[]>([]);

    const [settings, setSettings] = useState<PricingSettings>(initialPricingSettings);
    const [tempSettings, setTempSettings] = useState<Omit<PricingSettings, 'countries'>>(initialPricingSettings);
    const [tempSurcharge, setTempSurcharge] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState('US');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<{ show: boolean, text: string }>({ show: false, text: '' });
    const [calculatedPrices, setCalculatedPrices] = useState<Record<string, CalculatedPrice>>({});
    
    const schemas = useMemo(() => {
        return [
            generateOrganizationSchema(translate),
            generateWebsiteSchema()
        ];
    }, [translate]);

    const calculateTotalPrice = useCallback((product: Product, countryCode: string): CalculatedPrice => {
        const countrySettings = settings.countries[countryCode];
        let basePriceInUSD = product.basePriceUSD;
        let totalUSD = basePriceInUSD;
        let breakdownParts = [`Base: ${formatCurrency(basePriceInUSD, 'USD')}`];
        let shippingCostUSD = 0;
        let finalCurrency = 'USD';
        let taxAmountUSD = 0;
        let dutyAmountUSD = 0;
        let finalNotes = '';

        if (countryCode === 'TH' && countrySettings) {
             finalCurrency = countrySettings.currency;
             const shippingCostTHB = countrySettings.shipping.base + (product.weightKg * countrySettings.shipping.perKg);
             const basePriceTHB = basePriceInUSD * countrySettings.exchangeRateToUSD;
             let totalTHB = basePriceTHB + shippingCostTHB;
             const vatAmount = totalTHB * (countrySettings.taxes.vatRate || 0);
             totalTHB += vatAmount;
             
             breakdownParts = [`Base: ${formatCurrency(basePriceTHB, 'THB')}`, `Ship: ${formatCurrency(shippingCostTHB, 'THB')}`, `VAT: ${formatCurrency(vatAmount, 'THB')}`];
             finalNotes = countrySettings.notes;
             
             return { totalPrice: totalTHB, breakdown: breakdownParts.join(' + ') + `. ${finalNotes}`, currency: finalCurrency };
        } 
        
        if (countrySettings) {
            shippingCostUSD = countrySettings.shipping.base + (product.weightKg * countrySettings.shipping.perKg);
            totalUSD += shippingCostUSD;
            breakdownParts.push(`Ship: ${formatCurrency(shippingCostUSD, 'USD')}`);
            
            let valueForDutiesAndTaxes = totalUSD;
            
            const productDutyRate = countrySettings.duties.rates[product.category] || 0;
            if (productDutyRate > 0 && basePriceInUSD > countrySettings.duties.deMinimisUSD) {
                dutyAmountUSD = valueForDutiesAndTaxes * productDutyRate;
                if (countryCode === 'IN' && countrySettings.duties.rates.swsRateOnDuty) {
                    const swsAmount = dutyAmountUSD * countrySettings.duties.rates.swsRateOnDuty;
                    dutyAmountUSD += swsAmount;
                }
            }

            const taxDeMinimis = countrySettings.taxes.deMinimisUSD ?? countrySettings.duties.deMinimisUSD;
            if (countrySettings.taxes.alwaysApplies || basePriceInUSD > taxDeMinimis) {
                const taxBase = valueForDutiesAndTaxes + dutyAmountUSD;
                if (countrySettings.taxes.vatRate) taxAmountUSD = taxBase * countrySettings.taxes.vatRate;
                else if (countrySettings.taxes.gstRate) taxAmountUSD = taxBase * countrySettings.taxes.gstRate;
                else if (countrySettings.taxes.sstRate) taxAmountUSD = taxBase * countrySettings.taxes.sstRate;
                else if (countrySettings.taxes.salesTaxRate) taxAmountUSD = taxBase * countrySettings.taxes.salesTaxRate;
            }

            if(dutyAmountUSD > 0) breakdownParts.push(`Duty: ${formatCurrency(dutyAmountUSD, 'USD')}`);
            if(taxAmountUSD > 0) breakdownParts.push(`Tax: ${formatCurrency(taxAmountUSD, 'USD')}`);

            totalUSD += dutyAmountUSD + taxAmountUSD;
            finalNotes = countrySettings.notes;
            finalCurrency = countrySettings.currency;
        } else {
            shippingCostUSD = settings.countries['US'].shipping.base + (product.weightKg * settings.countries['US'].shipping.perKg);
            totalUSD += shippingCostUSD;
            const surcharge = totalUSD * settings.internationalSurchargePercentageDefault;
            totalUSD += surcharge;
            breakdownParts.push(`Surcharge: ${formatCurrency(surcharge, 'USD')}`);
            finalNotes = 'Default international surcharge applied.';
        }

        let finalTotalConverted = totalUSD;
        if (finalCurrency !== 'USD' && countrySettings) {
            finalTotalConverted = totalUSD * countrySettings.exchangeRateToUSD;
        }

        return { totalPrice: finalTotalConverted, breakdown: breakdownParts.join(' + ') + `. ${finalNotes}`, currency: finalCurrency };
    }, [settings]);

    useEffect(() => {
        const newPrices: Record<string, CalculatedPrice> = {};
        products.forEach(p => { newPrices[p.id] = calculateTotalPrice(p, selectedCountry); });
        setCalculatedPrices(newPrices);
    }, [selectedCountry, settings, calculateTotalPrice]);

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (mainPolicyRef.current && mainPolicyRef.current.open && currentScrollTop < (window.innerHeight * 0.05)) {
                mainPolicyRef.current.open = false;
            }

            if (Math.abs(currentScrollTop - lastScrollTop) < 10) return;

            subsectionRefs.current.forEach(detailsEl => {
                if (!detailsEl) return;
                const rect = detailsEl.getBoundingClientRect();
                if (detailsEl.open && rect.bottom < 50) {
                    detailsEl.open = false;
                }
            });
            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogin = () => {
        if (password === '0007') {
            setIsAdmin(true);
            setShowLogin(false);
            setTempSettings({
                baseDeliveryChargeTH: settings.countries.TH.shipping.base,
                perKgDeliveryChargeTH: settings.countries.TH.shipping.perKg,
                currencyExchangeRateTHB_USD: settings.currencyExchangeRateTHB_USD,
                internationalSurchargePercentageDefault: settings.internationalSurchargePercentageDefault
            });
            setTempSurcharge((settings.internationalSurchargePercentageDefault * 100).toFixed(1));
            setPassword('');
        } else {
            setMessage({ show: true, text: translate('admin_incorrectPassword') });
            setPassword('');
        }
    };
    
    const handleSave = () => {
        const newBaseDelivery = tempSettings.baseDeliveryChargeTH;
        const newPerKgDelivery = tempSettings.perKgDeliveryChargeTH;
        const newSurcharge = parseFloat(tempSurcharge);

        if (isNaN(newBaseDelivery) || isNaN(newPerKgDelivery) || isNaN(newSurcharge)) {
             setMessage({ show: true, text: translate('admin_settingsError') });
             return;
        }
        if (newSurcharge < 0 || newSurcharge > 100) {
            setMessage({ show: true, text: translate('admin_surchargeError')});
            return;
        }

        setSettings(prev => ({
            ...prev,
            internationalSurchargePercentageDefault: newSurcharge / 100,
            countries: {
                ...prev.countries,
                'TH': { ...prev.countries.TH, shipping: { base: newBaseDelivery, perKg: newPerKgDelivery }}
            }
        }));
        setMessage({ show: true, text: translate('admin_settingsSaved') });
    };
    
    const handleTempSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setTempSettings(prev => ({ ...prev, [id]: parseFloat(value) }));
    };

    const deminimisData = [
        { c: 'us', duty: 'priceStructure_table_us_duty', tax: 'priceStructure_table_us_tax', notes: 'priceStructure_table_us_notes' }, { c: 'eu', duty: 'priceStructure_table_eu_duty', tax: 'priceStructure_table_eu_tax', notes: 'priceStructure_table_eu_notes' }, { c: 'gb', duty: 'priceStructure_table_uk_duty', tax: 'priceStructure_table_uk_tax', notes: 'priceStructure_table_uk_notes' }, { c: 'au', duty: 'priceStructure_table_au_duty', tax: 'priceStructure_table_au_tax', notes: 'priceStructure_table_au_notes' }, { c: 'ca', duty: 'priceStructure_table_ca_duty', tax: 'priceStructure_table_ca_tax', notes: 'priceStructure_table_ca_notes' }, { c: 'ae', duty: 'priceStructure_table_ae_duty', tax: 'priceStructure_table_ae_tax', notes: 'priceStructure_table_ae_notes' }, { c: 'in', duty: 'priceStructure_table_in_duty', tax: 'priceStructure_table_in_tax', notes: 'priceStructure_table_in_notes' }, { c: 'sa', duty: 'priceStructure_table_sa_duty', tax: 'priceStructure_table_sa_tax', notes: 'priceStructure_table_sa_notes' }, { c: 'my', duty: 'priceStructure_table_my_duty', tax: 'priceStructure_table_my_tax', notes: 'priceStructure_table_my_notes' }, { c: 'id', duty: 'priceStructure_table_id_duty', tax: 'priceStructure_table_id_tax', notes: 'priceStructure_table_id_notes' }, { c: 'pk', duty: 'priceStructure_table_pk_duty', tax: 'priceStructure_table_pk_tax', notes: 'priceStructure_table_pk_notes' }, { c: 'eg', duty: 'priceStructure_table_eg_duty', tax: 'priceStructure_table_eg_tax', notes: 'priceStructure_table_eg_notes' },
    ];
    const countryOptions = [
        { code: "TH", name: "Thailand" }, { code: "US", name: "United States" }, { code: "GB", name: "United Kingdom" }, { code: "AU", name: "Australia" }, { code: "CA", name: "Canada" }, { code: "EU", name: "European Union" }, { code: "AE", name: "United Arab Emirates" }, { code: "IN", name: "India" }, { code: "SA", name: "Saudi Arabia" }, { code: "MY", name: "Malaysia" }, { code: "ID", name: "Indonesia" }, { code: "PK", name: "Pakistan" }, { code: "EG", name: "Egypt" },
    ];

    const InfoContent: React.FC<{contentKey: string, itemsKeys?: string[], conclusionKey?: string}> = ({contentKey, itemsKeys, conclusionKey}) => (
        <div className="prose prose-sm max-w-none text-stone-700 space-y-2">
            <StyledText text={translate(contentKey)} />
            {itemsKeys && <ul className="list-disc pl-5 space-y-1">{itemsKeys.map(key => <li key={key}><StyledText text={translate(key)} /></li>)}</ul>}
            {conclusionKey && <StyledText text={translate(conclusionKey)} />}
        </div>
    );
    
    const renderUserView = () => (
        <ContentBlock>
            <StaticPriceTable />
            <details ref={mainPolicyRef} className="group mt-12 transition-all duration-500 ease-in-out">
                <summary className="list-none flex items-center justify-center cursor-pointer text-3xl font-serif-display font-semibold text-brandAccent-700 mb-6 transition-all duration-300 p-4 rounded-lg bg-stone-50/70 hover:bg-stone-100/80 border border-stone-200/50 shadow-sm hover:shadow-md">
                     <ChevronDownIcon className="w-8 h-8 mr-4 transition-transform duration-300 group-open:rotate-180" />
                    <span>{translate('priceStructure_collapsibleTitle')}</span>
                </summary>
                <div className="transition-[grid-template-rows] duration-500 ease-in-out grid grid-rows-[0fr] group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                        <div className="pt-8">
                            <div className="max-w-md mx-auto mb-10">
                                <label htmlFor="country-select" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('priceStructure_selectCountry')}</label>
                                <select id="country-select" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="w-full bg-white/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700">
                                    {countryOptions.map(opt => <option key={opt.code} value={opt.code}>{opt.name}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                                {products.map(p => {
                                    const priceInfo = calculatedPrices[p.id];
                                    return (
                                    <div key={p.id} className="bg-white/50 backdrop-blur-xl p-6 rounded-lg shadow-md border border-stone-200/50">
                                        <h2 className="text-xl font-semibold mb-3 text-brandAccent-800">{translate(p.nameKey)}</h2>
                                        <div className="mb-4 rounded-lg border-2 border-muted-gold/50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-muted-gold/30 hover:-translate-y-1 overflow-hidden">
                                            <ManagedImage 
                                                src={p.image} 
                                                alt={translate(p.nameKey)} 
                                                pageName="Price Structure"
                                                sectionTitle={`Product Example: ${translate(p.nameKey)}`}
                                                className="w-full h-auto rounded-md aspect-[4/3] object-cover" 
                                            />
                                        </div>
                                        <p className="text-md mb-2">{translate('priceStructure_basePrice')} {formatCurrency(p.basePriceUSD, 'USD')}</p>
                                        <p className="text-sm text-stone-600 mb-4">{translate('priceStructure_weight')} {p.weightKg} kg</p>
                                        <div className="text-xl font-bold text-brandAccent-800">{translate('priceStructure_totalPrice')} <span>{priceInfo ? formatCurrency(priceInfo.totalPrice, priceInfo.currency) : translate('priceStructure_calculating')}</span></div>
                                        <div className="text-xs text-stone-500 mt-2"><p><strong>{translate('priceStructure_includes')}</strong> {priceInfo?.breakdown}</p></div>
                                    </div>
                                )})}
                            </div>
                            <p className="text-center text-stone-600 text-sm">{translate('priceStructure_dynamicDisclaimer')}</p>
                            
                            <div className="bg-stone-50/70 backdrop-blur-sm p-6 md:p-8 rounded-md shadow-sm border border-stone-200 mt-12">
                                <h2 className="text-2xl font-bold text-center mb-6 text-stone-800">{translate('priceStructure_policyTitle')}</h2>
                                <PolicySubsection ref={el => { subsectionRefs.current[0] = el; }} titleKey="priceStructure_calculationTitle">
                                <InfoContent contentKey="priceStructure_policyIntro" itemsKeys={['priceStructure_calculation_item1', 'priceStructure_calculation_item2', 'priceStructure_calculation_item3', 'priceStructure_calculation_item4']} />
                                </PolicySubsection>
                                <PolicySubsection ref={el => { subsectionRefs.current[1] = el; }} titleKey="priceStructure_domesticTitle">
                                <InfoContent contentKey="priceStructure_domesticIntro" itemsKeys={['priceStructure_domestic_item1', 'priceStructure_domestic_item2', 'priceStructure_domestic_item3', 'priceStructure_domestic_item4']} />
                                </PolicySubsection>
                                <PolicySubsection ref={el => { subsectionRefs.current[2] = el; }} titleKey="priceStructure_internationalTitle">
                                <InfoContent contentKey="priceStructure_internationalIntro" itemsKeys={['priceStructure_international_item1', 'priceStructure_international_item2', 'priceStructure_international_item3', 'priceStructure_international_item4', 'priceStructure_international_item5']} conclusionKey="priceStructure_internationalConclusion" />
                                </PolicySubsection>
                                <PolicySubsection ref={el => { subsectionRefs.current[3] = el; }} titleKey="priceStructure_typicalCostsTitle">
                                    <InfoContent contentKey="priceStructure_typicalCostsIntro" itemsKeys={['priceStructure_typicalCosts_thobes_title', 'priceStructure_typicalCosts_thobes_content', 'priceStructure_typicalCosts_fabrics_title', 'priceStructure_typicalCosts_fabrics_content', 'priceStructure_typicalCosts_hsCodes']} />
                                </PolicySubsection>
                                <PolicySubsection ref={el => { subsectionRefs.current[4] = el; }} titleKey="priceStructure_shippingEstimatesTitle">
                                <InfoContent contentKey="priceStructure_shippingEstimatesIntro" itemsKeys={['priceStructure_shippingEstimates_content']} conclusionKey="priceStructure_shippingEstimates_note"/>
                                </PolicySubsection>
                                <PolicySubsection ref={el => { subsectionRefs.current[5] = el; }} titleKey="priceStructure_deminimisTitle">
                                    <p className="mb-4 text-stone-700 text-sm">{translate('priceStructure_deminimisIntro')}</p>
                                    <div className="overflow-x-auto mt-4 bg-white/50 backdrop-blur-xl rounded-lg shadow-md border border-soft-sand">
                                        <table className="w-full text-left text-sm divide-y divide-soft-sand">
                                            <thead className="bg-creamy-beige/30"><tr>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_country')}</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_duty')}</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_tax')}</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_notes')}</th>
                                            </tr></thead>
                                            <tbody className="bg-white/80 divide-y divide-soft-sand">
                                                {deminimisData.map(item => (<tr key={item.c}><td className="px-3 py-3 align-top font-semibold text-deep-chocolate">{countryOptions.find(opt => opt.code.toLowerCase().startsWith(item.c.substring(0,2)))?.name}</td><td className="px-3 py-3 align-top text-stone-700">{translate(item.duty)}</td><td className="px-3 py-3 align-top text-stone-700">{translate(item.tax)}</td><td className="px-3 py-3 align-top text-stone-700">{translate(item.notes)}</td></tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-stone-600 mt-4 italic">{translate('priceStructure_deminimisTable_note')}</p>
                                </PolicySubsection>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
            <div className="text-center mt-8"><button onClick={() => setShowLogin(true)} className="text-sm text-stone-500 hover:text-brandAccent-700 transition-colors">{translate('admin_access')}</button></div>
        </ContentBlock>
    );

    const renderAdminView = () => (
        <ContentBlock>
            <h1 className="text-3xl font-bold text-center mb-6 text-brandAccent-800">{translate('admin_panelTitle')}</h1>
            <div className="p-8 rounded-lg max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-stone-700">{translate('admin_deliverySettings')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="baseDeliveryChargeTH">{translate('admin_baseDeliveryTH')}</label>
                        <input type="number" id="baseDeliveryChargeTH" value={tempSettings.baseDeliveryChargeTH} onChange={handleTempSettingChange} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="perKgDeliveryChargeTH">{translate('admin_perKgDeliveryTH')}</label>
                        <input type="number" id="perKgDeliveryChargeTH" value={tempSettings.perKgDeliveryChargeTH} onChange={handleTempSettingChange} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm" />
                    </div>
                    <div className="md:col-span-2 mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="internationalSurchargePercentageDefault">{translate('admin_internationalSurcharge')}</label>
                        <input 
                            type="number" 
                            id="internationalSurchargePercentageDefault" 
                            value={tempSurcharge}
                            onChange={(e) => setTempSurcharge(e.target.value)} 
                            min="0" 
                            max="100"
                            step="0.1" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm"
                        />
                        <p className="text-xs text-stone-500 mt-1">{translate('admin_surchargeNote')}</p>
                    </div>
                </div>
                 <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={handleSave} variant="primary">{translate('admin_saveSettings')}</Button>
                    <Button onClick={() => setIsAdmin(false)} variant="secondary">{translate('admin_backToUserView')}</Button>
                </div>
            </div>
        </ContentBlock>
    );
    
    return (
        <>
            <SEOMetadata 
                titleKey="page_priceStructure_title" 
                descriptionKey="page_priceStructure_description"
                pagePath="/price-structure"
                schemas={schemas} 
            />
            
            {!isAdmin && (
                <ContentBlock 
                    isHero
                    heroImageSrc="https://i.postimg.cc/yNF28HL7/IKSA-section-background-00113.webp"
                    heroImageAlt={translate('priceStructure_pageTitle_dynamic')}
                    heroPageName="Price Structure"
                    heroSectionTitle="Price Structure Hero"
                >
                    <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-warm-terracotta mb-8 md:mb-10 section-title-underline">
                        {translate('priceStructure_pageTitle_dynamic')}
                    </h1>
                    <p className="text-base md:text-lg text-stone-700 leading-relaxed">
                        {translate('priceStructure_policyIntro')}
                    </p>
                </ContentBlock>
            )}

            {isAdmin ? renderAdminView() : renderUserView()}

            {showLogin && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-stone-50 p-6 rounded-lg shadow-xl border border-stone-200 w-full max-w-sm">
                        <h2 className="text-xl font-semibold mb-4 text-brandAccent-700">{translate('admin_loginTitle')}</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="admin-password">{translate('admin_password')}</label>
                            <input type="password" id="admin-password" value={password} onChange={e => setPassword(e.target.value)} placeholder={translate('admin_enterPassword')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setShowLogin(false)} variant="secondary">{translate('admin_cancel')}</Button>
                            <Button onClick={handleLogin} variant="primary">{translate('admin_login')}</Button>
                        </div>
                    </div>
                </div>
            )}

            {message.show && (
                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                    <div className="bg-stone-50 p-6 rounded-lg shadow-xl border border-stone-200 text-center w-full max-w-sm">
                        <p className="mb-4">{message.text}</p>
                        <Button onClick={() => setMessage({show: false, text: ''})} variant="primary">{translate('ok')}</Button>
                    </div>
                </div>
            )}
        </>
    );
};
