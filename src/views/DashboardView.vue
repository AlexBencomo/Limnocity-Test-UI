<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const store = useCatalogStore()
const router = useRouter()

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }
})
</script>

<template>
  <div class="flex h-screen bg-white">
    <AppSidebar />
    <div class="flex-1 overflow-auto px-10 py-8">
      <h1 class="text-[14px] uppercase tracking-wider font-semibold text-[#1a1a2e] mb-6">Dashboard</h1>

      <!-- Stats row -->
      <div class="flex gap-8 mb-8 border-b border-[#eee] pb-6">
        <div class="flex items-center gap-3">
          <span class="text-[12px] uppercase tracking-wider text-[#888]">Total Parts</span>
          <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[14px] font-medium">{{ store.stats.total }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] uppercase tracking-wider text-[#888]">Approved</span>
          <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[14px] font-medium">{{ store.stats.approved }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] uppercase tracking-wider text-[#888]">In Review</span>
          <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[14px] font-medium">{{ store.stats.review }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[12px] uppercase tracking-wider text-[#888]">Draft</span>
          <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[14px] font-medium">{{ store.stats.draft }}</span>
        </div>
      </div>

      <!-- Applications + Quick Actions -->
      <div class="flex gap-12 mb-8">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <span class="text-[12px] uppercase tracking-wider text-[#888]">Total Applications (ACES)</span>
            <span class="border border-[#3bbfa0] text-[#3bbfa0] rounded-full px-2 text-[14px] font-medium">{{ store.stats.totalApplications }}</span>
          </div>
          <p class="text-[12px] text-[#aaa]">{{ store.stats.withApplications }} parts with fitment data</p>
        </div>

        <div class="border-l border-[#eee] pl-12">
          <span class="text-[12px] uppercase tracking-wider text-[#888] block mb-3">Quick Actions</span>
          <div class="flex gap-2">
            <button
              @click="router.push('/catalog')"
              class="text-[12px] px-3 py-1.5 border border-[#ddd] rounded text-[#444] hover:border-[#3bbfa0] hover:text-[#3bbfa0] transition-colors"
            >Go to Catalog</button>
            <button
              @click="router.push('/export')"
              class="text-[12px] px-3 py-1.5 border border-[#ddd] rounded text-[#444] hover:border-[#3bbfa0] hover:text-[#3bbfa0] transition-colors"
            >Export XML</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
