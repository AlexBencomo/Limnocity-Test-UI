<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import { generatePiesXml, generateAcesXml, downloadFile } from '@/lib/export-xml'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'

const store = useCatalogStore()
const exportType = ref<'pies' | 'aces' | 'both'>('both')
const selectionMode = ref<'all' | 'pick'>('all')
const pickedIds = ref<Set<string>>(new Set())

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }
})

function togglePicked(id: string) {
  if (pickedIds.value.has(id)) {
    pickedIds.value.delete(id)
  } else {
    pickedIds.value.add(id)
  }
  pickedIds.value = new Set(pickedIds.value)
}

function pickAll() {
  pickedIds.value = new Set(store.parts.map(p => p.id))
}

function pickNone() {
  pickedIds.value = new Set()
}

const partsToExport = computed(() => {
  if (selectionMode.value === 'all') return store.parts
  return store.parts.filter(p => pickedIds.value.has(p.id))
})

const applicationsToExport = computed(() => {
  const partIds = new Set(partsToExport.value.map(p => p.id))
  return store.applications.filter(a => partIds.has(a.partId))
})

const selectedCount = computed(() => partsToExport.value.length)

const piesXml = computed(() => generatePiesXml(partsToExport.value))
const acesXml = computed(() => generateAcesXml(applicationsToExport.value, partsToExport.value))

const previewXml = computed(() => {
  if (exportType.value === 'aces') return acesXml.value
  if (exportType.value === 'pies') return piesXml.value
  return piesXml.value + '\n\n' + '─'.repeat(60) + '\n\n' + acesXml.value
})

const today = new Date().toISOString().slice(0, 10)

function handleDownload() {
  if (exportType.value === 'pies' || exportType.value === 'both') {
    downloadFile(piesXml.value, `PIES_Export_${today}.xml`)
  }
  if (exportType.value === 'aces' || exportType.value === 'both') {
    downloadFile(acesXml.value, `ACES_Export_${today}.xml`)
  }
}
</script>

<template>
  <div class="flex h-screen bg-white dark:bg-[#0f0f1a]">
    <AppSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <MobileHeader />
      <div class="flex-1 overflow-auto px-4 sm:px-10 py-6 sm:py-8">
        <h1 class="text-[14px] uppercase tracking-wider font-semibold text-[#1a1a2e] dark:text-[#e0e0e8] mb-6">Export XML</h1>

        <div class="flex flex-col md:flex-row gap-6 md:gap-8">
          <!-- Left column: Settings -->
          <div class="w-full md:w-[280px] md:shrink-0">
            <!-- Parts to export -->
            <div class="border-b border-[#eee] dark:border-[#2a2a40] pb-4 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888] dark:text-[#888899] block mb-3">Parts to Export</span>
              <div class="space-y-2 mb-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="selectionMode" value="all" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444] dark:text-[#ccc]">All parts</span>
                  <span class="text-[11px] text-[#aaa] dark:text-[#666]">({{ store.parts.length }})</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="selectionMode" value="pick" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444] dark:text-[#ccc]">Select parts</span>
                  <span v-if="selectionMode === 'pick'" class="text-[11px] text-[#aaa] dark:text-[#666]">({{ pickedIds.size }})</span>
                </label>
              </div>

              <!-- Part picker list -->
              <div v-if="selectionMode === 'pick'" class="border border-[#eee] dark:border-[#2a2a40] rounded max-h-[220px] overflow-auto">
                <div class="flex items-center justify-between px-2.5 py-1.5 border-b border-[#eee] dark:border-[#2a2a40] bg-[#fafafa] dark:bg-[#1a1a2e]">
                  <span class="text-[11px] text-[#888] dark:text-[#888899]">{{ pickedIds.size }} of {{ store.parts.length }} selected</span>
                  <div class="flex gap-2">
                    <button @click="pickAll" class="text-[11px] text-[#3bbfa0] hover:underline">All</button>
                    <button @click="pickNone" class="text-[11px] text-[#888] dark:text-[#888899] hover:underline">None</button>
                  </div>
                </div>
                <label
                  v-for="p in store.parts"
                  :key="p.id"
                  class="flex items-center gap-2 px-2.5 py-1.5 cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#1e1e30] transition-colors border-b border-[#f5f5f5] dark:border-[#1a1a2e] last:border-0"
                >
                  <input
                    type="checkbox"
                    :checked="pickedIds.has(p.id)"
                    @change="togglePicked(p.id)"
                    class="accent-[#3bbfa0] shrink-0"
                  />
                  <span class="font-mono text-[12px] text-[#1a1a2e] dark:text-[#e0e0e8] shrink-0">{{ p.partNumber }}</span>
                  <span class="text-[11px] text-[#888] dark:text-[#888899] truncate">{{ p.partName }}</span>
                </label>
              </div>

              <div class="flex items-center gap-2 mt-2">
                <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[14px] font-medium">{{ selectedCount }}</span>
                <span class="text-[12px] text-[#aaa] dark:text-[#666]">parts will be exported</span>
              </div>
            </div>

            <!-- Export format -->
            <div class="border-b border-[#eee] dark:border-[#2a2a40] pb-4 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888] dark:text-[#888899] block mb-3">Export Format</span>
              <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportType" value="pies" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444] dark:text-[#ccc]">PIES XML only</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportType" value="aces" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444] dark:text-[#ccc]">ACES XML only</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportType" value="both" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444] dark:text-[#ccc]">Both PIES + ACES</span>
                </label>
              </div>
            </div>

            <!-- Stats -->
            <div class="border-b border-[#eee] dark:border-[#2a2a40] pb-4 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888] dark:text-[#888899] block mb-2">Export Summary</span>
              <div class="space-y-1 text-[12px] text-[#666] dark:text-[#999]">
                <div class="flex justify-between">
                  <span>Parts</span>
                  <span class="font-medium text-[#444] dark:text-[#ccc]">{{ selectedCount }}</span>
                </div>
                <div v-if="exportType !== 'pies'" class="flex justify-between">
                  <span>Applications</span>
                  <span class="font-medium text-[#444] dark:text-[#ccc]">{{ applicationsToExport.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Files</span>
                  <span class="font-medium text-[#444] dark:text-[#ccc]">{{ exportType === 'both' ? 2 : 1 }}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-2">
              <button
                @click="handleDownload"
                class="text-[12px] px-3 py-2 rounded bg-[#3bbfa0] text-white font-medium hover:bg-[#2ea88a] transition-colors w-full"
              >
                Download {{ exportType === 'both' ? 'Files' : 'File' }}
              </button>
            </div>
          </div>

          <!-- Right column: XML Preview -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between border-b border-[#eee] dark:border-[#2a2a40] pb-2 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888] dark:text-[#888899]">
                XML Preview
                <span class="normal-case tracking-normal text-[#bbb] dark:text-[#555] ml-1">
                  ({{ exportType === 'aces' ? 'ACES' : exportType === 'pies' ? 'PIES' : 'PIES + ACES' }})
                </span>
              </span>
              <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[12px] font-medium">Valid</span>
            </div>
            <pre class="bg-[#f9f9f9] dark:bg-[#181828] rounded p-4 text-[12px] font-mono text-[#444] dark:text-[#ccc] overflow-auto max-h-[600px] whitespace-pre-wrap leading-relaxed">{{ previewXml }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
