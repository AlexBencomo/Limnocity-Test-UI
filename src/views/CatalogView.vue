<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import ProductStrip from '@/components/layout/ProductStrip.vue'
import MainContent from '@/components/layout/MainContent.vue'
import CatalogTabPanel from '@/components/layout/CatalogTabPanel.vue'

const store = useCatalogStore()
const route = useRoute()

const isDetail = computed(() => store.detailMode && !!store.selectedPart)

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }

  if (route.query.action === 'add') {
    store.createPart()
  } else {
    store.exitDetail()
  }
})
</script>

<template>
  <div class="flex h-screen bg-background">
    <AppSidebar />

    <!-- Tab panel: desktop only, detail mode only -->
    <CatalogTabPanel v-if="isDetail" />

    <div class="flex flex-1 flex-col overflow-hidden">
      <MobileHeader />
      <!-- Product list: always visible on desktop, hidden on mobile when detail -->
      <ProductStrip :compact="isDetail" />
      <!-- Detail content -->
      <MainContent v-if="isDetail" />
    </div>
  </div>
</template>
