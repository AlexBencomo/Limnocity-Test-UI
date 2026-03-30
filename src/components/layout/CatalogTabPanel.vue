<script setup lang="ts">
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
} from 'lucide-vue-next'

const store = useCatalogStore()

const tabs: Array<{ name: TabName; label: string; icon: any }> = [
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
</script>

<template>
  <div class="hidden md:flex flex-col w-[170px] shrink-0 bg-[#f8f9fa] border-r border-[#eee] overflow-y-auto">
    <nav class="py-2">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="store.selectTab(tab.name)"
        class="flex items-center gap-2 w-full px-4 py-2 text-[13px] text-left transition-colors border-l-2"
        :class="store.selectedTab === tab.name
          ? 'text-[#3bbfa0] font-medium bg-white border-[#3bbfa0]'
          : 'text-[#555] hover:bg-white/60 hover:text-[#333] border-transparent'"
      >
        <component
          :is="tab.icon"
          :size="14"
          :class="store.selectedTab === tab.name ? 'text-[#3bbfa0]' : 'text-[#aaa]'"
        />
        <span>{{ tab.label }}</span>
      </button>
    </nav>
  </div>
</template>
