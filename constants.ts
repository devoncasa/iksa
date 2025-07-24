

import React from 'react';
import { NavLink, Fabric, LanguageCode } from './types';
import {
  BreathableIcon, UVProtectionIcon, AntiYellowingIcon, CrispIcon, SoftDrapeIcon, SilkShineIcon, LightweightIcon, CoolTouchIcon, AntiStaticIcon, CreaseResistantIcon, EasyCareIcon,
} from './components/icons';

export const DEFAULT_LANGUAGE: LanguageCode = LanguageCode.EN;

export const LANGUAGES = [
  { code: LanguageCode.EN, name: 'English' },
];

export const NAV_LINKS: NavLink[] = [
  { path: '/', labelKey: 'main' },
  { path: '/about-us', labelKey: 'aboutUs' },
  { path: '/collections', labelKey: 'collections' },
  { path: '/price-structure', labelKey: 'pricing' },
  { path: '/thobe-guide', labelKey: 'thobeGuide' },
  { path: '/for-artisans', labelKey: 'forArtisans' },
  { path: '/artisans-tool', labelKey: 'artisansTool' },
  { path: '/acquire', labelKey: 'acquire' },
  { path: '/checkout', labelKey: 'checkout'},
];

export const MOCK_FABRICS: Fabric[] = [
  { 
    id: 'heritage-weave-23', 
    nameKey: 'fabricEliteHeritageWeave', 
    detailDescriptionKey: 'fabricEliteHeritageWeave_detailDesc',
    professionalBriefingKey: 'fabricIKSAHeritageWeave_proBriefing',
    rollLengthInMeters: 23,
    pricePerRoll: 1060, 
    imageUrl: 'https://i.postimg.cc/BvW4fV2v/fabric-roll-collection-showcase-1.webp', 
    galleryImages: ['https://i.postimg.cc/BvW4fV2v/fabric-roll-collection-showcase-1.webp', 'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp', 'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp', 'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp'],
    features: ['softDrape', 'silkShine', 'breathable', 'creaseResistant'], 
    useCases: ['emiratiKandura', 'qatariThobe', 'luxuryAbaya'],
    feel: ['softFlowing'],
    performance: ['wrinkleResistance'],
    finishKey: 'silkShine', 
    weightKey: 'midWeight', 
    shadeKey: 'pearlWhite', 
    collectionKey: 'heritage',
    widthInMeters: 1.5 
  },
  { 
    id: 'crisp-twill-w-23', 
    nameKey: 'fabricVanguardCrispTwill', 
    detailDescriptionKey: 'fabricVanguardCrispTwill_detailDesc',
    professionalBriefingKey: 'fabricIKSACrispTwill_proBriefing',
    rollLengthInMeters: 23,
    pricePerRoll: 575, 
    imageUrl: 'https://i.postimg.cc/t4d7WvHh/fabric-roll-collection-showcase-2.webp', 
    galleryImages: ['https://i.postimg.cc/t4d7WvHh/fabric-roll-collection-showcase-2.webp', 'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp', 'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp', 'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp'],
    features: ['crisp', 'breathable', 'easyCare', 'antiYellowing'], 
    useCases: ['saudiThobe', 'kuwaitiDishdasha'],
    feel: ['crispStructured'],
    performance: ['breathability', 'durability'],
    finishKey: 'crisp', 
    weightKey: 'midWeight', 
    shadeKey: 'pureWhite', 
    collectionKey: 'heritage',
    widthInMeters: 1.5 
  },
  { 
    id: 'performance-matte-50', 
    nameKey: 'fabricActiveMattePerformance', 
    detailDescriptionKey: 'fabricActiveMattePerformance_detailDesc',
    professionalBriefingKey: 'fabricIKSAPerformanceMatte_proBriefing',
    rollLengthInMeters: 50,
    pricePerRoll: 675, 
    imageUrl: 'https://i.postimg.cc/wMsGtyXw/fabric-roll-collection-showcase-3.webp', 
    galleryImages: ['https://i.postimg.cc/wMsGtyXw/fabric-roll-collection-showcase-3.webp', 'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp', 'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp', 'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp'],
    features: ['coolTouch', 'lightweight', 'antiStatic', 'creaseResistant'], 
    useCases: ['omaniThobe', 'dailyWear'],
    feel: ['coolTouch'],
    performance: ['wrinkleResistance'],
    finishKey: 'matte', 
    weightKey: 'midWeight',
    shadeKey: 'pureWhite', 
    collectionKey: 'performance',
    widthInMeters: 1.5 
  },
  { 
    id: 'feather-silk-23', 
    nameKey: 'fabricSupremeSupimaSilk', 
    detailDescriptionKey: 'fabricSupremeSupimaSilk_detailDesc',
    professionalBriefingKey: 'fabricIKSAFeatherSilk_proBriefing',
    rollLengthInMeters: 23,
    pricePerRoll: 585, 
    imageUrl: 'https://i.postimg.cc/sXq0XkY5/fabric-roll-collection-showcase-4.webp', 
    galleryImages: ['https://i.postimg.cc/sXq0XkY5/fabric-roll-collection-showcase-4.webp', 'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp', 'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp', 'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp'],
    features: ['silkShine', 'softDrape', 'breathable', 'easyCare'], 
    useCases: ['luxuryAbaya', 'emiratiKandura'],
    feel: ['softFlowing'],
    performance: ['breathability'],
    finishKey: 'silkShine', 
    weightKey: 'ultraLight', 
    shadeKey: 'cream', 
    collectionKey: 'heritage',
    widthInMeters: 1.4 
  },
  { 
    id: 'lustre-twill-23', 
    nameKey: 'fabricRadiantLustreTwill', 
    detailDescriptionKey: 'fabricRadiantLustreTwill_detailDesc',
    professionalBriefingKey: 'fabricIKSALustreTwill_proBriefing',
    rollLengthInMeters: 23,
    pricePerRoll: 780, 
    imageUrl: 'https://i.postimg.cc/wBq3y8yF/fabric-roll-shikibo-twill.webp', 
    galleryImages: ['https://i.postimg.cc/wBq3y8yF/fabric-roll-shikibo-twill.webp', 'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp', 'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp', 'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp'],
    features: ['crisp', 'softDrape', 'easyCare', 'antiYellowing'], 
    useCases: ['kuwaitiDishdasha', 'saudiThobe'],
    feel: ['crispStructured'],
    performance: ['durability'],
    finishKey: 'lustrous', 
    weightKey: 'midWeight', 
    shadeKey: 'opticWhite', 
    collectionKey: 'heritage',
    widthInMeters: 1.5 
  },
  { 
    id: 'non-iron-cotton-25', 
    nameKey: 'fabricEffortlessCotton', 
    detailDescriptionKey: 'fabricEffortlessCotton_detailDesc',
    professionalBriefingKey: 'fabricIKSANonIronCotton_proBriefing',
    rollLengthInMeters: 25,
    pricePerRoll: 820, 
    imageUrl: 'https://i.postimg.cc/G3x7zFmC/fabric-roll-nisshinbo-cotton.webp', 
    galleryImages: ['https://i.postimg.cc/G3x7zFmC/fabric-roll-nisshinbo-cotton.webp', 'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp', 'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp', 'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp'],
    features: ['creaseResistant', 'breathable', 'easyCare', 'crisp'], 
    useCases: ['saudiThobe', 'dailyWear'],
    feel: ['crispStructured'],
    performance: ['wrinkleResistance', 'durability'],
    finishKey: 'crisp', 
    weightKey: 'midWeight', 
    shadeKey: 'pureWhite', 
    collectionKey: 'performance',
    widthInMeters: 1.5 
  },
  { 
    id: 'wind-voile-50', 
    nameKey: 'fabricAeroFlowWindVoile', 
    detailDescriptionKey: 'fabricAeroFlowWindVoile_detailDesc',
    professionalBriefingKey: 'fabricIKSAWindVoile_proBriefing',
    rollLengthInMeters: 50,
    pricePerRoll: 620, 
    imageUrl: 'https://i.postimg.cc/cCGJm7jJ/fabric-roll-ichimura-voile.webp', 
    galleryImages: ['https://i.postimg.cc/cCGJm7jJ/fabric-roll-ichimura-voile.webp', 'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp', 'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp', 'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp'],
    features: ['lightweight', 'coolTouch', 'softDrape', 'breathable'], 
    useCases: ['omaniThobe', 'luxuryAbaya', 'dailyWear'],
    feel: ['softFlowing', 'coolTouch'],
    performance: ['breathability'],
    finishKey: 'matte', 
    weightKey: 'ultraLight', 
    shadeKey: 'softCream', 
    collectionKey: 'performance',
    widthInMeters: 1.5 
  },
];

export const GARMENT_SIZES = [
  { key: 'S', nameKey: 'sizeS' },
  { key: 'M', nameKey: 'sizeM' },
  { key: 'L', nameKey: 'sizeL' },
  { key: 'XL', nameKey: 'sizeXL' },
];

export const GARMENT_CATEGORIES = [
  { nameKey: 'garmentCategoryMens', styles: [ { id: 'saudi-thobe', nameKey: 'garmentSaudiThobe', fabricPerSize: { 'S': 2.7, 'M': 2.9, 'L': 3.1, 'XL': 3.3 } }, { id: 'emirati-kandura', nameKey: 'garmentEmiratiKandura', fabricPerSize: { 'S': 2.8, 'M': 3.0, 'L': 3.2, 'XL': 3.4 } }, { id: 'omani-thobe', nameKey: 'garmentOmaniThobe', fabricPerSize: { 'S': 2.6, 'M': 2.8, 'L': 3.0, 'XL': 3.2 } }, { id: 'kuwaiti-dishdasha', nameKey: 'garmentKuwaitiDishdasha', fabricPerSize: { 'S': 2.7, 'M': 2.9, 'L': 3.1, 'XL': 3.3 } } ]},
  { nameKey: 'garmentCategoryWomens', styles: [ { id: 'abaya-standard', nameKey: 'garmentAbayaStandard', fabricPerSize: { 'S': 3.0, 'M': 3.3, 'L': 3.6, 'XL': 3.9 } } ]}
];

export const FABRIC_FILTERS = {
  useCases: [
    { key: 'all', nameKey: 'filterAllUseCases' },
    { key: 'emiratiKandura', nameKey: 'filterUseCaseEmiratiKandura' },
    { key: 'saudiThobe', nameKey: 'filterUseCaseSaudiThobe' },
    { key: 'omaniThobe', nameKey: 'filterUseCaseOmaniThobe' },
    { key: 'qatariThobe', nameKey: 'filterUseCaseQatariThobe' },
    { key: 'kuwaitiDishdasha', nameKey: 'filterUseCaseKuwaitiDishdasha'},
    { key: 'luxuryAbaya', nameKey: 'filterUseCaseLuxuryAbaya' },
  ],
  feel: [
    { key: 'all', nameKey: 'filterAllFeels' },
    { key: 'crispStructured', nameKey: 'filterFeelCrispStructured' },
    { key: 'softFlowing', nameKey: 'filterFeelSoftFlowing' },
    { key: 'coolTouch', nameKey: 'filterFeelCoolTouch' },
  ],
  performance: [
    { key: 'all', nameKey: 'filterAllPerformances' },
    { key: 'wrinkleResistance', nameKey: 'filterPerformanceWrinkleResistance' },
    { key: 'breathability', nameKey: 'filterPerformanceBreathability' },
    { key: 'durability', nameKey: 'filterPerformanceDurability' },
  ],
  rollLengths: [
    { key: 'all', nameKey: 'filterAllRollLengths' },
    { key: '23', nameKey: 'filterRollLength23' },
    { key: '25', nameKey: 'filterRollLength25' },
    { key: '50', nameKey: 'filterRollLength50' },
  ]
};

export const FEATURE_ICONS: Record<string, React.FC<any>> = {
  breathable: BreathableIcon,
  uvProtection: UVProtectionIcon,
  antiYellowing: AntiYellowingIcon,
  crisp: CrispIcon,
  softDrape: SoftDrapeIcon,
  silkShine: SilkShineIcon,
  lightweight: LightweightIcon,
  coolTouch: CoolTouchIcon,
  antiStatic: AntiStaticIcon,
  creaseResistant: CreaseResistantIcon,
  easyCare: EasyCareIcon,
};

export const BACKGROUND_IMAGES = [
  "https://i.postimg.cc/L8YgkMvj/IKSA-The-Thobe-Guide-001.webp",
  "https://i.postimg.cc/Hnvj5SyS/IKSA-The-Thobe-Guide-0010.webp",
  "https://i.postimg.cc/1Rv8Lzjp/IKSA-The-Thobe-Guide-0011.webp",
  "https://i.postimg.cc/htdhz1Pr/IKSA-The-Thobe-Guide-0012.webp",
  "https://i.postimg.cc/QxVFsr2v/IKSA-The-Thobe-Guide-0013.webp",
  "https://i.postimg.cc/CKp5jnRV/IKSA-The-Thobe-Guide-0014.webp",
  "https://i.postimg.cc/L67n8bR5/IKSA-The-Thobe-Guide-0015.webp",
  "https://i.postimg.cc/XvKJxN5B/IKSA-The-Thobe-Guide-0016.webp",
  "https://i.postimg.cc/Kjj8ZnHt/IKSA-The-Thobe-Guide-0017.webp",
  "https://i.postimg.cc/XJVvPMKH/IKSA-The-Thobe-Guide-0018.webp",
  "https://i.postimg.cc/fLBbnHBw/IKSA-The-Thobe-Guide-0019.webp",
  "https://i.postimg.cc/KvsggY7Z/IKSA-The-Thobe-Guide-002.webp",
  "https://i.postimg.cc/4423WSYP/IKSA-The-Thobe-Guide-0020.webp",
  "https://i.postimg.cc/prSXypw4/IKSA-The-Thobe-Guide-0021.webp",
  "https://i.postimg.cc/PrL59QZj/IKSA-The-Thobe-Guide-0022.webp",
  "https://i.postimg.cc/8PqzSfBr/IKSA-The-Thobe-Guide-0023.webp",
  "https://i.postimg.cc/MpVKKZd3/IKSA-The-Thobe-Guide-0024.webp",
  "https://i.postimg.cc/YS724cPr/IKSA-The-Thobe-Guide-0025.webp",
  "https://i.postimg.cc/QMq814Lp/IKSA-The-Thobe-Guide-0026.webp",
  "https://i.postimg.cc/1RBFsBfV/IKSA-The-Thobe-Guide-003.webp",
  "https://i.postimg.cc/fTb9Ld92/IKSA-The-Thobe-Guide-004.webp",
  "https://i.postimg.cc/1zDgTckt/IKSA-The-Thobe-Guide-005.webp",
  "https://i.postimg.cc/cHmv114G/IKSA-The-Thobe-Guide-006.webp",
  "https://i.postimg.cc/kg06fhhz/IKSA-The-Thobe-Guide-007.webp",
  "https://i.postimg.cc/9MV4jw2B/IKSA-The-Thobe-Guide-008.webp",
  "https://i.postimg.cc/HnkVrGVc/IKSA-The-Thobe-Guide-009.webp",
];

export const THOBE_GUIDE_BACKGROUND_IMAGES = [
  "https://i.postimg.cc/L8YgkMvj/IKSA-The-Thobe-Guide-001.webp",
  "https://i.postimg.cc/Hnvj5SyS/IKSA-The-Thobe-Guide-0010.webp",
  "https://i.postimg.cc/1Rv8Lzjp/IKSA-The-Thobe-Guide-0011.webp",
  "https://i.postimg.cc/htdhz1Pr/IKSA-The-Thobe-Guide-0012.webp",
  "https://i.postimg.cc/QxVFsr2v/IKSA-The-Thobe-Guide-0013.webp",
  "https://i.postimg.cc/CKp5jnRV/IKSA-The-Thobe-Guide-0014.webp",
  "https://i.postimg.cc/L67n8bR5/IKSA-The-Thobe-Guide-0015.webp",
  "https://i.postimg.cc/XvKJxN5B/IKSA-The-Thobe-Guide-0016.webp",
  "https://i.postimg.cc/Kjj8ZnHt/IKSA-The-Thobe-Guide-0017.webp",
  "https://i.postimg.cc/XJVvPMKH/IKSA-The-Thobe-Guide-0018.webp",
  "https://i.postimg.cc/fLBbnHBw/IKSA-The-Thobe-Guide-0019.webp",
  "https://i.postimg.cc/KvsggY7Z/IKSA-The-Thobe-Guide-002.webp",
  "https://i.postimg.cc/4423WSYP/IKSA-The-Thobe-Guide-0020.webp",
  "https://i.postimg.cc/prSXypw4/IKSA-The-Thobe-Guide-0021.webp",
  "https://i.postimg.cc/PrL59QZj/IKSA-The-Thobe-Guide-0022.webp",
  "https://i.postimg.cc/8PqzSfBr/IKSA-The-Thobe-Guide-0023.webp",
  "https://i.postimg.cc/MpVKKZd3/IKSA-The-Thobe-Guide-0024.webp",
  "https://i.postimg.cc/YS724cPr/IKSA-The-Thobe-Guide-0025.webp",
  "https://i.postimg.cc/QMq814Lp/IKSA-The-Thobe-Guide-0026.webp",
  "https://i.postimg.cc/1RBFsBfV/IKSA-The-Thobe-Guide-003.webp",
  "https://i.postimg.cc/fTb9Ld92/IKSA-The-Thobe-Guide-004.webp",
  "https://i.postimg.cc/1zDgTckt/IKSA-The-Thobe-Guide-005.webp",
  "https://i.postimg.cc/cHmv114G/IKSA-The-Thobe-Guide-006.webp",
  "https://i.postimg.cc/kg06fhhz/IKSA-The-Thobe-Guide-007.webp",
  "https://i.postimg.cc/9MV4jw2B/IKSA-The-Thobe-Guide-008.webp",
  "https://i.postimg.cc/HnkVrGVc/IKSA-The-Thobe-Guide-009.webp",
];

export const getRandomImage = (sourceArray: string[], excludeUrl: string | null = null): string => {
  if (sourceArray.length === 0) return '';
  if (sourceArray.length === 1) return sourceArray[0];
  
  let newImage;
  do {
    const randomIndex = Math.floor(Math.random() * sourceArray.length);
    newImage = sourceArray[randomIndex];
  } while (newImage === excludeUrl);
  return newImage;
};