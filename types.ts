export enum LanguageCode {
  EN = 'en',
}

export interface Translations {
  [key: string]: string | Record<string, string> | Record<string, Record<string, string>>;
}

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  translate: (key: string, subKey?: string) => string;
}

export interface Fabric {
  id: string;
  nameKey: string; // Key for translation
  detailDescriptionKey: string; // Key for detailed description translation
  professionalBriefingKey: string; // Key for the B2B tailor's briefing
  rollLengthInMeters: number;
  pricePerRoll: number;
  imageUrl: string;
  galleryImages: string[];
  features: string[]; // Keys for feature icons/text like 'breathable', 'uvProtection'
  useCases: string[]; // e.g., ['emiratiKandura', 'saudiThobe']
  feel: string[]; // e.g., ['crispStructured', 'softFlowing']
  performance: string[]; // e.g., ['wrinkleResistance', 'breathability']
  finishKey: string; // e.g., 'matte', 'silkShine'
  weightKey: string; // e.g., 'ultraLight', 'midWeight'
  shadeKey: string; // e.g., 'pureWhite', 'pearlWhite'
  collectionKey: string; // e.g., 'heritage', 'performance'
  widthInMeters: number; 
  availableColors?: string[]; // e.g., ['white', 'black', 'earthTones']
}

export interface GarmentSize {
  key: string; // e.g., 'S', 'M', 'L', 'XL'
  nameKey: string; // Translation key for the size name e.g., 'sizeS'
}

export interface GarmentStyle {
  id: string;
  nameKey: string;
  fabricPerSize: Record<string, number>; // e.g. { 'S': 2.3, 'M': 2.5, 'L': 2.7, 'XL': 2.9 }
}

export interface GarmentCategory {
  nameKey: string;
  styles: GarmentStyle[];
}

export interface NavLink {
  path: string;
  labelKey: string;
}

// Cart-related types for a B2B roll-based system
export interface CartItem {
  fabricId: string;
  quantity: number; // Represents number of rolls
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (fabricId: string, quantity: number) => void;
  updateQuantity: (fabricId: string, quantity: number) => void;
  removeFromCart: (fabricId: string) => void;
  clearCart: () => void;
  getCartTotal: () => { totalItems: number; totalPrice: number };
}