<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import ProductStrip from '@/components/layout/ProductStrip.vue'
import MainContent from '@/components/layout/MainContent.vue'

const store = useCatalogStore()
const route = useRoute()
const router = useRouter()

const isDetailMode = () => route.name === 'catalog-detail'

// Sync route partId → store
watch(
  () => route.params.partId,
  (partId) => {
    if (partId && typeof partId === 'string') {
      const exists = store.parts.find((p) => p.id === partId)
      if (exists) {
        store.selectPart(partId)
      } else if (store.parts.length > 0) {
        router.replace('/catalog')
      }
    }
  },
  { immediate: true },
)

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)

    // After data loads, re-check route param
    const partId = route.params.partId
    if (partId && typeof partId === 'string') {
      const exists = store.parts.find((p) => p.id === partId)
      if (exists) store.selectPart(partId)
      else router.replace('/catalog')
    }
  }

  // Handle ?action=add from dashboard
  if (route.query.action === 'add') {
    const newId = store.createPart()
    router.replace(`/catalog/${newId}`)
  }
})
</script>

<template>
  <div class="flex h-screen bg-background">
    <AppSidebar />

    <div class="flex flex-1 flex-col overflow-hidden">
      <MobileHeader />

      <Transition name="view" mode="out-in">
        <MainContent v-if="isDetailMode() && store.selectedPart" key="detail" />
        <ProductStrip v-else key="list" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.view-enter-active,
.view-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.view-enter-from {
  opacity: 0;
  transform: translateX(8px);
}
.view-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
