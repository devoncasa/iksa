

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

export const COLOR_PALETTE: Record<string, { nameKey: string, className: string }> = {
  white: { nameKey: 'colorWhite', className: 'bg-white border-stone-300' },
  black: { nameKey: 'colorBlack', className: 'bg-black' },
  earthTones: { nameKey: 'colorEarthTones', className: 'bg-warm-terracotta' },
  grey: { nameKey: 'colorGrey', className: 'bg-stone-500' },
  blue: { nameKey: 'colorBlue', className: 'bg-blue-800' },
  green: { nameKey: 'colorGreen', className: 'bg-green-800' },
  redMaroon: { nameKey: 'colorRedMaroon', className: 'bg-red-800' },
};

export const COLOR_MARKUPS: Record<string, { markup: number, infoKey: string }> = {
  white: { markup: 0, infoKey: 'colorInfo_white' },
  black: { markup: 0.25, infoKey: 'colorInfo_black' }, // 25%
  redMaroon: { markup: 0.22, infoKey: 'colorInfo_redMaroon' }, // 22%
  blue: { markup: 0.18, infoKey: 'colorInfo_blue' }, // 18%
  green: { markup: 0.18, infoKey: 'colorInfo_green' }, // 18%
  earthTones: { markup: 0.15, infoKey: 'colorInfo_earthTones' }, // 15%
  grey: { markup: 0.15, infoKey: 'colorInfo_grey' }, // 15%
};

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
    widthInMeters: 1.5,
    availableColors: ['white', 'black', 'earthTones', 'blue']
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
    widthInMeters: 1.5,
    availableColors: ['white', 'black', 'grey', 'redMaroon']
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
    widthInMeters: 1.5,
    availableColors: ['white', 'black', 'grey', 'blue']
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
    widthInMeters: 1.4,
    availableColors: ['white', 'earthTones', 'green']
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
    widthInMeters: 1.5,
    availableColors: ['white', 'black']
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
    widthInMeters: 1.5,
    availableColors: ['white', 'black', 'blue']
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
    widthInMeters: 1.5,
    availableColors: ['white', 'earthTones']
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

export const BACKGROUND_IMAGES: string[] = [
  'https://i.postimg.cc/BvW4fV2v/fabric-roll-collection-showcase-1.webp',
  'https://i.postimg.cc/t4d7WvHh/fabric-roll-collection-showcase-2.webp',
  'https://i.postimg.cc/wMsGtyXw/fabric-roll-collection-showcase-3.webp',
  'https://i.postimg.cc/sXq0XkY5/fabric-roll-collection-showcase-4.webp',
  'https://i.postimg.cc/wBq3y8yF/fabric-roll-shikibo-twill.webp',
  'https://i.postimg.cc/G3x7zFmC/fabric-roll-nisshinbo-cotton.webp',
  'https://i.postimg.cc/cCGJm7jJ/fabric-roll-ichimura-voile.webp',
  'https://i.postimg.cc/y8gS2k42/about-us-summary.webp',
  'https://i.postimg.cc/50v2f5fK/artisans-tool-summary.webp',
  'https://i.postimg.cc/j2pT7Pq5/fabric-detail-drape.webp',
  'https://i.postimg.cc/KzT5V0hB/fabric-detail-texture.webp',
  'https://i.postimg.cc/W1SbcL5L/IKSA-hero-background-001.webp',
  'https://i.postimg.cc/sgfscHsn/IKSA-hero-background-0010.webp',
  'https://i.postimg.cc/XY23DKvn/IKSA-hero-background-0011.webp',
  'https://i.postimg.cc/g0nd9ww8/IKSA-hero-background-0012.webp',
  'https://i.postimg.cc/R0ymvMf8/IKSA-hero-background-0013.webp',
  'https://i.postimg.cc/Qt73tRJM/IKSA-hero-background-0014.webp',
  'https://i.postimg.cc/D0KKbBxP/IKSA-hero-background-0015.webp',
  'https://i.postimg.cc/1Xc10wTh/IKSA-hero-background-0016.webp',
  'https://i.postimg.cc/FzjNP2Y6/IKSA-hero-background-002.webp',
  'https://i.postimg.cc/PqRXNbGS/IKSA-hero-background-003.webp',
  'https://i.postimg.cc/Bv6ZqYz8/IKSA-hero-background-004.webp',
  'https://i.postimg.cc/wvR6Ntgg/IKSA-hero-background-005.webp',
  'https://i.postimg.cc/sDrVBD8C/IKSA-hero-background-006.webp',
  'https://i.postimg.cc/L5dm3H8f/IKSA-hero-background-007.webp',
  'https://i.postimg.cc/mZML2FmS/IKSA-hero-background-008.webp',
  'https://i.postimg.cc/DyP713kJ/IKSA-hero-background-009.webp',
];

export const THOBE_GUIDE_BACKGROUND_IMAGES: string[] = [
  'https://i.postimg.cc/q7x2D1rD/article-regional-styles.webp',
  'https://i.postimg.cc/5N18qDML/article-sundus-casa.webp',
  'https://i.postimg.cc/9Q2w0h1G/article-fabric-science.webp',
  'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp',
  'https://i.postimg.cc/k4GkYyv0/inspiration-abaya.webp',
  'https://i.postimg.cc/L8YgkMvj/IKSA-The-Thobe-Guide-001.webp',
  'https://i.postimg.cc/Hnvj5SyS/IKSA-The-Thobe-Guide-0010.webp',
  'https://i.postimg.cc/1Rv8Lzjp/IKSA-The-Thobe-Guide-0011.webp',
  'https://i.postimg.cc/htdhz1Pr/IKSA-The-Thobe-Guide-0012.webp',
  'https://i.postimg.cc/QxVFsr2v/IKSA-The-Thobe-Guide-0013.webp',
  'https://i.postimg.cc/CKp5jnRV/IKSA-The-Thobe-Guide-0014.webp',
  'https://i.postimg.cc/L67n8bR5/IKSA-The-Thobe-Guide-0015.webp',
  'https://i.postimg.cc/XvKJxN5B/IKSA-The-Thobe-Guide-0016.webp',
  'https://i.postimg.cc/Kjj8ZnHt/IKSA-The-Thobe-Guide-0017.webp',
  'https://i.postimg.cc/XJVvPMKH/IKSA-The-Thobe-Guide-0018.webp',
  'https://i.postimg.cc/fLBbnHBw/IKSA-The-Thobe-Guide-0019.webp',
  'https://i.postimg.cc/KvsggY7Z/IKSA-The-Thobe-Guide-002.webp',
  'https://i.postimg.cc/1RBFsBfV/IKSA-The-Thobe-Guide-003.webp',
  'https://i.postimg.cc/fTb9Ld92/IKSA-The-Thobe-Guide-004.webp',
  'https://i.postimg.cc/1zDgTckt/IKSA-The-Thobe-Guide-005.webp',
  'https://i.postimg.cc/cHmv114G/IKSA-The-Thobe-Guide-006.webp',
  'https://i.postimg.cc/kg06fhhz/IKSA-The-Thobe-Guide-007.webp',
  'https://i.postimg.cc/9MV4jw2B/IKSA-The-Thobe-Guide-008.webp',
  'https://i.postimg.cc/HnkVrGVc/IKSA-The-Thobe-Guide-009.webp',
];

export const getRandomImage = (imageArray: string[], currentImage?: string): string => {
  if (!imageArray || imageArray.length === 0) {
    return ''; // Return a default or empty string if the array is invalid
  }
  
  if (imageArray.length === 1) {
    return imageArray[0];
  }

  let newImage;
  do {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    newImage = imageArray[randomIndex];
  } while (newImage === currentImage);

  return newImage;
};