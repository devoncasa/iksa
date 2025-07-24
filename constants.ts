

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
  { path: '/contact', labelKey: 'contact' },
  { path: '/checkout', labelKey: 'checkout'},
];

export const SOCIAL_MEDIA_LINKS = [
    { name: 'Facebook', icon: 'https://i.postimg.cc/YCMfNbVb/facebook.webp', url: `https://facebook.com/iksatextile` },
    { name: 'Instagram', icon: 'https://i.postimg.cc/P5ybS1nh/instagram.webp', url: `https://instagram.com/iksatextile` },
    { name: 'TikTok', icon: 'https://i.postimg.cc/cJJR26d3/tiktok.webp', url: `https://tiktok.com/@iksatextile` },
    { name: 'YouTube', icon: 'https://i.postimg.cc/hG3LBgG5/youtube.webp', url: `https://youtube.com/@iksatextile` },
    { name: 'LinkedIn', icon: 'https://i.postimg.cc/bNXRrzRX/linkedin.webp', url: `https://linkedin.com/company/iksatextile` },
    { name: 'Twitter', icon: 'https://i.postimg.cc/632d6S25/twitter.webp', url: `https://twitter.com/iksatextile` },
    { name: 'Pinterest', icon: 'https://i.postimg.cc/JnfjsqZ3/pinterest.webp', url: `https://pinterest.com/iksatextile` },
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

export const SECTION_BACKGROUND_IMAGES: string[] = [
  "https://i.postimg.cc/FK3XkcH5/IKSA-section-background-0011.webp",
  "https://i.postimg.cc/T35ZBmmL/IKSA-section-background-00110.webp",
  "https://i.postimg.cc/SNvBZVXb/IKSA-section-background-00111.webp",
  "https://i.postimg.cc/TP8Zxwqk/IKSA-section-background-00112.webp",
  "https://i.postimg.cc/yNF28HL7/IKSA-section-background-00113.webp",
  "https://i.postimg.cc/4dPMp1CM/IKSA-section-background-00114.webp",
  "https://i.postimg.cc/B64k8VzH/IKSA-section-background-00115.webp",
  "https://i.postimg.cc/gj07s6m0/IKSA-section-background-00116.webp",
  "https://i.postimg.cc/XqDzz7Yk/IKSA-section-background-00117.webp",
  "https://i.postimg.cc/vHkK7BjQ/IKSA-section-background-00118.webp",
  "https://i.postimg.cc/y8RbLK40/IKSA-section-background-00119.webp",
  "https://i.postimg.cc/kgVm9Lr5/IKSA-section-background-0012.webp",
  "https://i.postimg.cc/sDv8ZST6/IKSA-section-background-00120.webp",
  "https://i.postimg.cc/KYysVWxw/IKSA-section-background-00121.webp",
  "https://i.postimg.cc/3NWLm5F4/IKSA-section-background-00122.webp",
  "https://i.postimg.cc/GpJS1jp2/IKSA-section-background-00123.webp",
  "https://i.postimg.cc/vBY2861v/IKSA-section-background-00124.webp",
  "https://i.postimg.cc/MT9PnKVJ/IKSA-section-background-00125.webp",
  "https://i.postimg.cc/tJfBzSBr/IKSA-section-background-00126.webp",
  "https://i.postimg.cc/4N7L3G3j/IKSA-section-background-00127.webp",
  "https://i.postimg.cc/pXw0hShr/IKSA-section-background-00128.webp",
  "https://i.postimg.cc/fRY8xvmK/IKSA-section-background-00129.webp",
  "https://i.postimg.cc/nz180Jm3/IKSA-section-background-0013.webp",
  "https://i.postimg.cc/JhmPKBQW/IKSA-section-background-00130.webp",
  "https://i.postimg.cc/YS38PqXL/IKSA-section-background-00131.webp",
  "https://i.postimg.cc/tJLz61gw/IKSA-section-background-00132.webp",
  "https://i.postimg.cc/k4gwP3Z1/IKSA-section-background-00133.webp",
  "https://i.postimg.cc/vB2hQ2wQ/IKSA-section-background-00134.webp",
  "https://i.postimg.cc/T1y9hjTn/IKSA-section-background-00135.webp",
  "https://i.postimg.cc/xj75hZP5/IKSA-section-background-00136.webp",
  "https://i.postimg.cc/qvHLMCSC/IKSA-section-background-00137.webp",
  "https://i.postimg.cc/bNtghRCh/IKSA-section-background-00138.webp",
  "https://i.postimg.cc/DwQcWw3p/IKSA-section-background-00139.webp",
  "https://i.postimg.cc/RZjz0G9L/IKSA-section-background-0014.webp",
  "https://i.postimg.cc/LsH3jFH9/IKSA-section-background-00140.webp",
  "https://i.postimg.cc/g0NqDtJv/IKSA-section-background-00141.webp",
  "https://i.postimg.cc/4dyvFv7j/IKSA-section-background-00142.webp",
  "https://i.postimg.cc/FzJyh9xZ/IKSA-section-background-00143.webp",
  "https://i.postimg.cc/wvr5KtDM/IKSA-section-background-00144.webp",
  "https://i.postimg.cc/SjFWswTp/IKSA-section-background-00145.webp",
  "https://i.postimg.cc/RCj8Kh2v/IKSA-section-background-00146.webp",
  "https://i.postimg.cc/y8Kbp5V5/IKSA-section-background-00147.webp",
  "https://i.postimg.cc/BQHzgsGH/IKSA-section-background-00148.webp",
  "https://i.postimg.cc/sgJ0kcx2/IKSA-section-background-00149.webp",
  "https://i.postimg.cc/Jn8VNnsy/IKSA-section-background-0015.webp",
  "https://i.postimg.cc/wBTbgmRQ/IKSA-section-background-00150.webp",
  "https://i.postimg.cc/d0HN1V8P/IKSA-section-background-00151.webp",
  "https://i.postimg.cc/wvnWX4fw/IKSA-section-background-00152.webp",
  "https://i.postimg.cc/x8H6tGBn/IKSA-section-background-00153.webp",
  "https://i.postimg.cc/LXJCZFTq/IKSA-section-background-00154.webp",
  "https://i.postimg.cc/tJRKcMtp/IKSA-section-background-0016.webp",
  "https://i.postimg.cc/T1kzvJCm/IKSA-section-background-0017.webp",
  "https://i.postimg.cc/XNQS5n4J/IKSA-section-background-0018.webp",
  "https://i.postimg.cc/HsnG4Fkt/IKSA-section-background-0019.webp"
];

export const THOBE_GUIDE_BACKGROUND_IMAGES: string[] = [
  'https://i.postimg.cc/q7x2D1rD/article-regional-styles.webp',
  'https://i.postimg.cc/5N18qDML/article-sundus-casa.webp',
  'https://i.postimg.cc/9Q2w0h1G/article-fabric-science.webp',
  'https://i.postimg.cc/2j5T00Fw/inspiration-kandura.webp',
  'https://i.postimg.cc/k4GkYyv0/inspiration-abaya.webp'
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