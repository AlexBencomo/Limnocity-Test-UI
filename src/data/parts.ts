export interface Part {
  id: string
  partNumber: string
  basePartNumber: string
  partTerminologyId: number
  partName: string
  category: string
  subcategory: string
  brandCode: string
  brandName: string
  subBrand: string
  universalPart: boolean
  status: 'draft' | 'review' | 'approved'
  quantityPerApplication: number
  quantityQualifier: string
  quantityUom: string
  acesApplications: boolean
  imageUrl: string
  createdAt: string
  descriptions: {
    short: string
    long: string
    marketing: string
  }
  pricing: {
    wholesale: number
    jobber: number
    retail: number
    priceSheet: string
    currency: string
    effectiveDate: string
  }
  packaging: {
    height: number
    width: number
    length: number
    dimensionUom: string
    weight: number
    weightUom: string
    containerType: string
    quantityOfEachs: number
    gtin: string
  }
  attributes: Array<{
    name: string
    value: string
    uom: string
    padbId: number
  }>
  extendedInfo: {
    countryOfOrigin: string
    harmonizedTariff: string
    hazmat: boolean
    warrantyMonths: number
    lifeCycleStatus: string
  }
  kitComponents: Array<{
    partNumber: string
    quantity: number
    uom: string
    brandCode: string
    sequence: number
  }>
  interchanges: Array<{
    type: 'OE' | 'Competitor'
    brandCode: string
    brandName: string
    partNumber: string
    notes: string
  }>
  digitalAssets: Array<{
    fileName: string
    assetType: string
    fileType: string
    uri: string
  }>
  customFields?: Array<{
    key: string
    value: string
  }>
}

export const parts: Part[] = [
  {
    id: 'prt-001',
    partNumber: '51356',
    basePartNumber: '5135',
    partTerminologyId: 5808,
    partName: 'Catalytic Converter',
    category: 'Exhaust',
    subcategory: 'Emission Control',
    brandCode: 'DKGX',
    brandName: 'DuraKing Exhaust',
    subBrand: 'ProFlow',
    universalPart: false,
    status: 'approved',
    quantityPerApplication: 1,
    quantityQualifier: 'per vehicle',
    quantityUom: 'EA',
    acesApplications: true,
    imageUrl: '/images/parts/51356.webp',
    createdAt: '2025-08-14T10:30:00Z',
    descriptions: {
      short: 'Direct-fit catalytic converter with integrated heat shield',
      long: 'EPA-compliant direct-fit catalytic converter engineered for exact OE replacement. Features stainless steel body construction with ceramic honeycomb substrate and precious metal catalyst coating. Includes integrated heat shield and all required gaskets for bolt-on installation.',
      marketing: 'Restore your vehicle\'s emission performance with the DuraKing ProFlow catalytic converter. Precision-engineered for a perfect fit, this converter meets or exceeds all federal and state emission standards while delivering long-lasting durability.',
    },
    pricing: {
      wholesale: 189.50,
      jobber: 245.00,
      retail: 329.99,
      priceSheet: 'DKGX-2025-Q4',
      currency: 'USD',
      effectiveDate: '2025-10-01',
    },
    packaging: {
      height: 8.5,
      width: 10.0,
      length: 26.0,
      dimensionUom: 'IN',
      weight: 14.2,
      weightUom: 'LB',
      containerType: 'Box',
      quantityOfEachs: 1,
      gtin: '00614046513562',
    },
    attributes: [
      { name: 'Inlet Diameter', value: '2.25', uom: 'IN', padbId: 2410 },
      { name: 'Outlet Diameter', value: '2.25', uom: 'IN', padbId: 2411 },
      { name: 'Substrate Type', value: 'Ceramic Honeycomb', uom: '', padbId: 2450 },
    ],
    extendedInfo: {
      countryOfOrigin: 'US',
      harmonizedTariff: '8421.31.0000',
      hazmat: false,
      warrantyMonths: 60,
      lifeCycleStatus: 'Active',
    },
    kitComponents: [],
    interchanges: [
      {
        type: 'OE',
        brandCode: 'HOND',
        brandName: 'Honda',
        partNumber: '18160-5A2-A00',
        notes: 'Direct OE replacement for Honda part',
      },
    ],
    digitalAssets: [
      {
        fileName: '51356_main.webp',
        assetType: 'Product Image',
        fileType: 'WEB',
        uri: '/assets/digital/51356_main.webp',
      },
    ],
  },
  {
    id: 'prt-002',
    partNumber: 'EB1',
    basePartNumber: 'EB',
    partTerminologyId: 3020,
    partName: 'Engine Block',
    category: 'Engine',
    subcategory: 'Short Block Components',
    brandCode: 'BSCH',
    brandName: 'Bosch',
    subBrand: 'Reman',
    universalPart: false,
    status: 'review',
    quantityPerApplication: 1,
    quantityQualifier: 'per vehicle',
    quantityUom: 'EA',
    acesApplications: true,
    imageUrl: '/images/parts/eb1.webp',
    createdAt: '2025-11-02T14:15:00Z',
    descriptions: {
      short: 'Remanufactured cast iron engine block assembly',
      long: 'Professionally remanufactured 2.0L inline-4 cast iron engine block. All cylinder bores honed to factory specification with new freeze plugs, cam bearings, and oil gallery plugs installed. Block surfaces machined flat within 0.001" tolerance. Pressure tested and inspected for cracks.',
      marketing: 'Get OE-quality performance at a fraction of the cost with this Bosch Reman engine block. Every block undergoes rigorous 47-point inspection and precision machining to ensure reliability you can count on for the long haul.',
    },
    pricing: {
      wholesale: 285.00,
      jobber: 365.00,
      retail: 399.99,
      priceSheet: 'BSCH-2025-Q4',
      currency: 'USD',
      effectiveDate: '2025-10-01',
    },
    packaging: {
      height: 18.0,
      width: 20.0,
      length: 24.0,
      dimensionUom: 'IN',
      weight: 95.0,
      weightUom: 'LB',
      containerType: 'Crate',
      quantityOfEachs: 1,
      gtin: '00028851940016',
    },
    attributes: [
      { name: 'Engine Displacement', value: '2.0', uom: 'L', padbId: 1100 },
      { name: 'Cylinder Configuration', value: 'Inline 4', uom: '', padbId: 1102 },
      { name: 'Block Material', value: 'Cast Iron', uom: '', padbId: 1110 },
      { name: 'Bore Diameter', value: '86.0', uom: 'MM', padbId: 1115 },
    ],
    extendedInfo: {
      countryOfOrigin: 'MX',
      harmonizedTariff: '8409.91.5000',
      hazmat: false,
      warrantyMonths: 36,
      lifeCycleStatus: 'Active',
    },
    kitComponents: [],
    interchanges: [],
    digitalAssets: [],
  },
  {
    id: 'prt-003',
    partNumber: 'BPF400',
    basePartNumber: 'BPF',
    partTerminologyId: 1684,
    partName: 'Brake Pad Front',
    category: 'Brakes',
    subcategory: 'Disc Brake Pads',
    brandCode: 'DRMN',
    brandName: 'Dorman',
    subBrand: 'OE Solutions',
    universalPart: false,
    status: 'approved',
    quantityPerApplication: 1,
    quantityQualifier: 'per axle',
    quantityUom: 'SET',
    acesApplications: true,
    imageUrl: '/images/parts/bpf400.webp',
    createdAt: '2025-06-20T09:00:00Z',
    descriptions: {
      short: 'Ceramic front disc brake pad set with hardware',
      long: 'Premium ceramic front disc brake pad set designed for quiet, low-dust braking performance. Features OE-matched friction formulation with positive molding for consistent pad density. Includes stainless steel hardware kit and wear indicators. Chamfered and slotted for noise reduction.',
      marketing: 'Stop with confidence using Dorman OE Solutions ceramic brake pads. Engineered to deliver smooth, quiet braking with significantly less brake dust than semi-metallic pads, keeping your wheels cleaner longer.',
    },
    pricing: {
      wholesale: 32.75,
      jobber: 48.00,
      retail: 64.99,
      priceSheet: 'DRMN-2025-Q4',
      currency: 'USD',
      effectiveDate: '2025-10-01',
    },
    packaging: {
      height: 3.5,
      width: 7.0,
      length: 8.5,
      dimensionUom: 'IN',
      weight: 3.8,
      weightUom: 'LB',
      containerType: 'Box',
      quantityOfEachs: 4,
      gtin: '00019495084006',
    },
    attributes: [
      { name: 'Friction Material', value: 'Ceramic', uom: '', padbId: 3200 },
      { name: 'Pad Thickness', value: '12.0', uom: 'MM', padbId: 3210 },
      { name: 'Includes Hardware', value: 'Yes', uom: '', padbId: 3220 },
    ],
    extendedInfo: {
      countryOfOrigin: 'CN',
      harmonizedTariff: '6813.81.0010',
      hazmat: false,
      warrantyMonths: 24,
      lifeCycleStatus: 'Active',
    },
    kitComponents: [],
    interchanges: [
      {
        type: 'OE',
        brandCode: 'TOYO',
        brandName: 'Toyota',
        partNumber: '04465-06200',
        notes: 'OE pad set for front axle',
      },
      {
        type: 'Competitor',
        brandCode: 'WAGN',
        brandName: 'Wagner',
        partNumber: 'QC1210',
        notes: 'Equivalent ceramic pad set',
      },
    ],
    digitalAssets: [],
  },
  {
    id: 'prt-004',
    partNumber: 'OS1100',
    basePartNumber: 'OS',
    partTerminologyId: 4252,
    partName: 'O2 Sensor',
    category: 'Sensors',
    subcategory: 'Oxygen Sensors',
    brandCode: 'DNSO',
    brandName: 'Denso',
    subBrand: 'First Time Fit',
    universalPart: false,
    status: 'draft',
    quantityPerApplication: 1,
    quantityQualifier: 'per position',
    quantityUom: 'EA',
    acesApplications: true,
    imageUrl: '/images/parts/os1100.webp',
    createdAt: '2026-01-08T16:45:00Z',
    descriptions: {
      short: 'Heated wideband air/fuel ratio oxygen sensor',
      long: 'Denso First Time Fit heated wideband oxygen sensor for upstream (Bank 1, Sensor 1) position. Features OE-identical connector and wiring harness length for true plug-and-play installation. Utilizes advanced planar element technology for faster light-off and more accurate air/fuel ratio measurement.',
      marketing: 'Restore fuel efficiency and reduce emissions with the Denso First Time Fit O2 sensor. As the world\'s largest OE oxygen sensor manufacturer, Denso delivers the same quality trusted by automakers worldwide.',
    },
    pricing: {
      wholesale: 48.25,
      jobber: 72.00,
      retail: 94.99,
      priceSheet: 'DNSO-2026-Q1',
      currency: 'USD',
      effectiveDate: '2026-01-01',
    },
    packaging: {
      height: 3.0,
      width: 4.5,
      length: 9.0,
      dimensionUom: 'IN',
      weight: 0.65,
      weightUom: 'LB',
      containerType: 'Box',
      quantityOfEachs: 1,
      gtin: '00042511110007',
    },
    attributes: [
      { name: 'Sensor Type', value: 'Wideband', uom: '', padbId: 4400 },
      { name: 'Wire Count', value: '4', uom: '', padbId: 4410 },
    ],
    extendedInfo: {
      countryOfOrigin: 'JP',
      harmonizedTariff: '9027.10.2000',
      hazmat: false,
      warrantyMonths: 12,
      lifeCycleStatus: 'New',
    },
    kitComponents: [],
    interchanges: [],
    digitalAssets: [],
  },
  {
    id: 'prt-005',
    partNumber: '5M1038A',
    basePartNumber: '5M1038',
    partTerminologyId: 3650,
    partName: 'Main Bearing Set',
    category: 'Bearings',
    subcategory: 'Engine Bearings',
    brandCode: 'ACLR',
    brandName: 'ACL Race Series',
    subBrand: 'Calico Coated',
    universalPart: false,
    status: 'approved',
    quantityPerApplication: 1,
    quantityQualifier: 'per engine',
    quantityUom: 'SET',
    acesApplications: true,
    imageUrl: '/images/parts/5m1038a.webp',
    createdAt: '2025-09-30T11:20:00Z',
    descriptions: {
      short: 'Performance main bearing set with Calico CT-1 coating',
      long: 'ACL Race Series main bearing set featuring Calico CT-1 dry film lubricant coating for reduced friction and enhanced durability under extreme conditions. Tri-metal construction with steel backing, copper-lead intermediate layer, and Babbitt overlay. Precision-machined to tight tolerances for consistent oil clearance. Set includes thrust bearings.',
      marketing: 'Trusted by professional engine builders worldwide, ACL Race Series bearings with Calico coating deliver championship-proven performance. Whether you\'re building a weekend warrior or a full race engine, these bearings provide the reliability and durability you demand.',
    },
    pricing: {
      wholesale: 78.50,
      jobber: 110.00,
      retail: 142.99,
      priceSheet: 'ACLR-2025-Q4',
      currency: 'USD',
      effectiveDate: '2025-10-01',
    },
    packaging: {
      height: 2.0,
      width: 6.0,
      length: 8.0,
      dimensionUom: 'IN',
      weight: 1.4,
      weightUom: 'LB',
      containerType: 'Box',
      quantityOfEachs: 5,
      gtin: '00897438010385',
    },
    attributes: [
      { name: 'Bearing Size', value: 'Standard', uom: '', padbId: 3700 },
      { name: 'Coating', value: 'Calico CT-1', uom: '', padbId: 3710 },
      { name: 'Construction', value: 'Tri-Metal', uom: '', padbId: 3720 },
    ],
    extendedInfo: {
      countryOfOrigin: 'AU',
      harmonizedTariff: '8483.30.8090',
      hazmat: false,
      warrantyMonths: 12,
      lifeCycleStatus: 'Active',
    },
    kitComponents: [],
    interchanges: [],
    digitalAssets: [],
  },
]
