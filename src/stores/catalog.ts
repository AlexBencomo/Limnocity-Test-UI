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

    if (filterCategory.value) {
      result = result.filter((p) => p.category === filterCategory.value)
    }

    if (filterStatus.value) {
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
    selectedPart,
    selectedPartApplications,
    filteredParts,
    categories,
    stats,
    selectPart,
    selectTab,
    togglePartSelection,
    selectAllParts,
    deselectAllParts,
    toggleSidebar,
    initializeData,
  }
})
