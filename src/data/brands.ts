export interface PricingSheet {
  name: string
  currency: string
  effectiveDate: string
  priceTypes: string[]
}

export interface MarketingCopy {
  tagline: string
  shortDescription: string
  longDescription: string
}

export interface BrandContact {
  name: string
  email: string
  phone: string
  role: string
}

export interface Brand {
  code: string
  name: string
  subBrands: string[]
  logo: string
  website: string
  description: string
  founded: string
  headquarters: string
  contact: BrandContact
  marketingCopy: MarketingCopy
  pricingSheets: PricingSheet[]
  distributionChannels: string[]
  certifications: string[]
}

export const brands: Brand[] = [
  {
    code: 'DKGX',
    name: 'MagnaFlow Exhaust Products',
    subBrands: ['Performance', 'OEM Grade', 'Race', 'California', 'Street', 'Pro', 'Black', 'NEO', 'Sport', 'Touring'],
    logo: '/logos/magnaflow.svg',
    website: 'https://www.magnaflow.com',
    description: 'MagnaFlow is the leading manufacturer of performance exhaust systems, catalytic converters, and mufflers. Known for their signature deep, rich exhaust tone and stainless steel construction, MagnaFlow products deliver increased horsepower and torque while maintaining strict emissions compliance.',
    founded: '1981',
    headquarters: 'Oceanside, CA',
    contact: {
      name: 'David Chen',
      email: 'd.chen@magnaflow.com',
      phone: '(760) 555-0142',
      role: 'Brand Manager',
    },
    marketingCopy: {
      tagline: 'Sound of Power',
      shortDescription: 'Premium stainless steel exhaust systems engineered for maximum performance and that unmistakable MagnaFlow sound.',
      longDescription: 'For over four decades, MagnaFlow has set the standard in performance exhaust technology. Every MagnaFlow product is precision-engineered using mandrel-bent, stainless steel tubing and high-flow perforated cores to deliver maximum exhaust flow, increased horsepower, and the deep, rich tone that enthusiasts demand. From street-legal catalytic converters to full race systems, MagnaFlow provides solutions for virtually every vehicle on the road — all backed by a limited lifetime warranty.',
    },
    pricingSheets: [
      { name: 'Wholesale 2026', currency: 'USD', effectiveDate: '2026-01-15', priceTypes: ['Wholesale', 'Jobber', 'Retail'] },
      { name: 'MAP Policy', currency: 'USD', effectiveDate: '2026-01-15', priceTypes: ['MAP', 'MSRP'] },
    ],
    distributionChannels: ['Warehouse Distributors', 'Retailers', 'E-Commerce', 'OEM Direct'],
    certifications: ['CARB EO', 'EPA Compliant', 'ISO 9001:2015'],
  },
  {
    code: 'ACLR',
    name: 'ACL Race Series',
    subBrands: ['Race', 'OEM Replacement', 'Performance', 'Standard'],
    logo: '/logos/acl.svg',
    website: 'https://www.aclbearings.com',
    description: 'ACL Race Series produces precision engine bearings trusted by professional racing teams and engine builders worldwide. Manufactured in Melbourne, Australia, ACL bearings feature proprietary alloy formulations and advanced overlay technologies for maximum durability under extreme conditions.',
    founded: '1939',
    headquarters: 'Melbourne, Australia',
    contact: {
      name: 'Sarah Mitchell',
      email: 's.mitchell@aclbearings.com',
      phone: '+61 3 9555 0198',
      role: 'Technical Sales Director',
    },
    marketingCopy: {
      tagline: 'Precision Under Pressure',
      shortDescription: 'Race-proven engine bearings engineered for the most demanding applications in motorsport and high-performance street engines.',
      longDescription: 'Since 1939, ACL has been at the forefront of engine bearing technology. ACL Race Series bearings are manufactured to the tightest tolerances in the industry, using proprietary alloy formulations including the renowned Aluglide™ and Duroglide™ materials. Trusted by NASCAR, V8 Supercars, and Formula Drift teams, ACL Race Series bearings deliver unmatched load capacity, fatigue resistance, and conformability. Every bearing is 100% inspected to ensure consistent quality from the shelf to the crankshaft.',
    },
    pricingSheets: [
      { name: 'US Distributor 2026', currency: 'USD', effectiveDate: '2026-02-01', priceTypes: ['Wholesale', 'Jobber', 'Retail'] },
      { name: 'AU Domestic 2026', currency: 'AUD', effectiveDate: '2026-02-01', priceTypes: ['Wholesale', 'Trade', 'RRP'] },
    ],
    distributionChannels: ['Warehouse Distributors', 'Engine Builders', 'Racing Teams Direct'],
    certifications: ['ISO 9001:2015', 'IATF 16949'],
  },
  {
    code: 'BSCH',
    name: 'Bosch',
    subBrands: ['Premium', 'OE Replacement', 'Platinum', 'Iridium'],
    logo: '/logos/bosch.svg',
    website: 'https://www.boschautoparts.com',
    description: 'Bosch is the world\'s largest automotive parts supplier, providing innovative solutions across ignition, fuel systems, braking, electronics, and more. With over a century of engineering excellence, Bosch OE-quality parts are the trusted choice for professional technicians and DIY enthusiasts alike.',
    founded: '1886',
    headquarters: 'Stuttgart, Germany',
    contact: {
      name: 'Klaus Weber',
      email: 'k.weber@bosch.com',
      phone: '+49 711 555-0234',
      role: 'Aftermarket Product Manager',
    },
    marketingCopy: {
      tagline: 'Invented for Life',
      shortDescription: 'OE-quality automotive parts backed by over 130 years of engineering innovation and trusted by technicians worldwide.',
      longDescription: 'As the original equipment supplier for virtually every major automaker, Bosch brings the same engineering precision to the aftermarket. Bosch spark plugs, oxygen sensors, fuel injectors, wiper blades, and brake components are designed, tested, and manufactured to meet or exceed OE specifications. With advanced technologies like fine-wire iridium and yttrium-enhanced electrodes, Bosch ignition products deliver superior ignitability, longer service life, and optimized fuel efficiency. Choose Bosch — the name behind the parts that built the modern automobile.',
    },
    pricingSheets: [
      { name: 'NA Wholesale 2026', currency: 'USD', effectiveDate: '2026-01-01', priceTypes: ['Wholesale', 'Jobber', 'Retail', 'Core Charge'] },
      { name: 'EU Wholesale 2026', currency: 'EUR', effectiveDate: '2026-01-01', priceTypes: ['Wholesale', 'Trade', 'RRP'] },
      { name: 'MAP Enforcement', currency: 'USD', effectiveDate: '2026-01-01', priceTypes: ['MAP', 'MSRP'] },
    ],
    distributionChannels: ['Warehouse Distributors', 'Auto Parts Retailers', 'OEM Direct', 'E-Commerce', 'Dealer Networks'],
    certifications: ['ISO 9001:2015', 'IATF 16949', 'ISO 14001', 'CARB Certified'],
  },
  {
    code: 'DNSO',
    name: 'Denso',
    subBrands: ['Iridium Power', 'Iridium TT', 'Standard', 'Platinum'],
    logo: '/logos/denso.svg',
    website: 'https://www.densoautoparts.com',
    description: 'DENSO is a global leader in advanced automotive technology, systems, and components. As the original equipment supplier to Toyota, Honda, and other leading automakers, DENSO delivers world-class spark plugs, starters, alternators, HVAC components, and fuel system parts built to OE standards.',
    founded: '1949',
    headquarters: 'Kariya, Aichi, Japan',
    contact: {
      name: 'Kenji Tanaka',
      email: 'k.tanaka@denso.com',
      phone: '+81 566 55-0176',
      role: 'Aftermarket Division Lead',
    },
    marketingCopy: {
      tagline: 'Crafting the Core',
      shortDescription: 'World-class OE ignition and engine management components engineered by the pioneer of iridium spark plug technology.',
      longDescription: 'DENSO invented the iridium spark plug and continues to lead the industry in ignition technology. With the world\'s smallest center electrode diameter at 0.4mm, DENSO Iridium Power plugs provide unmatched ignitability and throttle response. DENSO\'s aftermarket lineup — including spark plugs, oxygen sensors, starters, alternators, and A/C compressors — is built on the same production lines as their OE products, ensuring identical quality and fitment. Trusted by automakers and technicians around the globe, DENSO parts are the smart choice for lasting performance.',
    },
    pricingSheets: [
      { name: 'Americas 2026', currency: 'USD', effectiveDate: '2026-03-01', priceTypes: ['Wholesale', 'Jobber', 'Retail'] },
      { name: 'APAC 2026', currency: 'JPY', effectiveDate: '2026-03-01', priceTypes: ['Wholesale', 'Dealer', 'List'] },
    ],
    distributionChannels: ['Warehouse Distributors', 'Auto Parts Retailers', 'OEM Direct', 'Dealer Networks'],
    certifications: ['ISO 9001:2015', 'IATF 16949', 'ISO 14001'],
  },
  {
    code: 'DRMN',
    name: 'Dorman',
    subBrands: ['OE Solutions', 'HD Solutions', 'Help!', 'First Stop'],
    logo: '/logos/dorman.svg',
    website: 'https://www.dormanproducts.com',
    description: 'Dorman Products is the aftermarket\'s leading supplier of original equipment dealer-exclusive parts, offering over 118,000 SKUs across virtually every vehicle system. Dorman\'s engineering team reverse-engineers and improves upon OE designs, delivering parts that often outperform the originals.',
    founded: '1918',
    headquarters: 'Colmar, PA',
    contact: {
      name: 'Jennifer Walsh',
      email: 'j.walsh@dormanproducts.com',
      phone: '(215) 555-0311',
      role: 'Category Manager',
    },
    marketingCopy: {
      tagline: 'Always Advancing',
      shortDescription: 'Aftermarket-exclusive OE replacement parts engineered to fix problems permanently — with solutions the dealers can\'t match.',
      longDescription: 'Dorman Products leads the aftermarket in new-to-aftermarket part coverage, bringing dealer-exclusive parts to the independent repair channel. Dorman\'s engineering team doesn\'t just replicate OE parts — they improve them. By analyzing common failure modes and warranty data, Dorman redesigns components to eliminate the root cause of failure, delivering a better-than-OE solution. With sub-brands like OE Solutions for passenger vehicles, HD Solutions for commercial trucks, Help! for hardware and accessories, and First Stop for brake hydraulics, Dorman covers the full spectrum of automotive repair needs.',
    },
    pricingSheets: [
      { name: 'Standard 2026', currency: 'USD', effectiveDate: '2026-01-15', priceTypes: ['Wholesale', 'Jobber', 'Retail'] },
      { name: 'HD Solutions 2026', currency: 'USD', effectiveDate: '2026-01-15', priceTypes: ['Wholesale', 'Fleet', 'Retail'] },
      { name: 'MAP / MSRP', currency: 'USD', effectiveDate: '2026-01-15', priceTypes: ['MAP', 'MSRP'] },
    ],
    distributionChannels: ['Warehouse Distributors', 'Auto Parts Retailers', 'E-Commerce', 'Fleet Accounts'],
    certifications: ['ISO 9001:2015', 'IATF 16949'],
  },
]
