<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const store = useCatalogStore()
const exportType = ref<'pies' | 'aces' | 'both'>('both')
const showPreview = ref(false)

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }
})

const selectedCount = computed(() => store.selectedPartIds.size || store.parts.length)

const previewXml = computed(() => {
  if (exportType.value === 'aces') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<ACES version="4.2">
  <Header>
    <Company>MagnaFlow Exhaust Products</Company>
    <BrandAAIAID>DKGX</BrandAAIAID>
    <SubmissionType>FULL</SubmissionType>
    <VcdbVersionDate>2026-03-01</VcdbVersionDate>
  </Header>
  <!-- ${store.stats.totalApplications} application records -->
  <App action="A" id="1">
    <BaseVehicle id="5289"/>
    <SubModel id="7"/>
    <EngineBase id="1305"/>
    <Part BrandAAIAID="DKGX">51356</Part>
  </App>
  ...
  <Footer>
    <RecordCount>${store.stats.totalApplications}</RecordCount>
  </Footer>
</ACES>`
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<PIES xmlns="http://www.aftermarket.org">
  <Header>
    <PIESVersion>7.2</PIESVersion>
    <SubmissionType>FULL</SubmissionType>
    <BrandOwnerAAIAID>DKGX</BrandOwnerAAIAID>
  </Header>
  <Items>
    <!-- ${selectedCount.value} items -->
    <Item MaintenanceType="A">
      <PartNumber>51356</PartNumber>
      <BrandAAIAID>DKGX</BrandAAIAID>
      <PartTerminologyID>1286</PartTerminologyID>
      <ACESApplications>Y</ACESApplications>
      <Descriptions>
        <Description DescriptionCode="SHO">Direct-Fit Catalytic Converter</Description>
      </Descriptions>
      <Prices>
        <Pricing PriceType="WD1">
          <Price UOM="PE">245.99</Price>
        </Pricing>
      </Prices>
    </Item>
    ...
  </Items>
</PIES>`
})
</script>

<template>
  <div class="flex h-screen bg-white">
    <AppSidebar />
    <div class="flex-1 overflow-auto px-10 py-8">
      <h1 class="text-[14px] uppercase tracking-wider font-semibold text-[#1a1a2e] mb-6">Export XML</h1>

      <div class="flex gap-8">
        <!-- Left column: Settings -->
        <div class="w-[280px] shrink-0">
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

          <!-- Actions -->
          <div class="flex flex-col gap-2">
            <button
              @click="showPreview = true"
              class="text-[12px] px-3 py-1.5 border border-[#ddd] rounded text-[#444] hover:border-[#3bbfa0] hover:text-[#3bbfa0] transition-colors w-full"
            >Preview XML</button>
            <button
              class="text-[12px] px-3 py-1.5 border border-[#ddd] rounded text-[#444] hover:border-[#3bbfa0] hover:text-[#3bbfa0] transition-colors w-full"
            >Download Files</button>
          </div>
        </div>

        <!-- Right column: XML Preview -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between border-b border-[#eee] pb-2 mb-4">
            <span class="text-[12px] uppercase tracking-wider text-[#888]">XML Preview</span>
            <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[12px] font-medium">Valid</span>
          </div>
          <pre class="bg-[#f9f9f9] rounded p-4 text-[12px] font-mono text-[#444] overflow-auto max-h-[500px] whitespace-pre-wrap leading-relaxed">{{ previewXml }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
