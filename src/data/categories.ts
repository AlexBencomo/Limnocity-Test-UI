export interface PartEntry {
  partTerminologyId: number
  partName: string
}

export interface Subcategory {
  name: string
  parts: PartEntry[]
}

export interface Category {
  id: string
  name: string
  subcategories: Subcategory[]
}

export const categories: Category[] = [
  {
    id: 'engine',
    name: 'Engine',
    subcategories: [
      {
        name: 'Ignition',
        parts: [
          { partTerminologyId: 4710, partName: 'Spark Plug' },
          { partTerminologyId: 4712, partName: 'Ignition Coil' },
          { partTerminologyId: 4715, partName: 'Spark Plug Wire Set' },
        ],
      },
      {
        name: 'Filters',
        parts: [
          { partTerminologyId: 4810, partName: 'Oil Filter' },
          { partTerminologyId: 4812, partName: 'Air Filter' },
        ],
      },
      {
        name: 'Engine Bearings',
        parts: [
          { partTerminologyId: 4820, partName: 'Engine Bearing Set' },
          { partTerminologyId: 4822, partName: 'Rod Bearing' },
          { partTerminologyId: 4824, partName: 'Main Bearing' },
        ],
      },
      {
        name: 'Gaskets & Seals',
        parts: [
          { partTerminologyId: 4830, partName: 'Head Gasket' },
          { partTerminologyId: 4832, partName: 'Valve Cover Gasket' },
          { partTerminologyId: 4834, partName: 'Oil Pan Gasket' },
          { partTerminologyId: 4836, partName: 'Intake Manifold Gasket' },
        ],
      },
    ],
  },
  {
    id: 'exhaust',
    name: 'Exhaust',
    subcategories: [
      {
        name: 'Catalytic Converters',
        parts: [
          { partTerminologyId: 5010, partName: 'Catalytic Converter' },
          { partTerminologyId: 5012, partName: 'Direct-Fit Catalytic Converter' },
          { partTerminologyId: 5014, partName: 'Universal Catalytic Converter' },
        ],
      },
      {
        name: 'Mufflers',
        parts: [
          { partTerminologyId: 5020, partName: 'Muffler' },
          { partTerminologyId: 5022, partName: 'Resonator' },
        ],
      },
      {
        name: 'Exhaust Pipes',
        parts: [
          { partTerminologyId: 5030, partName: 'Exhaust Pipe' },
          { partTerminologyId: 5032, partName: 'Tail Pipe' },
          { partTerminologyId: 5034, partName: 'Intermediate Pipe' },
          { partTerminologyId: 5036, partName: 'Exhaust Manifold' },
        ],
      },
    ],
  },
  {
    id: 'brakes',
    name: 'Brakes',
    subcategories: [
      {
        name: 'Brake Pads & Shoes',
        parts: [
          { partTerminologyId: 5110, partName: 'Disc Brake Pad Set' },
          { partTerminologyId: 5112, partName: 'Drum Brake Shoe Set' },
        ],
      },
      {
        name: 'Rotors & Drums',
        parts: [
          { partTerminologyId: 5120, partName: 'Brake Rotor' },
          { partTerminologyId: 5122, partName: 'Brake Drum' },
        ],
      },
      {
        name: 'Brake Hardware',
        parts: [
          { partTerminologyId: 5130, partName: 'Brake Caliper' },
          { partTerminologyId: 5132, partName: 'Brake Hose' },
          { partTerminologyId: 5134, partName: 'Brake Master Cylinder' },
          { partTerminologyId: 5136, partName: 'Brake Caliper Bracket' },
          { partTerminologyId: 5138, partName: 'Brake Hardware Kit' },
        ],
      },
    ],
  },
  {
    id: 'suspension',
    name: 'Suspension / Steering',
    subcategories: [
      {
        name: 'Shocks & Struts',
        parts: [
          { partTerminologyId: 5210, partName: 'Shock Absorber' },
          { partTerminologyId: 5212, partName: 'Strut Assembly' },
        ],
      },
      {
        name: 'Control Arms',
        parts: [
          { partTerminologyId: 5220, partName: 'Control Arm' },
          { partTerminologyId: 5222, partName: 'Control Arm Bushing' },
        ],
      },
      {
        name: 'Ball Joints & Tie Rods',
        parts: [
          { partTerminologyId: 5230, partName: 'Ball Joint' },
          { partTerminologyId: 5232, partName: 'Tie Rod End' },
          { partTerminologyId: 5234, partName: 'Sway Bar Link' },
        ],
      },
      {
        name: 'Steering',
        parts: [
          { partTerminologyId: 5240, partName: 'Power Steering Pump' },
          { partTerminologyId: 5242, partName: 'Steering Rack' },
        ],
      },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    subcategories: [
      {
        name: 'Charging System',
        parts: [
          { partTerminologyId: 5310, partName: 'Alternator' },
          { partTerminologyId: 5312, partName: 'Voltage Regulator' },
        ],
      },
      {
        name: 'Starting System',
        parts: [
          { partTerminologyId: 5320, partName: 'Starter Motor' },
          { partTerminologyId: 5322, partName: 'Starter Solenoid' },
        ],
      },
      {
        name: 'Battery',
        parts: [
          { partTerminologyId: 5330, partName: 'Battery' },
          { partTerminologyId: 5332, partName: 'Battery Cable' },
          { partTerminologyId: 5334, partName: 'Battery Terminal' },
        ],
      },
    ],
  },
  {
    id: 'fuel',
    name: 'Fuel',
    subcategories: [
      {
        name: 'Fuel Delivery',
        parts: [
          { partTerminologyId: 5410, partName: 'Fuel Pump' },
          { partTerminologyId: 5412, partName: 'Fuel Pump Assembly' },
          { partTerminologyId: 5414, partName: 'Fuel Pressure Regulator' },
        ],
      },
      {
        name: 'Fuel Injection',
        parts: [
          { partTerminologyId: 5420, partName: 'Fuel Injector' },
          { partTerminologyId: 5422, partName: 'Fuel Injector O-Ring' },
        ],
      },
      {
        name: 'Fuel Filtration',
        parts: [
          { partTerminologyId: 5430, partName: 'Fuel Filter' },
          { partTerminologyId: 5432, partName: 'Fuel Water Separator' },
        ],
      },
    ],
  },
  {
    id: 'cooling',
    name: 'Cooling',
    subcategories: [
      {
        name: 'Radiators & Condensers',
        parts: [
          { partTerminologyId: 5510, partName: 'Radiator' },
          { partTerminologyId: 5512, partName: 'A/C Condenser' },
        ],
      },
      {
        name: 'Water Pumps',
        parts: [
          { partTerminologyId: 5520, partName: 'Water Pump' },
          { partTerminologyId: 5522, partName: 'Coolant Thermostat' },
        ],
      },
      {
        name: 'Hoses & Clamps',
        parts: [
          { partTerminologyId: 5530, partName: 'Radiator Hose' },
          { partTerminologyId: 5532, partName: 'Heater Hose' },
          { partTerminologyId: 5534, partName: 'Hose Clamp' },
        ],
      },
    ],
  },
  {
    id: 'sensors',
    name: 'Sensors',
    subcategories: [
      {
        name: 'Emission Sensors',
        parts: [
          { partTerminologyId: 5610, partName: 'Oxygen Sensor' },
          { partTerminologyId: 5612, partName: 'NOx Sensor' },
        ],
      },
      {
        name: 'Engine Management Sensors',
        parts: [
          { partTerminologyId: 5620, partName: 'Mass Air Flow Sensor' },
          { partTerminologyId: 5622, partName: 'Throttle Position Sensor' },
          { partTerminologyId: 5624, partName: 'Camshaft Position Sensor' },
          { partTerminologyId: 5626, partName: 'Crankshaft Position Sensor' },
          { partTerminologyId: 5628, partName: 'MAP Sensor' },
        ],
      },
      {
        name: 'Temperature & Pressure Sensors',
        parts: [
          { partTerminologyId: 5630, partName: 'Coolant Temperature Sensor' },
          { partTerminologyId: 5632, partName: 'Oil Pressure Sensor' },
          { partTerminologyId: 5634, partName: 'Intake Air Temperature Sensor' },
        ],
      },
    ],
  },
  {
    id: 'bearings',
    name: 'Bearings',
    subcategories: [
      {
        name: 'Wheel Bearings',
        parts: [
          { partTerminologyId: 5710, partName: 'Wheel Bearing' },
          { partTerminologyId: 5712, partName: 'Wheel Bearing and Hub Assembly' },
        ],
      },
      {
        name: 'Engine Bearings',
        parts: [
          { partTerminologyId: 5720, partName: 'Connecting Rod Bearing Set' },
          { partTerminologyId: 5722, partName: 'Main Bearing Set' },
          { partTerminologyId: 5724, partName: 'Thrust Bearing Set' },
        ],
      },
      {
        name: 'Drivetrain Bearings',
        parts: [
          { partTerminologyId: 5730, partName: 'Pilot Bearing' },
          { partTerminologyId: 5732, partName: 'Throwout Bearing' },
        ],
      },
    ],
  },
  {
    id: 'kits',
    name: 'Kits',
    subcategories: [
      {
        name: 'Timing Kits',
        parts: [
          { partTerminologyId: 5810, partName: 'Timing Belt Kit' },
          { partTerminologyId: 5812, partName: 'Timing Chain Kit' },
        ],
      },
      {
        name: 'Brake Kits',
        parts: [
          { partTerminologyId: 5820, partName: 'Brake Pad and Rotor Kit' },
          { partTerminologyId: 5822, partName: 'Drum Brake Kit' },
        ],
      },
      {
        name: 'Gasket Kits',
        parts: [
          { partTerminologyId: 5830, partName: 'Full Gasket Set' },
          { partTerminologyId: 5832, partName: 'Head Gasket Set' },
        ],
      },
      {
        name: 'Suspension Kits',
        parts: [
          { partTerminologyId: 5840, partName: 'Strut Mount Kit' },
          { partTerminologyId: 5842, partName: 'Sway Bar Kit' },
        ],
      },
    ],
  },
]
