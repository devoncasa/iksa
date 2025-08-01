
import React from 'react';
import { NavLink, Fabric, LanguageCode, GarmentStyleAdvanced, GarmentSizeAdvanced } from './types';
import {
  BreathableIcon, UVProtectionIcon, AntiYellowingIcon, CrispIcon, SoftDrapeIcon, SilkShineIcon, LightweightIcon, CoolTouchIcon, AntiStaticIcon, CreaseResistantIcon, EasyCareIcon,
} from './components/icons';

export const DEFAULT_LANGUAGE: LanguageCode = LanguageCode.EN;

export const LANGUAGES = [
  { code: LanguageCode.EN, name: 'English' },
  { code: LanguageCode.AR, name: 'العربية' },
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
    performance: ['durability'],
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

export const GARMENT_SIZES_ADVANCED: GarmentSizeAdvanced[] = [
  { key: 'XS', nameKey: 'sizeXS', multiplier: 0.85 },
  { key: 'S', nameKey: 'sizeS', multiplier: 0.9 },
  { key: 'M', nameKey: 'sizeM', multiplier: 1.0 },
  { key: 'L', nameKey: 'sizeL', multiplier: 1.1 },
  { key: 'XL', nameKey: 'sizeXL', multiplier: 1.15 },
  { key: 'XXL', nameKey: 'sizeXXL', multiplier: 1.25 },
  { key: '3XL', nameKey: 'size3XL', multiplier: 1.35 },
];

export const GARMENT_STYLES_ADVANCED: GarmentStyleAdvanced[] = [
  { id: 'thobe-kandura', nameKey: 'garmentThobeKandura', gender: 'Male', region: 'Gulf (Arabian)', baseRequirement: 4.0 },
  { id: 'dishdasha', nameKey: 'garmentDishdasha', gender: 'Male', region: 'Kuwait, Oman', baseRequirement: 4.0 },
  { id: 'jubbah', nameKey: 'garmentJubbah', gender: 'Male', region: 'Egypt, Sudan', baseRequirement: 4.0 },
  { id: 'qamees', nameKey: 'garmentQamees', gender: 'Male', region: 'North Africa', baseRequirement: 3.8 },
  { id: 'shalwar-kameez', nameKey: 'garmentShalwarKameez', gender: 'Both', region: 'Pakistan, India', baseRequirement: 4.5 },
  { id: 'kurta-pajama', nameKey: 'garmentKurtaPajama', gender: 'Male', region: 'India, Bangladesh', baseRequirement: 4.0 },
  { id: 'baju-melayu', nameKey: 'garmentBajuMelayu', gender: 'Male', region: 'Malaysia, Brunei', baseRequirement: 4.0 },
  { id: 'baju-kurung', nameKey: 'garmentBajuKurung', gender: 'Female', region: 'Malaysia, Brunei', baseRequirement: 4.5 },
  { id: 'abaya', nameKey: 'garmentAbaya', gender: 'Female', region: 'Gulf / Middle East', baseRequirement: 4.75 }, // Avg of 4.5-5.0
  { id: 'kaftan', nameKey: 'garmentKaftan', gender: 'Female', region: 'Morocco, Algeria', baseRequirement: 5.0 },
  { id: 'djellaba', nameKey: 'garmentDjellaba', gender: 'Both', region: 'Morocco', baseRequirement: 4.5 },
  { id: 'jalabiya', nameKey: 'garmentJalabiya', gender: 'Female', region: 'Egypt, Sudan', baseRequirement: 3.5 },
  { id: 'chador', nameKey: 'garmentChador', gender: 'Female', region: 'Iran', baseRequirement: 3.5 },
  { id: 'hijab', nameKey: 'garmentHijab', gender: 'Female', region: 'Global', baseRequirement: 2.0 },
  { id: 'niqab', nameKey: 'garmentNiqab', gender: 'Female', region: 'Global', baseRequirement: 1.0 },
  { id: 'burqa', nameKey: 'garmentBurqa', gender: 'Female', region: 'Afghanistan/Pakistan', baseRequirement: 5.5 },
  { id: 'khimar', nameKey: 'garmentKhimar', gender: 'Female', region: 'Global', baseRequirement: 2.0 },
  { id: 'al-amira', nameKey: 'garmentAlAmira', gender: 'Female', region: 'Levant', baseRequirement: 1.5 },
  { id: 'tunic-pants', nameKey: 'garmentTunicPants', gender: 'Female', region: 'Global', baseRequirement: 4.0 },
  { id: 'sirwal', nameKey: 'garmentSirwal', gender: 'Both', region: 'Middle East', baseRequirement: 2.5 },
  { id: 'haram-pants', nameKey: 'garmentHaramPants', gender: 'Male', region: 'Makkah/Hajj wear', baseRequirement: 2.5 },
  { id: 'hajj-ihram', nameKey: 'garmentHajjIhram', gender: 'Male', region: 'Pilgrimage', baseRequirement: 4.0 },
  { id: 'prayer-robe', nameKey: 'garmentPrayerRobe', gender: 'Female', region: 'Africa', baseRequirement: 3.5 },
  { id: 'childrens-thobe', nameKey: 'garmentChildrensThobe', gender: 'Male', region: 'Global', baseRequirement: 2.5 },
  { id: 'childrens-abaya', nameKey: 'garmentChildrensAbaya', gender: 'Female', region: 'Global', baseRequirement: 2.5 },
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