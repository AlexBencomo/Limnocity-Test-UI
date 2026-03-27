<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import ProductStrip from '@/components/layout/ProductStrip.vue'
import MainContent from '@/components/layout/MainContent.vue'

const store = useCatalogStore()

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }
})
</script>

<template>
  <div class="flex h-screen bg-background">
    <!-- Left Sidebar -->
    <AppSidebar />

    <!-- Right Side: Product Strip + Main Content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top: Product Strip -->
      <ProductStrip />

      <!-- Bottom: Main Content Area -->
      <MainContent />
    </div>
  </div>
</template>
