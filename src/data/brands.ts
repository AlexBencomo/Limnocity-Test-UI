export interface Brand {
  code: string
  name: string
  subBrands: string[]
}

export const brands: Brand[] = [
  { code: 'DKGX', name: 'MagnaFlow Exhaust Products', subBrands: ['Performance', 'OEM Grade', 'Race', 'California', 'Street', 'Pro', 'Black', 'NEO', 'Sport', 'Touring'] },
  { code: 'ACLR', name: 'ACL Race Series', subBrands: ['Race', 'OEM Replacement', 'Performance', 'Standard'] },
  { code: 'BSCH', name: 'Bosch', subBrands: ['Premium', 'OE Replacement', 'Platinum', 'Iridium'] },
  { code: 'DNSO', name: 'Denso', subBrands: ['Iridium Power', 'Iridium TT', 'Standard', 'Platinum'] },
  { code: 'DRMN', name: 'Dorman', subBrands: ['OE Solutions', 'HD Solutions', 'Help!', 'First Stop'] },
]
