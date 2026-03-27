export interface Application {
  id: string
  partId: string
  baseVehicleId: number
  year: number
  make: string
  model: string
  subModel: string
  engineBase: string
  fuelType: string
  driveType: string
  bodyType: string
  position: string
  quantity: number
  qualifiers: string[]
  notes: string
}

export const applications: Application[] = [
  // ── part-001: 51356 — Catalytic Converter (DKGX) ───────────────────
  { id: 'app-001', partId: 'prt-001', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Rear', quantity: 1, qualifiers: ['Federal Emissions'], notes: 'Direct-fit, rear converter' },
  { id: 'app-002', partId: 'prt-001', baseVehicleId: 10101, year: 2014, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Rear', quantity: 1, qualifiers: ['Federal Emissions'], notes: 'Direct-fit, rear converter' },
  { id: 'app-003', partId: 'prt-001', baseVehicleId: 10102, year: 2015, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '3.5L V6 J35Y1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Rear', quantity: 1, qualifiers: ['CARB Compliant'], notes: 'Direct-fit, rear converter; California legal' },
  { id: 'app-004', partId: 'prt-001', baseVehicleId: 10103, year: 2016, make: 'Acura', model: 'TLX', subModel: 'Base', engineBase: '2.4L 4-cyl K24W7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Rear', quantity: 1, qualifiers: ['Federal Emissions'], notes: '' },

  // ── part-002: MF12259 — Muffler (DKGX) ────────────────────────────
  { id: 'app-005', partId: 'prt-002', baseVehicleId: 20000, year: 2018, make: 'Ford', model: 'Mustang', subModel: 'GT', engineBase: '5.0L V8 Coyote', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'Rear', quantity: 2, qualifiers: ['Universal Fit'], notes: 'Universal muffler; 2.5" inlet/outlet; requires custom fitment' },
  { id: 'app-006', partId: 'prt-002', baseVehicleId: 20001, year: 2020, make: 'Chevrolet', model: 'Camaro', subModel: 'SS', engineBase: '6.2L V8 LT1', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'Rear', quantity: 2, qualifiers: ['Universal Fit'], notes: 'Universal muffler; verify pipe diameter before purchase' },
  { id: 'app-007', partId: 'prt-002', baseVehicleId: 20002, year: 2019, make: 'Dodge', model: 'Challenger', subModel: 'R/T', engineBase: '5.7L V8 Hemi', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'Rear', quantity: 2, qualifiers: ['Universal Fit'], notes: '' },

  // ── part-003: EP15044 — Exhaust Pipe (DKGX) ───────────────────────
  { id: 'app-008', partId: 'prt-003', baseVehicleId: 30100, year: 2017, make: 'Ford', model: 'F-150', subModel: 'XLT', engineBase: '3.5L V6 EcoBoost', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'Intermediate', quantity: 1, qualifiers: [], notes: 'Between catalytic converter and muffler' },
  { id: 'app-009', partId: 'prt-003', baseVehicleId: 30101, year: 2018, make: 'Ford', model: 'F-150', subModel: 'Lariat', engineBase: '5.0L V8 Coyote', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'Intermediate', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-010', partId: 'prt-003', baseVehicleId: 30102, year: 2019, make: 'Ford', model: 'F-150', subModel: 'XLT', engineBase: '2.7L V6 EcoBoost', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Regular Cab', position: 'Intermediate', quantity: 1, qualifiers: [], notes: 'Short bed only' },

  // ── part-004: RES10416 — Resonator (DKGX) ─────────────────────────
  { id: 'app-011', partId: 'prt-004', baseVehicleId: 20000, year: 2018, make: 'Ford', model: 'Mustang', subModel: 'GT', engineBase: '5.0L V8 Coyote', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'Midpipe', quantity: 1, qualifiers: ['Universal Fit'], notes: 'Universal resonator; 2.25" inlet/outlet' },
  { id: 'app-012', partId: 'prt-004', baseVehicleId: 40000, year: 2021, make: 'Subaru', model: 'WRX', subModel: 'Base', engineBase: '2.0L Turbo 4-cyl FA20', fuelType: 'Gas', driveType: 'AWD', bodyType: 'Sedan', position: 'Midpipe', quantity: 1, qualifiers: ['Universal Fit'], notes: '' },

  // ── part-005: EM20001 — Exhaust Manifold (DKGX) ───────────────────
  { id: 'app-013', partId: 'prt-005', baseVehicleId: 50100, year: 2014, make: 'Chevrolet', model: 'Silverado 1500', subModel: 'LT', engineBase: '5.3L V8 L83', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'Left', quantity: 1, qualifiers: [], notes: 'Driver-side exhaust manifold' },
  { id: 'app-014', partId: 'prt-005', baseVehicleId: 50101, year: 2015, make: 'GMC', model: 'Sierra 1500', subModel: 'SLE', engineBase: '5.3L V8 L83', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Double Cab', position: 'Left', quantity: 1, qualifiers: [], notes: 'Driver-side exhaust manifold' },
  { id: 'app-015', partId: 'prt-005', baseVehicleId: 50102, year: 2016, make: 'Chevrolet', model: 'Tahoe', subModel: 'LT', engineBase: '5.3L V8 L83', fuelType: 'Flex Fuel', driveType: '4WD', bodyType: 'SUV', position: 'Left', quantity: 1, qualifiers: ['E85 Compatible'], notes: '' },

  // ── part-006: EB1 — Engine Bearing Set (BSCH) ─────────────────────
  { id: 'app-016', partId: 'prt-006', baseVehicleId: 60100, year: 2012, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: 'Complete bearing set for 2AR-FE engine' },
  { id: 'app-017', partId: 'prt-006', baseVehicleId: 60101, year: 2013, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-018', partId: 'prt-006', baseVehicleId: 60102, year: 2014, make: 'Toyota', model: 'Camry', subModel: 'LE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-007: IC-BP1 — Ignition Coil (BSCH) ──────────────────────
  { id: 'app-019', partId: 'prt-007', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: 'Coil-on-plug; sold individually; 4 required' },
  { id: 'app-020', partId: 'prt-007', baseVehicleId: 70101, year: 2017, make: 'Honda', model: 'CR-V', subModel: 'EX-L', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: 'Coil-on-plug; sold individually; 4 required' },
  { id: 'app-021', partId: 'prt-007', baseVehicleId: 70102, year: 2018, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },
  { id: 'app-022', partId: 'prt-007', baseVehicleId: 70103, year: 2019, make: 'Acura', model: 'RDX', subModel: 'Base', engineBase: '2.0L Turbo 4-cyl K20C6', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },

  // ── part-008: SP100 — Spark Plug (BSCH) ───────────────────────────
  { id: 'app-023', partId: 'prt-008', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: 'Pre-gapped at 0.044"; 4 required' },
  { id: 'app-024', partId: 'prt-008', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },
  { id: 'app-025', partId: 'prt-008', baseVehicleId: 80101, year: 2019, make: 'Toyota', model: 'Corolla', subModel: 'SE', engineBase: '2.0L 4-cyl M20A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },
  { id: 'app-026', partId: 'prt-008', baseVehicleId: 80102, year: 2020, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },
  { id: 'app-027', partId: 'prt-008', baseVehicleId: 80103, year: 2021, make: 'Nissan', model: 'Altima', subModel: 'SV', engineBase: '2.5L 4-cyl QR25DE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },

  // ── part-009: OF200 — Oil Filter (BSCH) ───────────────────────────
  { id: 'app-028', partId: 'prt-009', baseVehicleId: 60100, year: 2012, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-029', partId: 'prt-009', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-030', partId: 'prt-009', baseVehicleId: 80101, year: 2019, make: 'Toyota', model: 'Corolla', subModel: 'SE', engineBase: '2.0L 4-cyl M20A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-031', partId: 'prt-009', baseVehicleId: 60101, year: 2013, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-010: AF300 — Air Filter (BSCH) ───────────────────────────
  { id: 'app-032', partId: 'prt-010', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-033', partId: 'prt-010', baseVehicleId: 70101, year: 2017, make: 'Honda', model: 'CR-V', subModel: 'EX-L', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-034', partId: 'prt-010', baseVehicleId: 80101, year: 2019, make: 'Toyota', model: 'Corolla', subModel: 'SE', engineBase: '2.0L 4-cyl M20A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: 'Panel-style filter' },

  // ── part-011: BPF400 — Front Brake Pad Set (DRMN) ─────────────────
  { id: 'app-035', partId: 'prt-011', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-036', partId: 'prt-011', baseVehicleId: 80104, year: 2019, make: 'Toyota', model: 'Camry', subModel: 'LE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-037', partId: 'prt-011', baseVehicleId: 80105, year: 2020, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-038', partId: 'prt-011', baseVehicleId: 80106, year: 2021, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front', quantity: 1, qualifiers: [], notes: '' },

  // ── part-012: BPR401 — Rear Brake Pad Set (DRMN) ──────────────────
  { id: 'app-039', partId: 'prt-012', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Rear', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-040', partId: 'prt-012', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Rear', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-041', partId: 'prt-012', baseVehicleId: 80103, year: 2021, make: 'Nissan', model: 'Altima', subModel: 'SV', engineBase: '2.5L 4-cyl QR25DE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Rear', quantity: 1, qualifiers: [], notes: '' },

  // ── part-013: BRF500 — Front Brake Rotor (DRMN) ───────────────────
  { id: 'app-042', partId: 'prt-013', baseVehicleId: 90100, year: 2017, make: 'Ford', model: 'Explorer', subModel: 'XLT', engineBase: '3.5L V6 Ti-VCT', fuelType: 'Gas', driveType: 'FWD', bodyType: 'SUV', position: 'Front', quantity: 2, qualifiers: [], notes: 'Sold individually; 2 per axle' },
  { id: 'app-043', partId: 'prt-013', baseVehicleId: 90101, year: 2018, make: 'Ford', model: 'Explorer', subModel: 'Limited', engineBase: '3.5L V6 EcoBoost', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front', quantity: 2, qualifiers: [], notes: '' },
  { id: 'app-044', partId: 'prt-013', baseVehicleId: 90102, year: 2019, make: 'Ford', model: 'Edge', subModel: 'SEL', engineBase: '2.0L Turbo 4-cyl EcoBoost', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front', quantity: 2, qualifiers: [], notes: '' },
  { id: 'app-045', partId: 'prt-013', baseVehicleId: 90103, year: 2016, make: 'Lincoln', model: 'MKX', subModel: 'Reserve', engineBase: '3.7L V6 Ti-VCT', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front', quantity: 2, qualifiers: [], notes: '' },

  // ── part-014: BRR501 — Rear Brake Rotor (DRMN) ───────────────────
  { id: 'app-046', partId: 'prt-014', baseVehicleId: 90100, year: 2017, make: 'Ford', model: 'Explorer', subModel: 'XLT', engineBase: '3.5L V6 Ti-VCT', fuelType: 'Gas', driveType: 'FWD', bodyType: 'SUV', position: 'Rear', quantity: 2, qualifiers: [], notes: 'Sold individually; 2 per axle' },
  { id: 'app-047', partId: 'prt-014', baseVehicleId: 90101, year: 2018, make: 'Ford', model: 'Explorer', subModel: 'Limited', engineBase: '3.5L V6 EcoBoost', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Rear', quantity: 2, qualifiers: [], notes: '' },
  { id: 'app-048', partId: 'prt-014', baseVehicleId: 90103, year: 2016, make: 'Lincoln', model: 'MKX', subModel: 'Reserve', engineBase: '3.7L V6 Ti-VCT', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Rear', quantity: 2, qualifiers: [], notes: '' },

  // ── part-015: BC600 — Brake Caliper (DRMN) ────────────────────────
  { id: 'app-049', partId: 'prt-015', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-050', partId: 'prt-015', baseVehicleId: 80106, year: 2021, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },

  // ── part-016: SA700 — Shock Absorber (DRMN) ───────────────────────
  { id: 'app-051', partId: 'prt-016', baseVehicleId: 30100, year: 2017, make: 'Ford', model: 'F-150', subModel: 'XLT', engineBase: '3.5L V6 EcoBoost', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'Rear', quantity: 2, qualifiers: [], notes: 'Sold individually; 2 per axle' },
  { id: 'app-052', partId: 'prt-016', baseVehicleId: 30101, year: 2018, make: 'Ford', model: 'F-150', subModel: 'Lariat', engineBase: '5.0L V8 Coyote', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'Rear', quantity: 2, qualifiers: [], notes: '' },
  { id: 'app-053', partId: 'prt-016', baseVehicleId: 50100, year: 2014, make: 'Chevrolet', model: 'Silverado 1500', subModel: 'LT', engineBase: '5.3L V8 L83', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'Rear', quantity: 2, qualifiers: [], notes: '' },
  { id: 'app-054', partId: 'prt-016', baseVehicleId: 50101, year: 2015, make: 'GMC', model: 'Sierra 1500', subModel: 'SLE', engineBase: '5.3L V8 L83', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Double Cab', position: 'Rear', quantity: 2, qualifiers: [], notes: '' },

  // ── part-017: SA701 — Strut Assembly (DRMN) ───────────────────────
  { id: 'app-055', partId: 'prt-017', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-056', partId: 'prt-017', baseVehicleId: 80104, year: 2019, make: 'Toyota', model: 'Camry', subModel: 'LE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-057', partId: 'prt-017', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },

  // ── part-018: ST800 — Tie Rod End (DRMN) ──────────────────────────
  { id: 'app-058', partId: 'prt-018', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Outer Left', quantity: 1, qualifiers: [], notes: 'Alignment required after installation' },
  { id: 'app-059', partId: 'prt-018', baseVehicleId: 70101, year: 2017, make: 'Honda', model: 'CR-V', subModel: 'EX-L', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front Outer Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-060', partId: 'prt-018', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Outer Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-061', partId: 'prt-018', baseVehicleId: 70102, year: 2018, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Outer Left', quantity: 1, qualifiers: [], notes: '' },

  // ── part-019: CA900 — Control Arm (DRMN) ──────────────────────────
  { id: 'app-062', partId: 'prt-019', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Lower Left', quantity: 1, qualifiers: [], notes: 'Alignment required after installation' },
  { id: 'app-063', partId: 'prt-019', baseVehicleId: 80104, year: 2019, make: 'Toyota', model: 'Camry', subModel: 'LE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Lower Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-064', partId: 'prt-019', baseVehicleId: 80106, year: 2021, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front Lower Left', quantity: 1, qualifiers: [], notes: '' },

  // ── part-020: SBL1000 — Sway Bar Link (DRMN) ─────────────────────
  { id: 'app-065', partId: 'prt-020', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-066', partId: 'prt-020', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-067', partId: 'prt-020', baseVehicleId: 70101, year: 2017, make: 'Honda', model: 'CR-V', subModel: 'EX-L', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-068', partId: 'prt-020', baseVehicleId: 70102, year: 2018, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-069', partId: 'prt-020', baseVehicleId: 70103, year: 2019, make: 'Acura', model: 'RDX', subModel: 'Base', engineBase: '2.0L Turbo 4-cyl K20C6', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Front Left', quantity: 1, qualifiers: [], notes: '' },

  // ── part-021: OS1100 — Oxygen Sensor (DNSO) ──────────────────────
  { id: 'app-070', partId: 'prt-021', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Downstream Bank 1', quantity: 1, qualifiers: ['Federal Emissions'], notes: '' },
  { id: 'app-071', partId: 'prt-021', baseVehicleId: 10101, year: 2014, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Downstream Bank 1', quantity: 1, qualifiers: ['Federal Emissions'], notes: '' },
  { id: 'app-072', partId: 'prt-021', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Downstream Bank 1', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-073', partId: 'prt-021', baseVehicleId: 70101, year: 2017, make: 'Honda', model: 'CR-V', subModel: 'EX-L', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Downstream Bank 1', quantity: 1, qualifiers: [], notes: '' },

  // ── part-022: MAF1200 — Mass Air Flow Sensor (DNSO) ──────────────
  { id: 'app-074', partId: 'prt-022', baseVehicleId: 60100, year: 2012, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-075', partId: 'prt-022', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-076', partId: 'prt-022', baseVehicleId: 80101, year: 2019, make: 'Toyota', model: 'Corolla', subModel: 'SE', engineBase: '2.0L 4-cyl M20A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-077', partId: 'prt-022', baseVehicleId: 60101, year: 2013, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-078', partId: 'prt-022', baseVehicleId: 80107, year: 2020, make: 'Toyota', model: 'RAV4', subModel: 'XLE Premium', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-023: TPS1300 — Throttle Position Sensor (DNSO) ──────────
  { id: 'app-079', partId: 'prt-023', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-080', partId: 'prt-023', baseVehicleId: 10103, year: 2016, make: 'Acura', model: 'TLX', subModel: 'Base', engineBase: '2.4L 4-cyl K24W7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-081', partId: 'prt-023', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-024: CPS1400 — Camshaft Position Sensor (DNSO) ──────────
  { id: 'app-082', partId: 'prt-024', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Intake Side', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-083', partId: 'prt-024', baseVehicleId: 80101, year: 2019, make: 'Toyota', model: 'Corolla', subModel: 'SE', engineBase: '2.0L 4-cyl M20A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Intake Side', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-084', partId: 'prt-024', baseVehicleId: 80107, year: 2020, make: 'Toyota', model: 'RAV4', subModel: 'XLE Premium', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Intake Side', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-085', partId: 'prt-024', baseVehicleId: 60100, year: 2012, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Intake Side', quantity: 1, qualifiers: [], notes: '' },

  // ── part-025: CKPS1500 — Crankshaft Position Sensor (DNSO) ───────
  { id: 'app-086', partId: 'prt-025', baseVehicleId: 80103, year: 2021, make: 'Nissan', model: 'Altima', subModel: 'SV', engineBase: '2.5L 4-cyl QR25DE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-087', partId: 'prt-025', baseVehicleId: 80108, year: 2019, make: 'Nissan', model: 'Sentra', subModel: 'SV', engineBase: '1.8L 4-cyl MRA8DE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-088', partId: 'prt-025', baseVehicleId: 80109, year: 2020, make: 'Nissan', model: 'Rogue', subModel: 'SV', engineBase: '2.5L 4-cyl QR25DE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-026: 5M1038A — Main Bearing Set (ACLR) ──────────────────
  { id: 'app-089', partId: 'prt-026', baseVehicleId: 11100, year: 2000, make: 'Honda', model: 'Civic', subModel: 'Si', engineBase: '1.6L 4-cyl B16A2', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: 'B-series engines only' },
  { id: 'app-090', partId: 'prt-026', baseVehicleId: 11101, year: 1999, make: 'Acura', model: 'Integra', subModel: 'GSR', engineBase: '1.8L 4-cyl B18C1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-091', partId: 'prt-026', baseVehicleId: 11102, year: 2001, make: 'Acura', model: 'Integra', subModel: 'Type R', engineBase: '1.8L 4-cyl B18C5', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: 'Race application -- verify clearances' },

  // ── part-027: 4B1978H — Rod Bearing Set (ACLR) ───────────────────
  { id: 'app-092', partId: 'prt-027', baseVehicleId: 12100, year: 2015, make: 'Subaru', model: 'WRX', subModel: 'Base', engineBase: '2.0L Turbo 4-cyl FA20', fuelType: 'Gas', driveType: 'AWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-093', partId: 'prt-027', baseVehicleId: 12101, year: 2018, make: 'Subaru', model: 'WRX STI', subModel: 'Base', engineBase: '2.5L Turbo 4-cyl EJ257', fuelType: 'Gas', driveType: 'AWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: 'H-Series extra clearance for boosted applications' },
  { id: 'app-094', partId: 'prt-027', baseVehicleId: 12102, year: 2020, make: 'Subaru', model: 'Forester', subModel: 'Sport', engineBase: '2.5L 4-cyl FB25', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-095', partId: 'prt-027', baseVehicleId: 12103, year: 2017, make: 'Subaru', model: 'Outback', subModel: '2.5i Premium', engineBase: '2.5L 4-cyl FB25', fuelType: 'Gas', driveType: 'AWD', bodyType: 'Wagon', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-028: TB2000 — Thrust Bearing Set (ACLR) ─────────────────
  { id: 'app-096', partId: 'prt-028', baseVehicleId: 50100, year: 2014, make: 'Chevrolet', model: 'Silverado 1500', subModel: 'LT', engineBase: '5.3L V8 L83', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-097', partId: 'prt-028', baseVehicleId: 13100, year: 2016, make: 'Chevrolet', model: 'Corvette', subModel: 'Stingray', engineBase: '6.2L V8 LT1', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-098', partId: 'prt-028', baseVehicleId: 13101, year: 2018, make: 'Chevrolet', model: 'Camaro', subModel: 'SS', engineBase: '6.2L V8 LT1', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-029: CB2100 — Rod Bearing Set (ACLR) ────────────────────
  { id: 'app-099', partId: 'prt-029', baseVehicleId: 14100, year: 2018, make: 'Ford', model: 'Mustang', subModel: 'GT', engineBase: '5.0L V8 Coyote Gen 3', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-100', partId: 'prt-029', baseVehicleId: 14101, year: 2019, make: 'Ford', model: 'F-150', subModel: 'Lariat', engineBase: '5.0L V8 Coyote Gen 3', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-101', partId: 'prt-029', baseVehicleId: 14102, year: 2020, make: 'Ford', model: 'Mustang', subModel: 'GT Premium', engineBase: '5.0L V8 Coyote Gen 3', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-030: RAD3000 — Radiator (DRMN) ───────────────────────────
  { id: 'app-102', partId: 'prt-030', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: 'Automatic transmission with integrated trans cooler' },
  { id: 'app-103', partId: 'prt-030', baseVehicleId: 80104, year: 2019, make: 'Toyota', model: 'Camry', subModel: 'LE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: ['Automatic Transmission'], notes: '' },
  { id: 'app-104', partId: 'prt-030', baseVehicleId: 80106, year: 2021, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-105', partId: 'prt-030', baseVehicleId: 80105, year: 2020, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-031: WP3100 — Water Pump (DRMN) ──────────────────────────
  { id: 'app-106', partId: 'prt-031', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-107', partId: 'prt-031', baseVehicleId: 10101, year: 2014, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-108', partId: 'prt-031', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-032: TH3200 — Coolant Thermostat (DRMN) ─────────────────
  { id: 'app-109', partId: 'prt-032', baseVehicleId: 30100, year: 2017, make: 'Ford', model: 'F-150', subModel: 'XLT', engineBase: '3.5L V6 EcoBoost', fuelType: 'Gas', driveType: '4WD', bodyType: 'Crew Cab', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-110', partId: 'prt-032', baseVehicleId: 90100, year: 2017, make: 'Ford', model: 'Explorer', subModel: 'XLT', engineBase: '3.5L V6 Ti-VCT', fuelType: 'Gas', driveType: 'FWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-111', partId: 'prt-032', baseVehicleId: 90101, year: 2018, make: 'Ford', model: 'Explorer', subModel: 'Limited', engineBase: '3.5L V6 EcoBoost', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-112', partId: 'prt-032', baseVehicleId: 90102, year: 2019, make: 'Ford', model: 'Edge', subModel: 'SEL', engineBase: '2.0L Turbo 4-cyl EcoBoost', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-033: RH3300 — Radiator Hose (DRMN) ──────────────────────
  { id: 'app-113', partId: 'prt-033', baseVehicleId: 15100, year: 2016, make: 'Chevrolet', model: 'Malibu', subModel: 'LT', engineBase: '1.5L Turbo 4-cyl LFV', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Upper', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-114', partId: 'prt-033', baseVehicleId: 15101, year: 2017, make: 'Chevrolet', model: 'Equinox', subModel: 'LT', engineBase: '1.5L Turbo 4-cyl LYX', fuelType: 'Gas', driveType: 'FWD', bodyType: 'SUV', position: 'Upper', quantity: 1, qualifiers: [], notes: '' },

  // ── part-034: ALT4000 — Alternator (BSCH) ─────────────────────────
  { id: 'app-115', partId: 'prt-034', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-116', partId: 'prt-034', baseVehicleId: 10101, year: 2014, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-117', partId: 'prt-034', baseVehicleId: 70101, year: 2017, make: 'Honda', model: 'CR-V', subModel: 'EX-L', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-118', partId: 'prt-034', baseVehicleId: 70102, year: 2018, make: 'Honda', model: 'Accord', subModel: 'Sport', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-035: SM4100 — Starter Motor (BSCH) ───────────────────────
  { id: 'app-119', partId: 'prt-035', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-120', partId: 'prt-035', baseVehicleId: 80104, year: 2019, make: 'Toyota', model: 'Camry', subModel: 'LE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-121', partId: 'prt-035', baseVehicleId: 60100, year: 2012, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl 2AR-FE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-122', partId: 'prt-035', baseVehicleId: 16100, year: 2015, make: 'Lexus', model: 'ES 350', subModel: 'Base', engineBase: '3.5L V6 2GR-FE', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },

  // ── part-036: BT4200 — Battery (BSCH) ─────────────────────────────
  { id: 'app-123', partId: 'prt-036', baseVehicleId: 17100, year: 2019, make: 'BMW', model: '330i', subModel: 'Base', engineBase: '2.0L Turbo 4-cyl B48', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Sedan', position: 'Trunk', quantity: 1, qualifiers: ['Start-Stop System'], notes: 'AGM required for start-stop vehicles' },
  { id: 'app-124', partId: 'prt-036', baseVehicleId: 17101, year: 2020, make: 'BMW', model: '530i', subModel: 'xDrive', engineBase: '2.0L Turbo 4-cyl B48', fuelType: 'Gas', driveType: 'AWD', bodyType: 'Sedan', position: 'Trunk', quantity: 1, qualifiers: ['Start-Stop System'], notes: 'AGM required' },
  { id: 'app-125', partId: 'prt-036', baseVehicleId: 17102, year: 2021, make: 'Mercedes-Benz', model: 'C 300', subModel: 'Base', engineBase: '2.0L Turbo 4-cyl M264', fuelType: 'Gas', driveType: 'RWD', bodyType: 'Sedan', position: 'Under Hood', quantity: 1, qualifiers: ['Start-Stop System'], notes: '' },
  { id: 'app-126', partId: 'prt-036', baseVehicleId: 18100, year: 2022, make: 'Hyundai', model: 'Sonata', subModel: 'SEL', engineBase: '2.5L 4-cyl Smartstream', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Under Hood', quantity: 1, qualifiers: [], notes: '' },

  // ── part-037: FP5000 — Fuel Pump Assembly (DNSO) ─────────────────
  { id: 'app-127', partId: 'prt-037', baseVehicleId: 80100, year: 2018, make: 'Toyota', model: 'Camry', subModel: 'XSE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'In-Tank', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-128', partId: 'prt-037', baseVehicleId: 80104, year: 2019, make: 'Toyota', model: 'Camry', subModel: 'LE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'In-Tank', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-129', partId: 'prt-037', baseVehicleId: 80106, year: 2021, make: 'Toyota', model: 'RAV4', subModel: 'XLE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'In-Tank', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-130', partId: 'prt-037', baseVehicleId: 80105, year: 2020, make: 'Toyota', model: 'Camry', subModel: 'SE', engineBase: '2.5L 4-cyl A25A-FKS', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'In-Tank', quantity: 1, qualifiers: [], notes: '' },

  // ── part-038: FI5100 — Fuel Injector (DNSO) ──────────────────────
  { id: 'app-131', partId: 'prt-038', baseVehicleId: 10100, year: 2013, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '2.4L 4-cyl K24W1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: 'Sold individually; 4 required' },
  { id: 'app-132', partId: 'prt-038', baseVehicleId: 70100, year: 2016, make: 'Honda', model: 'Civic', subModel: 'EX', engineBase: '1.5L Turbo 4-cyl L15B7', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },
  { id: 'app-133', partId: 'prt-038', baseVehicleId: 70101, year: 2017, make: 'Honda', model: 'CR-V', subModel: 'EX-L', engineBase: '1.5L Turbo 4-cyl L15BE', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'Cylinder 1-4', quantity: 4, qualifiers: [], notes: '' },

  // ── part-039: FF5200 — Fuel Filter (DNSO) ─────────────────────────
  { id: 'app-134', partId: 'prt-039', baseVehicleId: 18100, year: 2022, make: 'Hyundai', model: 'Sonata', subModel: 'SEL', engineBase: '2.5L 4-cyl Smartstream', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Under Vehicle', quantity: 1, qualifiers: ['GDI Engine'], notes: 'High-pressure filter for GDI system' },
  { id: 'app-135', partId: 'prt-039', baseVehicleId: 18101, year: 2021, make: 'Hyundai', model: 'Elantra', subModel: 'SEL', engineBase: '2.0L 4-cyl Smartstream', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Under Vehicle', quantity: 1, qualifiers: ['GDI Engine'], notes: '' },
  { id: 'app-136', partId: 'prt-039', baseVehicleId: 18102, year: 2020, make: 'Kia', model: 'Optima', subModel: 'LX', engineBase: '2.4L 4-cyl Theta II GDI', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'Under Vehicle', quantity: 1, qualifiers: ['GDI Engine'], notes: '' },

  // ── part-040: TBK6000 — Timing Belt Kit (BSCH) ───────────────────
  { id: 'app-137', partId: 'prt-040', baseVehicleId: 10102, year: 2015, make: 'Honda', model: 'Accord', subModel: 'EX-L', engineBase: '3.5L V6 J35Y1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: 'Recommended replacement at 105,000 miles' },
  { id: 'app-138', partId: 'prt-040', baseVehicleId: 19100, year: 2016, make: 'Honda', model: 'Pilot', subModel: 'EX-L', engineBase: '3.5L V6 J35Y6', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-139', partId: 'prt-040', baseVehicleId: 19101, year: 2017, make: 'Honda', model: 'Ridgeline', subModel: 'RTL', engineBase: '3.5L V6 J35Y6', fuelType: 'Gas', driveType: 'AWD', bodyType: 'Truck', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-140', partId: 'prt-040', baseVehicleId: 19102, year: 2014, make: 'Honda', model: 'Odyssey', subModel: 'EX-L', engineBase: '3.5L V6 J35Y4', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Minivan', position: 'N/A', quantity: 1, qualifiers: [], notes: 'Includes water pump -- recommended to replace together' },
  { id: 'app-141', partId: 'prt-040', baseVehicleId: 19103, year: 2013, make: 'Acura', model: 'MDX', subModel: 'Base', engineBase: '3.5L V6 J35Y5', fuelType: 'Gas', driveType: 'AWD', bodyType: 'SUV', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-142', partId: 'prt-040', baseVehicleId: 19104, year: 2016, make: 'Acura', model: 'TLX', subModel: 'V6', engineBase: '3.5L V6 J35Y6', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-143', partId: 'prt-040', baseVehicleId: 19105, year: 2015, make: 'Acura', model: 'RLX', subModel: 'Base', engineBase: '3.5L V6 J35Y3', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Sedan', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
  { id: 'app-144', partId: 'prt-040', baseVehicleId: 10102, year: 2016, make: 'Honda', model: 'Accord', subModel: 'EX-L V6', engineBase: '3.5L V6 J35Y1', fuelType: 'Gas', driveType: 'FWD', bodyType: 'Coupe', position: 'N/A', quantity: 1, qualifiers: [], notes: '' },
]
