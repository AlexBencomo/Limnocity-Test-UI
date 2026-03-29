<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import { generatePiesXml, generateAcesXml, downloadFile } from '@/lib/export-xml'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'

const store = useCatalogStore()
const exportType = ref<'pies' | 'aces' | 'both'>('both')

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }
})

const partsToExport = computed(() => {
  if (store.selectedPartIds.size > 0) {
    return store.parts.filter(p => store.selectedPartIds.has(p.id))
  }
  return store.parts
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
  <div class="flex h-screen bg-white">
    <AppSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <MobileHeader />
      <div class="flex-1 overflow-auto px-4 sm:px-10 py-6 sm:py-8">
        <h1 class="text-[14px] uppercase tracking-wider font-semibold text-[#1a1a2e] mb-6">Export XML</h1>

        <div class="flex flex-col md:flex-row gap-6 md:gap-8">
          <!-- Left column: Settings -->
          <div class="w-full md:w-[280px] md:shrink-0">
            <!-- Parts to export -->
            <div class="border-b border-[#eee] pb-4 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888] block mb-2">Parts to Export</span>
              <div class="flex items-center gap-2">
                <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[14px] font-medium">{{ selectedCount }}</span>
                <span class="text-[12px] text-[#aaa]">
                  {{ store.selectedPartIds.size > 0 ? 'Selected parts' : 'All parts (none selected)' }}
                </span>
              </div>
            </div>

            <!-- Export format -->
            <div class="border-b border-[#eee] pb-4 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888] block mb-3">Export Format</span>
              <div class="space-y-2">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportType" value="pies" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444]">PIES XML only</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportType" value="aces" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444]">ACES XML only</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="exportType" value="both" class="accent-[#3bbfa0]" />
                  <span class="text-[13px] text-[#444]">Both PIES + ACES</span>
                </label>
              </div>
            </div>

            <!-- Stats -->
            <div class="border-b border-[#eee] pb-4 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888] block mb-2">Export Summary</span>
              <div class="space-y-1 text-[12px] text-[#666]">
                <div class="flex justify-between">
                  <span>Parts</span>
                  <span class="font-medium text-[#444]">{{ selectedCount }}</span>
                </div>
                <div v-if="exportType !== 'pies'" class="flex justify-between">
                  <span>Applications</span>
                  <span class="font-medium text-[#444]">{{ applicationsToExport.length }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Files</span>
                  <span class="font-medium text-[#444]">{{ exportType === 'both' ? 2 : 1 }}</span>
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
            <div class="flex items-center justify-between border-b border-[#eee] pb-2 mb-4">
              <span class="text-[12px] uppercase tracking-wider text-[#888]">
                XML Preview
                <span class="normal-case tracking-normal text-[#bbb] ml-1">
                  ({{ exportType === 'aces' ? 'ACES' : exportType === 'pies' ? 'PIES' : 'PIES + ACES' }})
                </span>
              </span>
              <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[12px] font-medium">Valid</span>
            </div>
            <pre class="bg-[#f9f9f9] rounded p-4 text-[12px] font-mono text-[#444] overflow-auto max-h-[600px] whitespace-pre-wrap leading-relaxed">{{ previewXml }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
