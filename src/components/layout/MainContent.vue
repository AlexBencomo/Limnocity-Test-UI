<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalog'
import ItemTab from '@/components/catalog/ItemTab.vue'
import DescriptionTab from '@/components/catalog/DescriptionTab.vue'
import ApplicationTab from '@/components/catalog/ApplicationTab.vue'
import AttributesTab from '@/components/catalog/AttributesTab.vue'
import PackageTab from '@/components/catalog/PackageTab.vue'
import PricingTab from '@/components/catalog/PricingTab.vue'
import ExtInfoTab from '@/components/catalog/ExtInfoTab.vue'
import KitTab from '@/components/catalog/KitTab.vue'
import InterchangeTab from '@/components/catalog/InterchangeTab.vue'
import DigitalAssetsTab from '@/components/catalog/DigitalAssetsTab.vue'
import CustomFieldsTab from '@/components/catalog/CustomFieldsTab.vue'

const store = useCatalogStore()

const tabComponents: Record<string, any> = {
  item: ItemTab,
  description: DescriptionTab,
  application: ApplicationTab,
  attributes: AttributesTab,
  package: PackageTab,
  pricing: PricingTab,
  'ext-info': ExtInfoTab,
  kit: KitTab,
  interchange: InterchangeTab,
  'digital-assets': DigitalAssetsTab,
  'custom-fields': CustomFieldsTab,
}

const tabLabels: Record<string, string> = {
  item: 'Item',
  description: 'Description',
  application: 'Application',
  attributes: 'Attributes',
  package: 'Package',
  pricing: 'Pricing',
  'ext-info': 'Extended Info',
  kit: 'Kit',
  interchange: 'Interchange',
  'digital-assets': 'Digital Assets',
  'custom-fields': 'Custom Fields',
}
</script>

<template>
  <div class="flex-1 overflow-auto bg-white">
    <template v-if="store.selectedPart">
      <!-- Part Header Bar -->
      <div class="flex items-center justify-between px-5 py-3 border-b border-[#eee]">
        <div class="flex items-center gap-3">
          <span class="font-mono text-[14px] font-semibold text-[#1a1a2e]">{{ store.selectedPart.partNumber }}</span>
          <span class="text-[13px] text-[#666]">{{ store.selectedPart.partName }}</span>
          <span class="text-[12px] text-[#aaa]">{{ store.selectedPart.brandName }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full border border-[#3bbfa0] text-[#3bbfa0] text-[11px] font-medium">
            {{ store.selectedPart.partTerminologyId }}
          </span>
        </div>
      </div>

      <!-- Tab Label -->
      <div class="px-5 pt-4 pb-1">
        <h3 class="text-[12px] uppercase tracking-wider text-[#999] font-medium">{{ tabLabels[store.selectedTab] }}</h3>
      </div>

      <!-- Active Tab Content -->
      <div class="px-5 pb-6">
        <component :is="tabComponents[store.selectedTab]" :part="store.selectedPart" />
      </div>
    </template>

    <template v-else>
      <div class="flex items-center justify-center h-64 text-[#aaa] text-[13px]">
        Select a part from the list above to view details.
      </div>
    </template>
  </div>
</template>
