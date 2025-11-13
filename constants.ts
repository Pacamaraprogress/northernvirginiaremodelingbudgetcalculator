import { FormData, ProjectType, CabinetLine, CountertopMaterial, AdditionalFeature, BathroomType, ProjectScope, BathroomVanityLine, TileWorkScope, TileMaterial, SinkType, ToiletType, ShowerType, HardwareFinish } from './types';

export const PROJECT_TYPES: ProjectType[] = ['Kitchen', 'Bathroom', 'Closet', 'Laundry Room', 'Home Office', 'Entertainment Center', 'Wet & Dry Bar', 'Custom Project'];
export const CABINET_LINES: CabinetLine[] = [
  'Fabuwood Allure',
  'Fabuwood Quest',
  'Forevermark Nova',
  'Forevermark Signature',
  'J&K Greige Shaker',
  'J&K White Shaker',
  'NextGen G-Lux',
  'CNC Luxor',
  'US Cabinetry Frameless'
];
export const BATHROOM_VANITY_LINES: BathroomVanityLine[] = [
    'Fabuwood Vanities',
    'Forevermark Vanities',
    'CNC Vanities',
    'NextGen Vanities',
    'US Cabinetry Vanities'
];
export const COUNTERTOP_MATERIALS: CountertopMaterial[] = ['No Change / Keep Existing', 'Granite', 'Quartz', 'Marble', 'Quartzite', 'Soapstone'];
export const TILE_WORK_SCOPES: TileWorkScope[] = ['No Tile Work', 'Kitchen Backsplash', 'Kitchen Floor', 'Bathroom Floor', 'Shower/Tub Surround Walls', 'Bathroom Accent Wall'];
export const TILE_MATERIALS: TileMaterial[] = ['Ceramic / Porcelain (Standard)', 'Natural Stone (Marble, Travertine)', 'Glass / Mosaic / Decorative'];
export const SINK_TYPES: SinkType[] = [
  'No New Sink / Keep Existing',
  'Kitchen Sink - Stainless Steel',
  'Kitchen Sink - Composite',
  'Kitchen Sink - Fireclay',
  'Bathroom Sink - Undermount',
  'Bathroom Sink - Vessel'
];
export const TOILET_TYPES: ToiletType[] = ['No New Toilet / Keep Existing', 'New Standard Toilet', 'New Comfort Height Toilet', 'New Smart Toilet'];
export const SHOWER_TYPES: ShowerType[] = ['No Change / Keep Existing Tub/Shower', 'New Bathtub (Standard Alcove)', 'New Bathtub (Freestanding/Soaking)', 'New Shower (Prefab Stall)', 'Custom Tile Shower'];

export const HARDWARE_FINISHES: HardwareFinish[] = ['No New Hardware / Keep Existing', 'Standard Finish (e.g., Brushed Nickel)', 'Mid-Range Finish (e.g., Matte Black, Brass)', 'Premium/Designer Hardware'];

export const ADDITIONAL_FEATURES: AdditionalFeature[] = ['Island', 'New Faucet', 'Under-Cabinet Lighting'];
export const BATHROOM_TYPES: BathroomType[] = ['Master/Primary Bathroom', 'Guest Bathroom', 'Powder Room / Half Bath', 'Jack-and-Jill Bathroom', 'Other'];
export const PROJECT_SCOPES: ProjectScope[] = ['Complete gut renovation', 'Partial remodel', 'Layout changes (moving fixtures)', 'Expansion (adding sq footage)', 'Cosmetic updates only'];


export const INITIAL_FORM_DATA: FormData = {
  projectType: 'Kitchen',
  sqft: '150',
  cabinetLine: 'Fabuwood Allure',
  numCabinets: '',
  countertopMaterial: 'No Change / Keep Existing',
  additionalFeatures: [],
  location: '',
  // Bathroom specific
  bathroomType: 'Master/Primary Bathroom',
  projectScope: [],
  homeAge: '',
  bathroomVanityLine: 'Fabuwood Vanities',
  // Tile specific
  tileWorkScope: ['No Tile Work'],
  tileMaterial: 'Ceramic / Porcelain (Standard)',
  // Plumbing specific
  sinkType: 'No New Sink / Keep Existing',
  toiletType: 'No New Toilet / Keep Existing',
  showerType: 'No Change / Keep Existing Tub/Shower',
  // Finishing Touches
  hardwareFinish: 'No New Hardware / Keep Existing',
};

export const CONTACT_URL = "https://www.usacabinetstore.com/contact-us/";