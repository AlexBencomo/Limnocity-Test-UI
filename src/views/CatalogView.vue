<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import ProductStrip from '@/components/layout/ProductStrip.vue'
import MainContent from '@/components/layout/MainContent.vue'

const store = useCatalogStore()
const route = useRoute()

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }

  // Handle ?action=add from dashboard, otherwise show parts list
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

    <div class="flex flex-1 flex-col overflow-hidden">
      <MobileHeader />
      <MainContent v-if="store.detailMode && store.selectedPart" />
      <ProductStrip v-else />
    </div>
  </div>
</template>
