<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCatalogStore, type TabName } from '@/stores/catalog'
import {
  Package,
  FileText,
  Car,
  SlidersHorizontal,
  Box,
  DollarSign,
  Info,
  Puzzle,
  ArrowLeftRight,
  Image,
  Tags,
  ChevronDown,
  ArrowLeft,
} from 'lucide-vue-next'
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
const router = useRouter()
const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

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

const tabs: { name: TabName; label: string; icon: any }[] = [
  { name: 'item', label: 'Item', icon: Package },
  { name: 'description', label: 'Description', icon: FileText },
  { name: 'application', label: 'Application', icon: Car },
  { name: 'attributes', label: 'Attributes', icon: SlidersHorizontal },
  { name: 'package', label: 'Package', icon: Box },
  { name: 'pricing', label: 'Pricing', icon: DollarSign },
  { name: 'ext-info', label: 'Extended Info', icon: Info },
  { name: 'kit', label: 'Kit', icon: Puzzle },
  { name: 'interchange', label: 'Interchange', icon: ArrowLeftRight },
  { name: 'digital-assets', label: 'Digital Assets', icon: Image },
  { name: 'custom-fields', label: 'Custom Fields', icon: Tags },
]

const currentTab = () => tabs.find((t) => t.name === store.selectedTab) ?? tabs[0]!

function switchTab(tab: TabName) {
  store.selectTab(tab)
  dropdownOpen.value = false
}

function goBack() {
  router.push('/catalog')
}

function onClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div class="flex-1 overflow-auto bg-white">
    <template v-if="store.selectedPart">
      <!-- Back + Part Header Bar -->
      <div class="flex flex-wrap items-center gap-2 px-4 sm:px-5 py-3 border-b border-[#eee] bg-[#fafafa]">
        <button
          class="flex items-center gap-1.5 text-[12px] text-[#666] hover:text-[#1a1a2e] transition-colors mr-1"
          @click="goBack"
        >
          <ArrowLeft class="h-4 w-4" />
          <span class="hidden sm:inline">Back to Parts</span>
        </button>

        <div class="h-5 w-px bg-[#ddd] hidden sm:block" />

        <div class="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
          <span class="font-mono text-[14px] font-semibold text-[#1a1a2e]">{{ store.selectedPart.partNumber }}</span>
          <span class="text-[13px] text-[#666] truncate">{{ store.selectedPart.partName }}</span>
          <span class="text-[12px] text-[#aaa] hidden sm:inline">{{ store.selectedPart.brandName }}</span>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <span class="inline-flex items-center px-2 py-0.5 rounded-full border border-[#3bbfa0] text-[#3bbfa0] text-[11px] font-medium">
            {{ store.selectedPart.partTerminologyId }}
          </span>
        </div>
      </div>

      <!-- Section Navigator Dropdown -->
      <div class="px-4 sm:px-5 pt-4 pb-1 relative" ref="dropdownRef">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#e0e0e0] hover:border-[#3bbfa0] hover:bg-[#f8fffe] transition-colors text-[13px] font-medium text-[#1a1a2e]"
        >
          <component :is="currentTab().icon" :size="14" class="text-[#3bbfa0]" />
          <span>{{ currentTab().label }}</span>
          <ChevronDown :size="14" class="text-[#999] transition-transform" :class="{ 'rotate-180': dropdownOpen }" />
        </button>

        <Transition name="dropdown">
          <div
            v-if="dropdownOpen"
            class="absolute left-4 sm:left-5 top-full mt-1 z-30 w-56 bg-white rounded-lg border border-[#e0e0e0] shadow-lg py-1 overflow-hidden"
          >
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="switchTab(tab.name)"
              class="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-left transition-colors"
              :class="store.selectedTab === tab.name
                ? 'bg-[#f0faf7] text-[#3bbfa0] font-medium'
                : 'text-[#444] hover:bg-[#f7f7f7]'"
            >
              <component :is="tab.icon" :size="14" :class="store.selectedTab === tab.name ? 'text-[#3bbfa0]' : 'text-[#aaa]'" />
              <span>{{ tab.label }}</span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Active Tab Content -->
      <div class="px-4 sm:px-5 pb-6">
        <component :is="tabComponents[store.selectedTab]" :part="store.selectedPart" />
      </div>
    </template>

    <template v-else>
      <div class="flex items-center justify-center h-64 text-[#aaa] text-[13px]">
        Select a part from the list to view details.
      </div>
    </template>
  </div>
</template>

<style scoped>
.dropdown-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
