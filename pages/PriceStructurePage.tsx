
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { SEOMetadata } from '../components/SEOMetadata';
import { Button } from '../components/Button';
import { StyledText } from '../components/StyledText';

interface PricingSettings {
    baseDeliveryChargeTH: number;
    perKgDeliveryChargeTH: number;
    thailandVATRate: number;
    baseDeliveryChargeINT: number;
    perKgDeliveryINT: number;
    internationalSurchargePercentage: number;
    currencyExchangeRateTHB_USD: number;
}

interface Product {
    id: string;
    nameKey: string;
    basePriceUSD: number;
    weightKg: number;
    image: string;
}

interface CalculatedPrice {
    totalPrice: string;
    breakdown: string;
    currency: 'USD' | 'THB';
}

const initialPricingSettings: PricingSettings = {
    baseDeliveryChargeTH: 50,
    perKgDeliveryChargeTH: 20,
    thailandVATRate: 0.07,
    baseDeliveryChargeINT: 15,
    perKgDeliveryINT: 10,
    internationalSurchargePercentage: 0.15,
    currencyExchangeRateTHB_USD: 36.5
};

const products: Product[] = [
    { id: 'product1', nameKey: 'priceStructure_premiumWidget', basePriceUSD: 50.00, weightKg: 0.5, image: 'https://placehold.co/300x200/E0D8CC/3A2A22?text=Premium+Widget' },
    { id: 'product2', nameKey: 'priceStructure_deluxeGadget', basePriceUSD: 120.00, weightKg: 1.2, image: 'https://placehold.co/300x200/E0D8CC/3A2A22?text=Deluxe+Gadget' }
];

export const PriceStructurePage: React.FC = () => {
    const { translate } = useLanguage();

    const [settings, setSettings] = useState<PricingSettings>(initialPricingSettings);
    const [tempSettings, setTempSettings] = useState<PricingSettings>(initialPricingSettings);
    const [selectedCountry, setSelectedCountry] = useState('TH');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<{ show: boolean, text: string }>({ show: false, text: '' });
    const [calculatedPrices, setCalculatedPrices] = useState<Record<string, CalculatedPrice>>({});

    const calculateTotalPrice = useCallback((product: Product, countryCode: string): CalculatedPrice => {
        let total = product.basePriceUSD;
        let breakdown = `${translate('priceStructure_basePrice')} $${product.basePriceUSD.toFixed(2)}`;
        let shippingCost = 0;
        let finalCurrency: 'USD' | 'THB' = 'USD';
        let taxDutyText = '';

        if (countryCode === 'TH') {
            let basePriceTHB = product.basePriceUSD * settings.currencyExchangeRateTHB_USD;
            total = basePriceTHB;
            shippingCost = settings.baseDeliveryChargeTH + (product.weightKg * settings.perKgDeliveryChargeTH);
            total += shippingCost;
            breakdown = `Base: ${(basePriceTHB).toFixed(2)} THB + Ship: ${shippingCost.toFixed(2)} THB`;
            let vatAmount = total * settings.thailandVATRate;
            total += vatAmount;
            breakdown += ` + VAT (7%): ${vatAmount.toFixed(2)} THB`;
            finalCurrency = 'THB';
        } else {
            shippingCost = settings.baseDeliveryChargeINT + (product.weightKg * settings.perKgDeliveryINT);
            total += shippingCost;
            breakdown += ` + Ship: $${shippingCost.toFixed(2)}`;
            let surchargeAmount = total * settings.internationalSurchargePercentage;
            total += surchargeAmount;
            breakdown += ` + Duties/Tax: $${surchargeAmount.toFixed(2)}`;
        }
        return {
            totalPrice: total.toFixed(2),
            breakdown,
            currency: finalCurrency
        };
    }, [settings, translate]);

    useEffect(() => {
        const newPrices: Record<string, CalculatedPrice> = {};
        products.forEach(p => {
            newPrices[p.id] = calculateTotalPrice(p, selectedCountry);
        });
        setCalculatedPrices(newPrices);
    }, [selectedCountry, settings, calculateTotalPrice]);

    useEffect(() => {
        if (isAdmin) {
            setTempSettings(settings);
        }
    }, [isAdmin, settings]);

    const handleLogin = () => {
        if (password === '0007') {
            setIsAdmin(true);
            setShowLogin(false);
            setPassword('');
        } else {
            setMessage({ show: true, text: translate('admin_incorrectPassword') });
            setPassword('');
        }
    };
    
    const handleSave = () => {
        const newSurcharge = tempSettings.internationalSurchargePercentage / 100;
        if (Object.values(tempSettings).some(v => isNaN(v))) {
             setMessage({ show: true, text: translate('admin_settingsError') });
             return;
        }
        if (newSurcharge < 0 || newSurcharge > 1) {
            setMessage({ show: true, text: translate('admin_surchargeError')});
            return;
        }
        setSettings({...tempSettings, internationalSurchargePercentage: newSurcharge});
        setMessage({ show: true, text: translate('admin_settingsSaved') });
    };
    
    const handleTempSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setTempSettings(prev => ({...prev, [id]: parseFloat(value)}));
    }

    const deminimisData = [
        { country: "United States (US)", duty: translate('priceStructure_table_us_duty'), tax: translate('priceStructure_table_us_tax'), notes: translate('priceStructure_table_us_notes') },
        { country: "European Union (EU)", duty: translate('priceStructure_table_eu_duty'), tax: translate('priceStructure_table_eu_tax'), notes: translate('priceStructure_table_eu_notes') },
        { country: "United Kingdom (UK)", duty: translate('priceStructure_table_uk_duty'), tax: translate('priceStructure_table_uk_tax'), notes: translate('priceStructure_table_uk_notes') },
        { country: "Australia (AU)", duty: translate('priceStructure_table_au_duty'), tax: translate('priceStructure_table_au_tax'), notes: translate('priceStructure_table_au_notes') },
        { country: "Canada (CA)", duty: translate('priceStructure_table_ca_duty'), tax: translate('priceStructure_table_ca_tax'), notes: translate('priceStructure_table_ca_notes') },
    ];

    const renderUserView = () => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-5xl">
            <header className="text-center mb-10 md:mb-12">
                <h1 className="text-4xl sm:text-5xl font-serif-display font-bold text-stone-800 mb-6 section-title-underline">{translate('priceStructure_pageTitle_dynamic')}</h1>
                <div className="max-w-md mx-auto">
                    <label htmlFor="country-select" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('priceStructure_selectCountry')}</label>
                    <select id="country-select" value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="w-full bg-white/80 border border-stone-300 rounded-md py-2.5 px-3 focus:ring-brandAccent-700 focus:border-brandAccent-700">
                        <option value="TH">Thailand</option>
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="CA">Canada</option>
                        <option value="EU">European Union (General)</option>
                    </select>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                {products.map(p => (
                    <div key={p.id} className="bg-white/50 backdrop-blur-xl p-6 rounded-lg shadow-md border border-stone-200/50">
                        <h2 className="text-xl font-semibold mb-3 text-brandAccent-800">{translate(p.nameKey)}</h2>
                        <img src={p.image} alt={translate(p.nameKey)} className="w-full h-auto rounded-md mb-4" />
                        <p className="text-md font-semibold mb-2">{translate('priceStructure_basePrice')} ${p.basePriceUSD.toFixed(2)}</p>
                        <p className="text-sm text-stone-600 mb-4">{translate('priceStructure_weight')} {p.weightKg} kg</p>
                        <div className="text-xl font-bold text-green-700">{translate('priceStructure_totalPrice')} <span>{calculatedPrices[p.id]?.currency === 'THB' ? 'THB ' : '$'}{calculatedPrices[p.id]?.totalPrice || translate('priceStructure_calculating')}</span></div>
                        <div className="text-xs text-stone-500 mt-2">
                            <p>{translate('priceStructure_includes')} <span >{calculatedPrices[p.id]?.breakdown || ''}</span></p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-stone-600 text-sm">{translate('priceStructure_dynamicDisclaimer')}</p>

            <div className="bg-stone-50/70 backdrop-blur-sm p-6 md:p-8 rounded-md shadow-sm border border-stone-200 mt-12">
                <h2 className="text-2xl font-bold text-center mb-6 text-brandAccent-800">{translate('priceStructure_policyTitle')}</h2>
                <StyledText text={translate('priceStructure_policyIntro')} className="mb-4 text-stone-700 text-center" />
                <h3 className="text-xl font-semibold mb-3 text-stone-700">{translate('priceStructure_calculationTitle')}</h3>
                <ul className="list-disc list-inside text-stone-700 space-y-2 mb-6">
                    <li><StyledText text={translate('priceStructure_calculation_item1')} /></li>
                    <li><StyledText text={translate('priceStructure_calculation_item2')} /></li>
                    <li><StyledText text={translate('priceStructure_calculation_item3')} /></li>
                    <li><StyledText text={translate('priceStructure_calculation_item4')} /></li>
                </ul>
                <h3 className="text-xl font-semibold mb-3 text-stone-700">{translate('priceStructure_internationalTitle')}</h3>
                <StyledText text={translate('priceStructure_internationalIntro')} className="mb-4 text-stone-700"/>
                <ul className="list-disc list-inside text-stone-700 space-y-2 mb-6">
                    <li>{translate('priceStructure_international_item1')}</li>
                    <li>{translate('priceStructure_international_item2')}</li>
                    <li>{translate('priceStructure_international_item3')}</li>
                    <li>{translate('priceStructure_international_item4')}</li>
                    <li>{translate('priceStructure_international_item5')}</li>
                </ul>
                <StyledText text={translate('priceStructure_internationalConclusion')} className="mb-4 text-stone-700 font-semibold" />

                <h3 className="text-xl font-semibold mb-3 text-stone-700">{translate('priceStructure_deminimisTitle')}</h3>
                <p className="mb-4 text-stone-700">{translate('priceStructure_deminimisIntro')}</p>
                <div className="overflow-x-auto mt-4 bg-white/50 backdrop-blur-xl rounded-lg shadow-md border border-soft-sand">
                    <table className="w-full text-left text-sm divide-y divide-soft-sand">
                        <thead className="bg-creamy-beige/30">
                            <tr>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_country')}</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_duty')}</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_tax')}</th>
                                <th scope="col" className="px-3 py-3 text-left text-xs font-semibold text-warm-terracotta uppercase tracking-wider">{translate('priceStructure_table_notes')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white/80 divide-y divide-soft-sand">
                            {deminimisData.map(item => (
                                <tr key={item.country} className="transition-colors duration-150 hover:bg-creamy-beige/20">
                                    <td className="px-3 py-3 align-top font-semibold text-deep-chocolate">{item.country}</td>
                                    <td className="px-3 py-3 align-top text-stone-700">{item.duty}</td>
                                    <td className="px-3 py-3 align-top text-stone-700">{item.tax}</td>
                                    <td className="px-3 py-3 align-top text-stone-700">{item.notes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-stone-600 mt-4 italic">{translate('priceStructure_deminimisTable_note')}</p>
            </div>

            <div className="text-center mt-8">
                <button onClick={() => setShowLogin(true)} className="text-sm text-stone-500 hover:text-brandAccent-700 transition-colors">
                    {translate('admin_access')}
                </button>
            </div>
        </div>
    );

    const renderAdminView = () => (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-3xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-brandAccent-800">{translate('admin_panelTitle')}</h1>
            <div className="bg-white/50 backdrop-blur-xl p-8 rounded-lg shadow-lg border border-stone-200/50">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="baseDeliveryChargeINT">{translate('admin_baseDeliveryINT')}</label>
                        <input type="number" id="baseDeliveryChargeINT" value={tempSettings.baseDeliveryChargeINT} onChange={handleTempSettingChange} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="perKgDeliveryINT">{translate('admin_perKgDeliveryINT')}</label>
                        <input type="number" id="perKgDeliveryINT" value={tempSettings.perKgDeliveryINT} onChange={handleTempSettingChange} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="internationalSurchargePercentage">{translate('admin_internationalSurcharge')}</label>
                        <input type="number" id="internationalSurchargePercentage" value={tempSettings.internationalSurchargePercentage * 100} onChange={(e) => setTempSettings(p => ({...p, internationalSurchargePercentage: parseFloat(e.target.value) / 100}))} min="0" max="100" step="0.1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm" />
                        <p className="text-xs text-gray-500 mt-1">{translate('admin_surchargeNote')}</p>
                    </div>
                </div>
                 <div className="flex justify-end space-x-4 mt-6">
                    <Button onClick={handleSave} variant="primary">{translate('admin_saveSettings')}</Button>
                    <Button onClick={() => setIsAdmin(false)} variant="secondary">{translate('admin_backToUserView')}</Button>
                </div>
            </div>
        </div>
    );
    
    return (
        <>
            <SEOMetadata titleKey="page_priceStructure_title" descriptionKey="page_priceStructure_description" keywordsKey="page_priceStructure_keywords" pagePath="/price-structure" />
            
            {isAdmin ? renderAdminView() : renderUserView()}

            {showLogin && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
                    <div className="bg-stone-50 p-6 rounded-lg shadow-xl border border-stone-200 w-full max-w-sm">
                        <h2 className="text-xl font-semibold mb-4 text-brandAccent-700">{translate('admin_loginTitle')}</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="admin-password">{translate('admin_password')}</label>
                            <input type="password" id="admin-password" value={password} onChange={e => setPassword(e.target.value)} placeholder={translate('admin_enterPassword')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brandAccent-500 focus:border-brandAccent-500 sm:text-sm" />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setShowLogin(false)} variant="secondary">{translate('admin_cancel')}</Button>
                            <Button onClick={handleLogin} variant="primary">{translate('admin_login')}</Button>
                        </div>
                    </div>
                </div>
            )}

            {message.show && (
                 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center">
                    <div className="bg-stone-50 p-6 rounded-lg shadow-xl border border-stone-200 text-center w-full max-w-sm">
                        <p className="mb-4">{message.text}</p>
                        <Button onClick={() => setMessage({show: false, text: ''})} variant="primary">{translate('ok')}</Button>
                    </div>
                </div>
            )}
        </>
    );
};
