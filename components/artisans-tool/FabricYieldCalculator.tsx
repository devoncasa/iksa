
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../Button';
import { MOCK_FABRICS, GARMENT_CATEGORIES, GARMENT_SIZES } from '../../constants';
import { Fabric, GarmentStyle, GarmentSize } from '../../types';
import * as ReactRouterDOM from 'react-router-dom';
import { LightbulbIcon } from '../icons';

interface TipRuleParams {
  fabric: Fabric;
  garmentStyle: GarmentStyle;
  garmentSizeKey: string;
  calculatedYieldValue: number;
  rollLengthNum: number; // Numeric roll length in original unit
  unit: 'meters' | 'yards';
  fabricNameTranslated: string;
  garmentStyleNameTranslated: string;
  garmentSizeNameTranslated: string;
}

interface TipRule {
  condition: (params: TipRuleParams) => boolean;
  tipKeys: string[];
  priority: number;
}

// Define Tip Rules (ordered by decreasing specificity/priority)
const tipRules: TipRule[] = [
  // Tier 10: Highly Specific Garment Style + Fabric Property Combinations
  {
    priority: 10,
    condition: ({ garmentStyle, fabric }) => garmentStyle.id === 'emirati-thobe' && fabric.weightKey === 'ultraLight',
    tipKeys: ['tip_garment_thobe_emirati_lightweight', 'tip_fabric_lightweight_seams', 'tip_fabric_lightweight_handling'],
  },
  {
    priority: 10,
    condition: ({ garmentStyle, fabric }) => garmentStyle.id === 'saudi-thobe' && fabric.finishKey === 'crisp',
    tipKeys: ['tip_garment_thobe_saudi_crisp', 'tip_fabric_crisp_finish_interfacing', 'tip_mistake_interfacing_wrong_type'],
  },
  {
    priority: 10,
    condition: ({ garmentStyle, fabric }) => garmentStyle.id === 'abaya-butterfly' && fabric.widthInMeters >= 1.8,
    tipKeys: ['tip_garment_abaya_butterfly_widefabric', 'tip_fabric_width_wide_efficiency', 'tip_general_layout_planning'],
  },
  {
    priority: 10,
    condition: ({ garmentStyle }) => garmentStyle.id === 'sherwani-coat',
    tipKeys: ['tip_garment_formal_sherwani_jubbah_lining', 'tip_fabric_midweight_structure', 'tip_technique_clipping_grading_seams'],
  },

  // Tier 9: General Garment Category + Fabric Property
  {
    priority: 9,
    condition: ({ garmentStyle, fabric }) => (garmentStyle.id.includes('abaya') || garmentStyle.id.includes('jalabiya')) && fabric.finishKey === 'silkShine',
    tipKeys: ['tip_garment_abaya_sleeve_volume', 'tip_fabric_silkshine_direction', 'tip_general_pressing_care'],
  },
  {
    priority: 9,
    condition: ({ garmentStyle, fabric }) => garmentStyle.id.includes('thobe') && fabric.weightKey === 'midWeight',
    tipKeys: ['tip_garment_thobe_collar_placket_precision', 'tip_fabric_midweight_structure', 'tip_general_seam_allowance_consistency'],
  },
  {
    priority: 9,
    condition: ({ garmentStyle, fabric }) => garmentStyle.id.includes('kurta') && fabric.weightKey === 'ultraLight',
    tipKeys: ['tip_garment_kurta_side_slits', 'tip_fabric_lightweight_handling', 'tip_tool_needles_appropriate'],
  },

  // Tier 8: Specific Fabric Properties (across various garments)
  {
    priority: 8,
    condition: ({ fabric }) => fabric.finishKey === 'silkShine',
    tipKeys: ['tip_fabric_silkshine_direction', 'tip_general_pressing_care', 'tip_mistake_marking_permanent'],
  },
  {
    priority: 8,
    condition: ({ fabric }) => fabric.finishKey === 'crisp',
    tipKeys: ['tip_fabric_crisp_finish_interfacing', 'tip_general_sharp_tools', 'tip_mistake_interfacing_wrong_type'],
  },
  {
    priority: 8,
    condition: ({ fabric }) => fabric.features.includes('coolTouch'),
    tipKeys: ['tip_fabric_lightweight_handling', 'tip_general_pressing_care'],
  },

  // Tier 7: General Fabric Weight
  {
    priority: 7,
    condition: ({ fabric }) => fabric.weightKey === 'ultraLight',
    tipKeys: ['tip_fabric_lightweight_handling', 'tip_fabric_lightweight_seams', 'tip_tool_needles_appropriate'],
  },
  {
    priority: 7,
    condition: ({ fabric }) => fabric.weightKey === 'midWeight',
    tipKeys: ['tip_fabric_midweight_structure', 'tip_general_grainline_accuracy', 'tip_technique_staystitching_necklines_shoulders'],
  },

  // Tier 6: Fabric Width
  {
    priority: 6,
    condition: ({ fabric }) => fabric.widthInMeters >= 1.5,
    tipKeys: ['tip_fabric_width_wide_efficiency', 'tip_general_layout_planning'],
  },
  {
    priority: 6,
    condition: ({ fabric }) => fabric.widthInMeters < 1.4,
    tipKeys: ['tip_fabric_width_narrow_planning', 'tip_mistake_seam_allowance_inconsistent'],
  },

  // Tier 5: Garment Size Specific
  {
    priority: 5,
    condition: ({ garmentSizeKey }) => garmentSizeKey === 'XL' || garmentSizeKey === 'L',
    tipKeys: ['tip_size_large_xl_layout', 'tip_size_large_xl_allowance', 'tip_general_layout_planning'],
  },
  {
    priority: 5,
    condition: ({ garmentSizeKey }) => garmentSizeKey === 'S' || garmentSizeKey === 'M',
    tipKeys: ['tip_size_small_nesting', 'tip_general_scrap_utilization'],
  },
  {
    priority: 5,
    condition: ({ garmentStyle }) => garmentStyle.id.includes('boys') || garmentStyle.id.includes('girls') || garmentStyle.id.includes('school'),
    tipKeys: ['tip_garment_childrens_thobe_abaya_scraps', 'tip_size_children_growth_room', 'tip_general_seam_allowance_consistency'],
  },

  // Tier 4: Yield / Roll Length Specific
  {
    priority: 4,
    condition: ({ calculatedYieldValue }) => calculatedYieldValue >= 20,
    tipKeys: ['tip_yield_high_bulk_cutting', 'tip_yield_high_workflow_organization', 'tip_yield_high_quality_control'],
  },
  {
    priority: 4,
    condition: ({ calculatedYieldValue, rollLengthNum }) => calculatedYieldValue <= 3 && calculatedYieldValue > 0 && rollLengthNum < 15, // Low yield from small roll
    tipKeys: ['tip_yield_low_meticulous_planning', 'tip_yield_low_error_avoidance', 'tip_yield_single_garment_layout', 'tip_roll_end_check_flaws'],
  },

  // Tier 3: General Garment Type (if more specific above not met)
  {
    priority: 3,
    condition: ({ garmentStyle }) => garmentStyle.id.includes('abaya'),
    tipKeys: ['tip_garment_abaya_sleeve_volume', 'tip_garment_abaya_hem_evenness', 'tip_general_pressing_care'],
  },
  {
    priority: 3,
    condition: ({ garmentStyle }) => garmentStyle.id.includes('thobe'),
    tipKeys: ['tip_garment_thobe_collar_placket_precision', 'tip_garment_thobe_pocket_placement', 'tip_technique_staystitching_necklines_shoulders'],
  },
  {
    priority: 3,
    condition: ({ garmentStyle }) => garmentStyle.id.includes('jalabiya'),
    tipKeys: ['tip_garment_jalabiya_embellishment_planning', 'tip_garment_jalabiya_neckline_finish'],
  },
   {
    priority: 3,
    condition: ({ garmentStyle }) => garmentStyle.id.includes('kurta'),
    tipKeys: ['tip_garment_kurta_panel_efficiency', 'tip_garment_kurta_side_slits'],
  },
  {
    priority: 3,
    condition: ({ garmentStyle }) => garmentStyle.id.includes('scarf') || garmentStyle.id.includes('hijab') || garmentStyle.id.includes('shayla') || garmentStyle.id.includes('khimar') || garmentStyle.id.includes('niqab'),
    tipKeys: ['tip_garment_scarf_hijab_edges', 'tip_fabric_lightweight_seams', 'tip_mistake_marking_permanent'],
  },

  // Tier 2: Common Mistakes / Cautions / Important General
  {
    priority: 2,
    condition: () => true,
    tipKeys: [
      'tip_mistake_grainline_effect',
      'tip_mistake_pressing_direct_heat',
      'tip_mistake_marking_permanent',
      'tip_mistake_seam_allowance_inconsistent',
      'tip_caution_prewashing_shrinkage',
      'tip_caution_cutting_accuracy',
      'tip_general_pattern_preparation',
      'tip_general_clean_workspace',
      'tip_general_rest_fabric',
    ],
  },

  // Tier 1: Default General Tips (Broadest Fallbacks)
  {
    priority: 1,
    condition: () => true,
    tipKeys: [
      'tip_general_default',
      'tip_general_layout_planning',
      'tip_general_sharp_tools',
      'tip_general_scrap_utilization',
      'tip_general_grainline_accuracy',
      'tip_general_pressing_care',
      'tip_tool_rotary_cutter_mat',
      'tip_tool_needles_appropriate',
      'tip_tool_thread_quality',
      'tip_technique_understitching_facings',
    ],
  },
];

const determineNumTips = (garmentStyle: GarmentStyle, translate: (key: string, subKey?: string) => string): number => {
    const id = garmentStyle.id.toLowerCase();
    const name = translate(garmentStyle.nameKey).toLowerCase();

    if (id.includes('sherwani') || id.includes('jubbah') || id.includes('chador') || id.includes('burqa') ||
        id.includes('butterfly') || id.includes('umbrella') ||
        name.includes('wedding') || name.includes('luxury') || name.includes('formal')) {
      return 5;
    }
    if (id.includes('hijab') || id.includes('niqab') || id.includes('wasat') || id.includes('shayla')) {
      return 3;
    }
    return 4;
  };

export const FabricYieldCalculator: React.FC = () => {
  const { translate } = useLanguage();
  const [searchParams] = ReactRouterDOM.useSearchParams();
  const allGarmentStyles = useMemo(() => GARMENT_CATEGORIES.flatMap(category => category.styles), []);


  const [selectedFabricId, setSelectedFabricId] = useState<string>('');
  const [rollLength, setRollLength] = useState<string>('');
  const [lengthUnit, setLengthUnit] = useState<'meters' | 'yards'>('meters');
  const [fabricWidth, setFabricWidth] = useState<'150' | '110'>('150');
  const [patternType, setPatternType] = useState<'solid' | 'small' | 'large'>('solid');
  const [selectedGarmentStyleId, setSelectedGarmentStyleId] = useState<string>('');
  const [selectedGarmentSize, setSelectedGarmentSize] = useState<string>(GARMENT_SIZES.length > 0 ? GARMENT_SIZES[0].key : '');
  const [calculatedYield, setCalculatedYield] = useState<number | null>(null);
  const [offlineAdvice, setOfflineAdvice] = useState<string[]>([]);


  useEffect(() => {
    const fabricIdFromUrl = searchParams.get('fabric');
    if (fabricIdFromUrl && MOCK_FABRICS.find(f => f.id === fabricIdFromUrl)) {
      setSelectedFabricId(fabricIdFromUrl);
    } else if (MOCK_FABRICS.length > 0) {
      const sundusEquivalent = MOCK_FABRICS.find(f => f.nameKey === 'fabricDesertPearl');
      if (sundusEquivalent) {
        setSelectedFabricId(sundusEquivalent.id);
      } else {
        setSelectedFabricId(MOCK_FABRICS[0].id);
      }
    }
    if (allGarmentStyles.length > 0 && !selectedGarmentStyleId) {
      setSelectedGarmentStyleId(allGarmentStyles[0].id);
    }
    if (GARMENT_SIZES.length > 0) {
        setSelectedGarmentSize(GARMENT_SIZES[0].key);
    }
    // No return needed for this useEffect if no cleanup is necessary
  }, [searchParams, allGarmentStyles, selectedGarmentStyleId]);

  const getOfflineOptimizationTip = useCallback((
    fabricInput: Fabric | undefined,
    garmentStyleInput: GarmentStyle | undefined,
    garmentSizeKey: string,
    currentRollLengthStr: string,
    unit: 'meters' | 'yards',
    calculatedYieldValue: number
  ): string[] => {
    const fabric = fabricInput;
    const garmentStyle = garmentStyleInput;

    if (!fabric || !garmentStyle) {
      const defaultTipKey = 'tip_general_default';
      const defaultTip = translate('optimizationTips', defaultTipKey);
      return defaultTip !== `optimizationTips.${defaultTipKey}` ? [defaultTip] : ["Plan your layout carefully."];
    }

    const rollLengthNum = parseFloat(currentRollLengthStr) || 0;
    const garmentSizeDetails = GARMENT_SIZES.find(s => s.key === garmentSizeKey);

    const params: TipRuleParams = {
      fabric,
      garmentStyle,
      garmentSizeKey,
      calculatedYieldValue,
      rollLengthNum,
      unit,
      fabricNameTranslated: translate(fabric.nameKey),
      garmentStyleNameTranslated: translate(garmentStyle.nameKey),
      garmentSizeNameTranslated: garmentSizeDetails ? translate(garmentSizeDetails.nameKey) : garmentSizeKey,
    };

    const numTipsToShow = determineNumTips(garmentStyle, translate);
    const candidateTipKeys: string[] = [];

    const sortedRules = [...tipRules].sort((a, b) => b.priority - a.priority);
    for (const rule of sortedRules) {
      if (rule.condition(params)) {
        candidateTipKeys.push(...rule.tipKeys);
      }
    }

    const uniqueCandidateTipKeys = Array.from(new Set(candidateTipKeys));

    const shuffledUniqueTipKeys = uniqueCandidateTipKeys.sort(() => 0.5 - Math.random());
    const selectedTipKeys = shuffledUniqueTipKeys.slice(0, numTipsToShow);

    const translatedTips = selectedTipKeys.map(tipKey => {
      let tipText = translate('optimizationTips', tipKey);
      if (typeof tipText === 'string') {
        // Ensure placeholders are robustly replaced
        tipText = tipText.replace(/\$\{\s*fabricName\s*\}/g, params.fabricNameTranslated);
        tipText = tipText.replace(/\$\{\s*garmentStyleName\s*\}/g, params.garmentStyleNameTranslated);
        tipText = tipText.replace(/\$\{\s*garmentSizeName\s*\}/g, params.garmentSizeNameTranslated);
        tipText = tipText.replace(/\$\{\s*fabricWidth\s*\}/g, params.fabric.widthInMeters.toString());
        tipText = tipText.replace(/\$\{\s*calculatedYieldValue\s*\}/g, params.calculatedYieldValue.toString());
        tipText = tipText.replace(/\$\{\s*currentRollLength\s*\}/g, params.rollLengthNum.toString());
        tipText = tipText.replace(/\$\{\s*unit\s*\}/g, translate(params.unit));
        return tipText;
      }
      return `Error: Tip for ${tipKey} is not a string.`;
    });

    const finalTips = translatedTips.filter(tip =>
        typeof tip === 'string' &&
        !tip.startsWith('optimizationTips.') &&
        !tip.startsWith('Error:')
    );


    if (finalTips.length === 0) {
      const defaultTipKey = 'tip_general_default';
      const defaultTipText = translate('optimizationTips', defaultTipKey);
      const isDefaultTipValid = typeof defaultTipText === 'string' &&
                               !defaultTipText.startsWith(`optimizationTips.${defaultTipKey}`) &&
                               !defaultTipText.startsWith('Error:');
      return isDefaultTipValid ? [defaultTipText] : ["Always double-check measurements before cutting."];
    }

    return finalTips;
  }, [translate]);


  const handleCalculate = () => {
    const fabric = MOCK_FABRICS.find(f => f.id === selectedFabricId);
    const garmentStyle = allGarmentStyles.find(gs => gs.id === selectedGarmentStyleId);
    const rollLengthNum = parseFloat(rollLength);

    if (!fabric || !garmentStyle || isNaN(rollLengthNum) || rollLengthNum <= 0) {
      setCalculatedYield(null);
      setOfflineAdvice([]);
      return;
    }
    
    // Factors based on new inputs
    const widthFactor = fabricWidth === '110' ? 1.3 : 1.0; // 30% more length for narrow fabric
    let patternFactor = 1.0;
    if (patternType === 'small') patternFactor = 1.1; // 10% more for small patterns
    if (patternType === 'large') patternFactor = 1.2; // 20% more for large patterns

    const baseRequirement = garmentStyle.fabricPerSize[selectedGarmentSize] || 0;
    if (baseRequirement <= 0) {
      setCalculatedYield(null);
      return;
    }
    
    // Adjust the base requirement with the factors
    const adjustedRequirement = baseRequirement * widthFactor * patternFactor;

    let actualRollLengthMeters = rollLengthNum;
    if (lengthUnit === 'yards') {
      actualRollLengthMeters = rollLengthNum * 0.9144;
    }

    const yieldValue = Math.floor(actualRollLengthMeters / adjustedRequirement);
    setCalculatedYield(yieldValue);
  };

  useEffect(() => {
    if (calculatedYield !== null) {
      const fabric = MOCK_FABRICS.find(f => f.id === selectedFabricId);
      const garmentStyle = allGarmentStyles.find(gs => gs.id === selectedGarmentStyleId);
      if (fabric && garmentStyle) {
        const tips = getOfflineOptimizationTip(fabric, garmentStyle, selectedGarmentSize, rollLength, lengthUnit, calculatedYield);
        setOfflineAdvice(tips);
      } else {
         const defaultTipKey = 'tip_general_default';
         const defaultTip = translate('optimizationTips', defaultTipKey);
         setOfflineAdvice(defaultTip !== `optimizationTips.${defaultTipKey}` ? [defaultTip] : ["Plan carefully."]);
      }
    } else {
      setOfflineAdvice([]);
    }
  }, [calculatedYield, selectedFabricId, selectedGarmentStyleId, selectedGarmentSize, rollLength, lengthUnit, getOfflineOptimizationTip, translate, allGarmentStyles]);


  const selectedFabricObject = MOCK_FABRICS.find(f => f.id === selectedFabricId);
  const selectedGarmentStyleObject = allGarmentStyles.find(gs => gs.id === selectedGarmentStyleId);
  const selectedGarmentSizeObject = GARMENT_SIZES.find(s => s.key === selectedGarmentSize);

  const selectClassName = "w-full bg-white/80 border border-brandAccent-700 text-stone-800 rounded-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors text-sm";
  const selectOptionClassName = "bg-white text-stone-800 font-medium";

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-stone-200/50 transition-all duration-700 ease-in-out delay-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Step 1 & 2 */}
            <div>
              <label htmlFor="fabric-select" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('selectFabric')}</label>
              <select
                id="fabric-select"
                value={selectedFabricId}
                onChange={(e) => setSelectedFabricId(e.target.value)}
                className={selectClassName}
              >
                {MOCK_FABRICS.map(fabric => (
                  <option key={fabric.id} value={fabric.id} className={selectOptionClassName}>{translate(fabric.nameKey)}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="roll-length" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('enterRollLength')}</label>
              <div className="flex">
                <input
                  type="number"
                  id="roll-length"
                  value={rollLength}
                  onChange={(e) => setRollLength(e.target.value)}
                  placeholder="e.g., 50"
                  min="0"
                  className="w-2/3 bg-white/80 border border-stone-300 text-stone-700 rounded-l-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors text-sm"
                />
                <select
                  value={lengthUnit}
                  onChange={(e) => setLengthUnit(e.target.value as 'meters' | 'yards')}
                  className="w-1/3 bg-stone-100/80 border-y border-r border-stone-300 text-stone-700 rounded-r-md py-3 px-3.5 focus:ring-brandAccent-700 focus:border-brandAccent-700 transition-colors text-sm"
                  aria-label="Select length unit"
                >
                  <option value="meters">{translate('meters')}</option>
                  <option value="yards">{translate('yards')}</option>
                </select>
              </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             {/* Step 3 & 4 */}
            <div>
                <label htmlFor="fabric-width" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('chooseFabricWidth')}</label>
                <select
                    id="fabric-width"
                    value={fabricWidth}
                    onChange={(e) => setFabricWidth(e.target.value as '150' | '110')}
                    className={selectClassName}
                >
                    <option value="150" className={selectOptionClassName}>{translate('fabricWidthStandard')}</option>
                    <option value="110" className={selectOptionClassName}>{translate('fabricWidthNarrow')}</option>
                </select>
            </div>
            <div>
                <label htmlFor="pattern-type" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('choosePatternType')}</label>
                <select
                    id="pattern-type"
                    value={patternType}
                    onChange={(e) => setPatternType(e.target.value as 'solid' | 'small' | 'large')}
                    className={selectClassName}
                >
                    <option value="solid" className={selectOptionClassName}>{translate('patternSolid')}</option>
                    <option value="small" className={selectOptionClassName}>{translate('patternSmallRepeat')}</option>
                    <option value="large" className={selectOptionClassName}>{translate('patternLargeRepeat')}</option>
                </select>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Step 5 & 6 */}
            <div>
              <label htmlFor="garment-style" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('chooseGarmentStyle')}</label>
              <select
                id="garment-style"
                value={selectedGarmentStyleId}
                onChange={(e) => setSelectedGarmentStyleId(e.target.value)}
                className={selectClassName}
              >
                {GARMENT_CATEGORIES.map(category => (
                  <optgroup key={category.nameKey} label={translate(category.nameKey)}>
                    {category.styles.map(style => (
                      <option key={style.id} value={style.id} className={selectOptionClassName}>{translate(style.nameKey)}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="garment-size" className="block text-sm font-medium text-stone-600 mb-1.5">{translate('chooseGarmentSize')}</label>
              <select
                id="garment-size"
                value={selectedGarmentSize}
                onChange={(e) => setSelectedGarmentSize(e.target.value)}
                className={selectClassName}
              >
                {GARMENT_SIZES.map(size => (
                  <option key={size.key} value={size.key} className={selectOptionClassName}>{translate(size.nameKey)}</option>
                ))}
              </select>
            </div>
      </div>

      <Button type="button" onClick={handleCalculate} fullWidth size="lg" className="mb-8 py-3.5">
        {translate('calculate')}
      </Button>

      {calculatedYield !== null && selectedFabricObject && selectedGarmentStyleObject && selectedGarmentSizeObject && (
        <div className="mt-8 p-6 bg-brandAccent-50/70 backdrop-blur-sm rounded-lg text-center border border-brandAccent-200">
          <p className="text-stone-700 text-lg mb-2">
            {translate('calculatorResultIntro')
               .replace('{garmentSize}', translate(selectedGarmentSizeObject.nameKey))
               .replace('{garmentStyle}', translate(selectedGarmentStyleObject.nameKey))
               .replace('{fabricName}', translate(selectedFabricObject.nameKey))
               .replace('{rollLength}', rollLength)
               .replace('{unit}', translate(lengthUnit))
            }
          </p>
          <p className="text-4xl font-bold text-brandAccent-700 mb-3">{calculatedYield} <span className="text-2xl font-normal">{translate('pieces')}</span></p>
          <p className="text-xs text-red-600 font-bold italic">{translate('calculatorDisclaimer')}</p>
        </div>
      )}

      {offlineAdvice.length > 0 && calculatedYield !== null && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-brandAccent-700 mb-5 text-center flex items-center justify-center">
            <LightbulbIcon className="w-7 h-7 mr-3 text-brandAccent-600" />
            {translate('optimizationTipsTitle')}
          </h3>
          <ul className="space-y-3 list-none pl-0 text-sm">
            {offlineAdvice.map((tip, index) => (
              <li key={index} className="p-4 bg-stone-50/70 backdrop-blur-sm rounded-md border border-stone-200 text-stone-700 leading-relaxed shadow-sm">
                {tip}
              </li>
            ))}
          </ul>
           <div className="mt-6 text-center">
                <ReactRouterDOM.Link to="/for-artisans">
                    <Button variant="outline" size="sm">
                        {translate('forArtisans_pageTitle')}
                    </Button>
                </ReactRouterDOM.Link>
            </div>
        </div>
      )}
    </div>
  );
};
