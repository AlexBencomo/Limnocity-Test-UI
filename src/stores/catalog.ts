import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Part } from '@/data/parts'
import type { Application } from '@/data/applications'

export type TabName =
  | 'item'
  | 'description'
  | 'application'
  | 'attributes'
  | 'package'
  | 'pricing'
  | 'ext-info'
  | 'kit'
  | 'interchange'
  | 'digital-assets'
  | 'custom-fields'

export const useCatalogStore = defineStore('catalog', () => {
  const parts = ref<Part[]>([])
  const applications = ref<Application[]>([])
  const selectedPartId = ref<string | null>(null)
  const selectedTab = ref<TabName>('item')
  const searchQuery = ref('')
  const filterCategory = ref<string | null>(null)
  const filterStatus = ref<string | null>(null)
  const sortBy = ref<'partNumber' | 'partName' | 'createdAt' | 'status'>('partNumber')
  const sortDirection = ref<'asc' | 'desc'>('asc')
  const selectedPartIds = ref<Set<string>>(new Set())
  const sidebarCollapsed = ref(false)
  const mobileMenuOpen = ref(false)
  const detailMode = ref(false)

  const selectedPart = computed(() =>
    parts.value.find((p) => p.id === selectedPartId.value) ?? null,
  )

  const selectedPartApplications = computed(() =>
    applications.value.filter((a) => a.partId === selectedPartId.value),
  )

  const filteredParts = computed(() => {
    let result = parts.value

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (p) =>
          p.partNumber.toLowerCase().includes(q) ||
          p.partName.toLowerCase().includes(q) ||
          p.descriptions.short.toLowerCase().includes(q),
      )
    }

    if (filterCategory.value && filterCategory.value !== '__all__') {
      result = result.filter((p) => p.category === filterCategory.value)
    }

    if (filterStatus.value && filterStatus.value !== '__all__') {
      result = result.filter((p) => p.status === filterStatus.value)
    }

    result = [...result].sort((a, b) => {
      const aVal = a[sortBy.value]
      const bVal = b[sortBy.value]
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDirection.value === 'asc' ? cmp : -cmp
    })

    return result
  })

  const categories = computed(() => {
    const cats = new Set(parts.value.map((p) => p.category))
    return Array.from(cats).sort()
  })

  const stats = computed(() => ({
    total: parts.value.length,
    approved: parts.value.filter((p) => p.status === 'approved').length,
    review: parts.value.filter((p) => p.status === 'review').length,
    draft: parts.value.filter((p) => p.status === 'draft').length,
    withApplications: parts.value.filter((p) => p.acesApplications).length,
    totalApplications: applications.value.length,
  }))

  function selectPart(id: string) {
    selectedPartId.value = id
  }

  function enterDetail(id: string) {
    selectedPartId.value = id
    detailMode.value = true
  }

  function exitDetail() {
    detailMode.value = false
  }

  function selectTab(tab: TabName) {
    selectedTab.value = tab
  }

  function togglePartSelection(id: string) {
    if (selectedPartIds.value.has(id)) {
      selectedPartIds.value.delete(id)
    } else {
      selectedPartIds.value.add(id)
    }
    selectedPartIds.value = new Set(selectedPartIds.value)
  }

  function selectAllParts() {
    selectedPartIds.value = new Set(filteredParts.value.map((p) => p.id))
  }

  function deselectAllParts() {
    selectedPartIds.value = new Set()
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false
  }

  // ── Part CRUD ──────────────────────────────────────────────────────

  function updatePart(id: string, updates: Partial<Part>) {
    const idx = parts.value.findIndex((p) => p.id === id)
    if (idx === -1) return
    const current = parts.value[idx]!
    parts.value[idx] = {
      ...current,
      ...updates,
      descriptions: { ...current.descriptions, ...updates.descriptions },
      pricing: { ...current.pricing, ...updates.pricing },
      packaging: { ...current.packaging, ...updates.packaging },
      extendedInfo: { ...current.extendedInfo, ...updates.extendedInfo },
    }
  }

  // ── Application CRUD ───────────────────────────────────────────────

  function addApplication(app: Application) {
    applications.value.push(app)
  }

  function updateApplication(id: string, updates: Partial<Application>) {
    const idx = applications.value.findIndex((a) => a.id === id)
    if (idx !== -1) {
      applications.value[idx] = { ...applications.value[idx]!, ...updates }
    }
  }

  function deleteApplication(id: string) {
    applications.value = applications.value.filter((a) => a.id !== id)
  }

  // ── Attribute CRUD ─────────────────────────────────────────────────

  function addAttribute(partId: string, attr: Part['attributes'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.attributes = [...part.attributes, attr]
  }

  function updateAttribute(partId: string, index: number, attr: Part['attributes'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) {
      const copy = [...part.attributes]
      copy[index] = attr
      part.attributes = copy
    }
  }

  function removeAttribute(partId: string, index: number) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.attributes = part.attributes.filter((_, i) => i !== index)
  }

  // ── Kit Component CRUD ─────────────────────────────────────────────

  function addKitComponent(partId: string, comp: Part['kitComponents'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.kitComponents = [...part.kitComponents, comp]
  }

  function updateKitComponent(partId: string, index: number, comp: Part['kitComponents'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) {
      const copy = [...part.kitComponents]
      copy[index] = comp
      part.kitComponents = copy
    }
  }

  function removeKitComponent(partId: string, index: number) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.kitComponents = part.kitComponents.filter((_, i) => i !== index)
  }

  // ── Interchange CRUD ───────────────────────────────────────────────

  function addInterchange(partId: string, ic: Part['interchanges'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.interchanges = [...part.interchanges, ic]
  }

  function updateInterchange(partId: string, index: number, ic: Part['interchanges'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) {
      const copy = [...part.interchanges]
      copy[index] = ic
      part.interchanges = copy
    }
  }

  function removeInterchange(partId: string, index: number) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.interchanges = part.interchanges.filter((_, i) => i !== index)
  }

  // ── Digital Asset CRUD ─────────────────────────────────────────────

  function addDigitalAsset(partId: string, asset: Part['digitalAssets'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.digitalAssets = [...part.digitalAssets, asset]
  }

  function updateDigitalAsset(partId: string, index: number, asset: Part['digitalAssets'][number]) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) {
      const copy = [...part.digitalAssets]
      copy[index] = asset
      part.digitalAssets = copy
    }
  }

  function removeDigitalAsset(partId: string, index: number) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.digitalAssets = part.digitalAssets.filter((_, i) => i !== index)
  }

  // ── Custom Field CRUD ──────────────────────────────────────────────

  function addCustomField(partId: string, field: { key: string; value: string }) {
    const part = parts.value.find((p) => p.id === partId)
    if (part) part.customFields = [...(part.customFields ?? []), field]
  }

  function updateCustomField(partId: string, index: number, field: { key: string; value: string }) {
    const part = parts.value.find((p) => p.id === partId)
    if (part && part.customFields) {
      const copy = [...part.customFields]
      copy[index] = field
      part.customFields = copy
    }
  }

  function removeCustomField(partId: string, index: number) {
    const part = parts.value.find((p) => p.id === partId)
    if (part && part.customFields) {
      part.customFields = part.customFields.filter((_, i) => i !== index)
    }
  }

  // ── Add Part ────────────────────────────────────────────────────────

  function createPart(): string {
    const id = `prt-${Date.now()}`
    const today = new Date().toISOString().slice(0, 10)
    const newPart: Part = {
      id,
      partNumber: '',
      basePartNumber: '',
      partTerminologyId: 0,
      partName: 'New Part',
      category: '',
      subcategory: '',
      brandCode: '',
      brandName: '',
      subBrand: '',
      universalPart: false,
      status: 'draft',
      quantityPerApplication: 1,
      quantityQualifier: 'Normal Quantity (NOR)',
      quantityUom: 'Each',
      acesApplications: false,
      imageUrl: '',
      createdAt: today,
      descriptions: { short: '', long: '', marketing: '' },
      pricing: { wholesale: 0, jobber: 0, retail: 0, priceSheet: '', currency: 'USD', effectiveDate: today },
      packaging: { height: 0, width: 0, length: 0, dimensionUom: 'in', weight: 0, weightUom: 'lb', containerType: '', quantityOfEachs: 1, gtin: '' },
      attributes: [],
      extendedInfo: { countryOfOrigin: '', harmonizedTariff: '', hazmat: false, warrantyMonths: 0, lifeCycleStatus: 'New' },
      kitComponents: [],
      interchanges: [],
      digitalAssets: [],
    }
    parts.value = [newPart, ...parts.value]
    selectedPartId.value = id
    selectedTab.value = 'item'
    detailMode.value = true
    return id
  }

  // ── Init ───────────────────────────────────────────────────────────

  function initializeData(partsData: Part[], applicationsData: Application[]) {
    parts.value = partsData
    applications.value = applicationsData
    if (partsData.length > 0 && !selectedPartId.value) {
      selectedPartId.value = partsData[0]!.id
    }
  }

  return {
    parts,
    applications,
    selectedPartId,
    selectedTab,
    searchQuery,
    filterCategory,
    filterStatus,
    sortBy,
    sortDirection,
    selectedPartIds,
    sidebarCollapsed,
    mobileMenuOpen,
    detailMode,
    selectedPart,
    selectedPartApplications,
    filteredParts,
    categories,
    stats,
    selectPart,
    enterDetail,
    exitDetail,
    selectTab,
    togglePartSelection,
    selectAllParts,
    deselectAllParts,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
    updatePart,
    createPart,
    addApplication,
    updateApplication,
    deleteApplication,
    addAttribute,
    updateAttribute,
    removeAttribute,
    addKitComponent,
    updateKitComponent,
    removeKitComponent,
    addInterchange,
    updateInterchange,
    removeInterchange,
    addDigitalAsset,
    updateDigitalAsset,
    removeDigitalAsset,
    addCustomField,
    updateCustomField,
    removeCustomField,
    initializeData,
  }
})
