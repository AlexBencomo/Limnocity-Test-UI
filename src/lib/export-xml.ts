import type { Part } from '@/data/parts'
import type { Application } from '@/data/applications'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function generatePiesXml(parts: Part[]): string {
  const today = new Date().toISOString().slice(0, 10)

  const items = parts.map((part, i) => {
    const descLines: string[] = []
    if (part.descriptions.short) {
      descLines.push(`        <Description MaintenanceType="A" DescriptionCode="SHO" LanguageCode="EN">${escapeXml(part.descriptions.short)}</Description>`)
    }
    if (part.descriptions.long) {
      descLines.push(`        <Description MaintenanceType="A" DescriptionCode="EXT" LanguageCode="EN">${escapeXml(part.descriptions.long)}</Description>`)
    }
    if (part.descriptions.marketing) {
      descLines.push(`        <Description MaintenanceType="A" DescriptionCode="MKT" LanguageCode="EN">${escapeXml(part.descriptions.marketing)}</Description>`)
    }

    const priceLines = [
      `        <Pricing MaintenanceType="A">`,
      `          <PriceType>WD1</PriceType>`,
      `          <Price UOM="PE">${part.pricing.wholesale.toFixed(2)}</Price>`,
      `          <CurrencyCode>${part.pricing.currency}</CurrencyCode>`,
      `          <EffectiveDate>${part.pricing.effectiveDate}</EffectiveDate>`,
      `          <PriceSheet>${escapeXml(part.pricing.priceSheet)}</PriceSheet>`,
      `        </Pricing>`,
      `        <Pricing MaintenanceType="A">`,
      `          <PriceType>JBR</PriceType>`,
      `          <Price UOM="PE">${part.pricing.jobber.toFixed(2)}</Price>`,
      `          <CurrencyCode>${part.pricing.currency}</CurrencyCode>`,
      `          <EffectiveDate>${part.pricing.effectiveDate}</EffectiveDate>`,
      `        </Pricing>`,
      `        <Pricing MaintenanceType="A">`,
      `          <PriceType>RET</PriceType>`,
      `          <Price UOM="PE">${part.pricing.retail.toFixed(2)}</Price>`,
      `          <CurrencyCode>${part.pricing.currency}</CurrencyCode>`,
      `          <EffectiveDate>${part.pricing.effectiveDate}</EffectiveDate>`,
      `        </Pricing>`,
    ]

    const pkgLines = [
      `        <Package MaintenanceType="A">`,
      `          <PackageLevelGTIN>${part.packaging.gtin}</PackageLevelGTIN>`,
      `          <PackageUOM>EA</PackageUOM>`,
      `          <QuantityOfEachs>${part.packaging.quantityOfEachs}</QuantityOfEachs>`,
      `          <Dimensions UOM="${part.packaging.dimensionUom}">`,
      `            <Height>${part.packaging.height}</Height>`,
      `            <Width>${part.packaging.width}</Width>`,
      `            <Length>${part.packaging.length}</Length>`,
      `          </Dimensions>`,
      `          <Weights UOM="${part.packaging.weightUom}">`,
      `            <Weight>${part.packaging.weight}</Weight>`,
      `          </Weights>`,
      `          <ContainerType>${escapeXml(part.packaging.containerType)}</ContainerType>`,
      `        </Package>`,
    ]

    const attrLines = part.attributes.map(attr => [
      `        <ProductAttribute MaintenanceType="A">`,
      `          <AttributeID>${attr.padbId}</AttributeID>`,
      `          <AttributeName>${escapeXml(attr.name)}</AttributeName>`,
      `          <AttributeValue${attr.uom ? ` UOM="${escapeXml(attr.uom)}"` : ''}>${escapeXml(attr.value)}</AttributeValue>`,
      `        </ProductAttribute>`,
    ].join('\n')).join('\n')

    const assetLines = part.digitalAssets.map(asset => [
      `        <DigitalFileInformation MaintenanceType="A">`,
      `          <FileName>${escapeXml(asset.fileName)}</FileName>`,
      `          <AssetType>${escapeXml(asset.assetType)}</AssetType>`,
      `          <FileType>${escapeXml(asset.fileType)}</FileType>`,
      `          <URI>${escapeXml(asset.uri)}</URI>`,
      `        </DigitalFileInformation>`,
    ].join('\n')).join('\n')

    const interchangeLines = part.interchanges.map(ic => [
      `        <Interchange MaintenanceType="A">`,
      `          <TypeCode>${ic.type === 'OE' ? 'O' : 'C'}</TypeCode>`,
      `          <BrandAAIAID>${escapeXml(ic.brandCode)}</BrandAAIAID>`,
      `          <PartNumber>${escapeXml(ic.partNumber)}</PartNumber>`,
      ic.notes ? `          <Note>${escapeXml(ic.notes)}</Note>` : null,
      `        </Interchange>`,
    ].filter(Boolean).join('\n')).join('\n')

    const extLines = [
      `        <ExtendedInformation MaintenanceType="A">`,
      `          <CountryOfOrigin>${part.extendedInfo.countryOfOrigin}</CountryOfOrigin>`,
      `          <HazardousMaterial>${part.extendedInfo.hazmat ? 'Y' : 'N'}</HazardousMaterial>`,
      part.extendedInfo.harmonizedTariff ? `          <HarmonizedTariffCode>${part.extendedInfo.harmonizedTariff}</HarmonizedTariffCode>` : null,
      `          <WarrantyMonths>${part.extendedInfo.warrantyMonths}</WarrantyMonths>`,
      `          <LifeCycleStatus>${escapeXml(part.extendedInfo.lifeCycleStatus)}</LifeCycleStatus>`,
      `        </ExtendedInformation>`,
    ].filter(Boolean).join('\n')

    const sections = [
      `      <PartNumber>${escapeXml(part.partNumber)}</PartNumber>`,
      `      <BrandAAIAID>${escapeXml(part.brandCode)}</BrandAAIAID>`,
      part.subBrand ? `      <SubBrandAAIAID>${escapeXml(part.subBrand)}</SubBrandAAIAID>` : null,
      `      <PartTerminologyID>${part.partTerminologyId}</PartTerminologyID>`,
      `      <ACESApplications>${part.acesApplications ? 'Y' : 'N'}</ACESApplications>`,
      `      <QuantityPerApplication UOM="${escapeXml(part.quantityUom)}" Qualifier="${escapeXml(part.quantityQualifier)}">${part.quantityPerApplication}</QuantityPerApplication>`,
      descLines.length > 0 ? `      <Descriptions>\n${descLines.join('\n')}\n      </Descriptions>` : null,
      `      <Prices>\n${priceLines.join('\n')}\n      </Prices>`,
      pkgLines.join('\n'),
      attrLines || null,
      assetLines || null,
      interchangeLines || null,
      extLines,
    ].filter(Boolean).join('\n')

    return `    <Item MaintenanceType="A">\n${sections}\n    </Item>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<PIES xmlns="http://www.aftermarket.org" PIESVersion="7.2">
  <Header>
    <PIESVersion>7.2</PIESVersion>
    <SubmissionType>FULL</SubmissionType>
    <BlanketEffectiveDate>${today}</BlanketEffectiveDate>
    <ParentAAIAID>DKGX</ParentAAIAID>
    <BrandOwnerAAIAID>DKGX</BrandOwnerAAIAID>
  </Header>
  <Items>
${items.join('\n')}
  </Items>
  <Trailer>
    <ItemCount>${parts.length}</ItemCount>
    <TransactionDate>${today}</TransactionDate>
  </Trailer>
</PIES>`
}

export function generateAcesXml(applications: Application[], parts: Part[]): string {
  const today = new Date().toISOString().slice(0, 10)
  const partMap = new Map(parts.map(p => [p.id, p]))

  const appLines = applications.map((app, i) => {
    const part = partMap.get(app.partId)
    if (!part) return null

    const qualifierLines = app.qualifiers.map(q =>
      `      <Qual>${escapeXml(q)}</Qual>`
    ).join('\n')

    const noteLines = app.notes
      ? `      <Note>${escapeXml(app.notes)}</Note>`
      : null

    const lines = [
      `    <App action="A" id="${i + 1}">`,
      `      <BaseVehicle id="${app.baseVehicleId}"/>`,
      `      <Year>${app.year}</Year>`,
      `      <Make>${escapeXml(app.make)}</Make>`,
      `      <Model>${escapeXml(app.model)}</Model>`,
      app.subModel ? `      <SubModel>${escapeXml(app.subModel)}</SubModel>` : null,
      app.engineBase ? `      <EngineBase>${escapeXml(app.engineBase)}</EngineBase>` : null,
      app.fuelType ? `      <FuelType>${escapeXml(app.fuelType)}</FuelType>` : null,
      app.driveType ? `      <DriveType>${escapeXml(app.driveType)}</DriveType>` : null,
      app.bodyType ? `      <BodyType>${escapeXml(app.bodyType)}</BodyType>` : null,
      app.position ? `      <Position>${escapeXml(app.position)}</Position>` : null,
      `      <Qty>${app.quantity}</Qty>`,
      qualifierLines || null,
      noteLines,
      `      <Part BrandAAIAID="${escapeXml(part.brandCode)}">${escapeXml(part.partNumber)}</Part>`,
      `    </App>`,
    ].filter(Boolean).join('\n')

    return lines
  }).filter(Boolean)

  return `<?xml version="1.0" encoding="UTF-8"?>
<ACES version="4.2">
  <Header>
    <Company>Limnocity Catalog</Company>
    <SenderName>Limnocity</SenderName>
    <TransferDate>${today}</TransferDate>
    <SubmissionType>FULL</SubmissionType>
    <BrandAAIAID>DKGX</BrandAAIAID>
    <VcdbVersionDate>${today}</VcdbVersionDate>
  </Header>
${appLines.join('\n')}
  <Footer>
    <RecordCount>${appLines.length}</RecordCount>
  </Footer>
</ACES>`
}

export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
