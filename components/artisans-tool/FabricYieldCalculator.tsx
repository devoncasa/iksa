
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../Button';
import { GARMENT_STYLES_ADVANCED, GARMENT_SIZES_ADVANCED } from '../../constants';
import { CalculatorIcon } from '../icons';

const InputField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-stone-600 mb-1.5">{label}</label>
    {children}
  </div>
);

const OutputField: React.FC<{ label: string; value: string; unit: string }> = ({ label, value, unit }) => (
  <div className="bg-stone-50/70 p-4 rounded-md text-center border border-stone-200/50 flex flex-col justify-center min-h-[6rem]">
    <dt className="text-sm font-medium text-stone-500 whitespace-normal">{label}</dt>
    <dd className="mt-1 text-2xl font-semibold text-brandAccent-800">
      {value} <span className="text-lg font-normal text-stone-600">{unit}</span>
    </dd>
  </div>
);

export const FabricYieldCalculator: React.FC = () => {
  const { translate } = useLanguage();

  // --- STATE FOR INPUTS ---
  const [selectedGarmentId, setSelectedGarmentId] = useState(GARMENT_STYLES_ADVANCED[0].id);
  const [quantity, setQuantity] = useState('10');
  const [selectedSizeKey, setSelectedSizeKey] = useState('M');
  const [rollLength, setRollLength] = useState('23');
  const [fabricWidth, setFabricWidth] = useState<'wide' | 'narrow'>('wide');
  const [patternType, setPatternType] = useState<'solid' | 'small' | 'large'>('solid');
  const [costPerMeter, setCostPerMeter] = useState('');

  // --- CALCULATION ENGINE ---
  const results = useMemo(() => {
    const garment = GARMENT_STYLES_ADVANCED.find(g => g.id === selectedGarmentId);
    const size = GARMENT_SIZES_ADVANCED.find(s => s.key === selectedSizeKey);
    const numQuantity = parseFloat(quantity) || 0;
    const numRollLength = parseFloat(rollLength) || 0;
    const numCostPerMeter = parseFloat(costPerMeter) || 0;

    if (!garment || !size || numQuantity <= 0 || numRollLength <= 0) {
      return null;
    }

    // Level 2: Advanced Variables
    const sizeMultiplier = size.multiplier;
    const widthEfficiencyFactor = fabricWidth === 'narrow' ? 1.10 : 1.0;
    const patternWasteFactor = { solid: 1.0, small: 1.05, large: 1.15 }[patternType];
    
    // Level 3: Master Formula
    const adjustedFabric = garment.baseRequirement * sizeMultiplier * widthEfficiencyFactor * patternWasteFactor;

    // Level 1: Core Engine
    const garmentsPerRoll = adjustedFabric > 0 ? Math.floor(numRollLength / adjustedFabric) : 0;
    const totalFabricNeeded = numQuantity * adjustedFabric;
    const totalRolls = numRollLength > 0 ? Math.ceil(totalFabricNeeded / numRollLength) : 0;
    const remnantFabric = adjustedFabric > 0 ? numRollLength % adjustedFabric : numRollLength;

    // Bonus: Cost Calculation
    const totalFabricCost = totalFabricNeeded * numCostPerMeter;
    const costPerGarment = numQuantity > 0 ? totalFabricCost / numQuantity : 0;

    return {
      adjustedFabric: adjustedFabric.toFixed(2),
      totalFabricNeeded: totalFabricNeeded.toFixed(2),
      totalRolls: totalRolls.toString(),
      garmentsPerRoll: garmentsPerRoll.toString(),
      remnantFabric: remnantFabric.toFixed(2),
      totalFabricCost: totalFabricCost.toFixed(2),
      costPerGarment: costPerGarment.toFixed(2),
      hasCost: numCostPerMeter > 0
    };
  }, [selectedGarmentId, quantity, selectedSizeKey, rollLength, fabricWidth, patternType, costPerMeter]);

  const selectClassName = "w-full bg-white/80 border border-stone-300 text-stone-800 rounded-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors duration-150 ease-in-out text-sm";
  const inputClassName = `${selectClassName} placeholder:text-stone-400`;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <InputField label={translate('chooseGarmentStyle')}>
          <select value={selectedGarmentId} onChange={e => setSelectedGarmentId(e.target.value)} className={selectClassName}>
            {GARMENT_STYLES_ADVANCED.map(g => <option key={g.id} value={g.id}>{translate(g.nameKey)}</option>)}
          </select>
        </InputField>

        <InputField label={translate('calculator_quantity')}>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} min="1" className={inputClassName} />
        </InputField>

        <InputField label={translate('chooseGarmentSize')}>
          <select value={selectedSizeKey} onChange={e => setSelectedSizeKey(e.target.value)} className={selectClassName}>
            {GARMENT_SIZES_ADVANCED.map(s => <option key={s.key} value={s.key}>{translate(s.nameKey)}</option>)}
          </select>
        </InputField>

        <InputField label={translate('calculator_rollLength')}>
          <div className="flex">
            <input type="number" value={rollLength} onChange={e => setRollLength(e.target.value)} min="1" className={`${inputClassName} rounded-r-none`} />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-stone-300 bg-stone-50 text-stone-500 text-sm">
              {translate('meters')}
            </span>
          </div>
        </InputField>
        
        <InputField label={translate('chooseFabricWidth')}>
          <select value={fabricWidth} onChange={e => setFabricWidth(e.target.value as 'wide' | 'narrow')} className={selectClassName}>
            <option value="wide">{translate('fabricWidthStandard')}</option>
            <option value="narrow">{translate('fabricWidthNarrow')}</option>
          </select>
        </InputField>

        <InputField label={translate('choosePatternType')}>
          <select value={patternType} onChange={e => setPatternType(e.target.value as 'solid' | 'small' | 'large')} className={selectClassName}>
            <option value="solid">{translate('patternSolid')}</option>
            <option value="small">{translate('patternSmallRepeat')}</option>
            <option value="large">{translate('patternLargeRepeat')}</option>
          </select>
        </InputField>
      </div>

      <div className="border-t border-stone-200/80 pt-6">
        <InputField label={`${translate('calculator_costPerMeter')} ${translate('calculator_optional')}`}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input 
              type="number" 
              value={costPerMeter} 
              onChange={e => setCostPerMeter(e.target.value)} 
              min="0"
              step="0.01"
              className={`${inputClassName} pl-7`}
              placeholder="0.00"
            />
          </div>
        </InputField>
      </div>

      {results && (
        <div className="mt-10 p-6 bg-brandAccent-50/60 backdrop-blur-sm rounded-lg border border-brandAccent-200">
          <h3 className="text-2xl font-semibold text-brandAccent-700 mb-5 text-center flex items-center justify-center">
            <CalculatorIcon className="w-6 h-6 mr-3" />
            {translate('calculator_outputs_title')}
          </h3>
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <OutputField label={translate('calculator_adjustedFabricPerGarment')} value={results.adjustedFabric} unit="m" />
            <OutputField label={translate('calculator_totalFabricRequired')} value={results.totalFabricNeeded} unit="m" />
            <OutputField label={translate('calculator_rollsToPurchase')} value={results.totalRolls} unit={translate('rolls')} />
            <OutputField label={translate('calculator_garmentsPerRoll')} value={results.garmentsPerRoll} unit={translate('pieces')} />
            <OutputField label={translate('calculator_remnantFabricPerRoll')} value={results.remnantFabric} unit="m" />
          </dl>
          
          {results.hasCost && (
            <div className="mt-6 pt-6 border-t border-brandAccent-200/50">
              <h4 className="text-lg font-semibold text-brandAccent-700 mb-4 text-center">{translate('calculator_bonus_cost_title')}</h4>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <OutputField label={translate('calculator_totalFabricCost')} value={`$${results.totalFabricCost}`} unit="" />
                <OutputField label={translate('calculator_costPerGarment')} value={`$${results.costPerGarment}`} unit="" />
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
