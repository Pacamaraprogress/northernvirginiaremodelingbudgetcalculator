export type ProjectType = 'Kitchen' | 'Bathroom' | 'Closet' | 'Laundry Room' | 'Home Office' | 'Entertainment Center' | 'Wet & Dry Bar' | 'Custom Project';

export type CabinetLine = 
  | 'Fabuwood Allure'
  | 'Fabuwood Quest'
  | 'Forevermark Nova'
  | 'Forevermark Signature'
  | 'J&K Greige Shaker'
  | 'J&K White Shaker'
  | 'NextGen G-Lux'
  | 'CNC Luxor'
  | 'US Cabinetry Frameless';

export type BathroomVanityLine =
  | 'Fabuwood Vanities'
  | 'Forevermark Vanities'
  | 'CNC Vanities'
  | 'NextGen Vanities'
  | 'US Cabinetry Vanities';

export type CountertopMaterial = 'Granite' | 'Quartz' | 'Marble' | 'Quartzite' | 'Soapstone' | 'No Change / Keep Existing';

export type TileWorkScope = 'Kitchen Backsplash' | 'Bathroom Floor' | 'Kitchen Floor' | 'Shower/Tub Surround Walls' | 'Bathroom Accent Wall' | 'No Tile Work';
export type TileMaterial = 'Ceramic / Porcelain (Standard)' | 'Natural Stone (Marble, Travertine)' | 'Glass / Mosaic / Decorative';

export type SinkType = 
  | 'No New Sink / Keep Existing'
  | 'Kitchen Sink - Stainless Steel'
  | 'Kitchen Sink - Composite'
  | 'Kitchen Sink - Fireclay'
  | 'Bathroom Sink - Undermount'
  | 'Bathroom Sink - Vessel';

export type ToiletType = 'No New Toilet / Keep Existing' | 'New Standard Toilet' | 'New Comfort Height Toilet' | 'New Smart Toilet';
export type ShowerType = 'No Change / Keep Existing Tub/Shower' | 'New Bathtub (Standard Alcove)' | 'New Bathtub (Freestanding/Soaking)' | 'New Shower (Prefab Stall)' | 'Custom Tile Shower';

export type HardwareFinish = 'No New Hardware / Keep Existing' | 'Standard Finish (e.g., Brushed Nickel)' | 'Mid-Range Finish (e.g., Matte Black, Brass)' | 'Premium/Designer Hardware';

export type AdditionalFeature = 'Island' | 'New Faucet' | 'Under-Cabinet Lighting';

export type BathroomType = 'Master/Primary Bathroom' | 'Guest Bathroom' | 'Powder Room / Half Bath' | 'Jack-and-Jill Bathroom' | 'Other';
export type ProjectScope = 'Complete gut renovation' | 'Partial remodel' | 'Layout changes (moving fixtures)' | 'Expansion (adding sq footage)' | 'Cosmetic updates only';


export interface FormData {
  projectType: ProjectType;
  sqft: string;
  cabinetLine: CabinetLine;
  numCabinets: string;
  countertopMaterial: CountertopMaterial;
  additionalFeatures: AdditionalFeature[];
  location: string;
  // Bathroom specific
  bathroomType?: BathroomType;
  projectScope?: ProjectScope[];
  homeAge?: string;
  bathroomVanityLine?: BathroomVanityLine;
  // Tile specific
  tileWorkScope?: TileWorkScope[];
  tileMaterial?: TileMaterial;
  // Plumbing specific
  sinkType?: SinkType;
  toiletType?: ToiletType;
  showerType?: ShowerType;
  // Finishing touches
  hardwareFinish?: HardwareFinish;
}

export interface EstimateBreakdownItem {
  category: string;
  cost: number;
  description: string;
}

export interface Estimate {
  totalRange: {
    low: number;
    high: number;
  };
  breakdown: EstimateBreakdownItem[];
  summary: string;
}