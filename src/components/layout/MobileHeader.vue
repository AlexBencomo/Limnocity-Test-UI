<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { Menu, ArrowLeft } from 'lucide-vue-next'

const store = useCatalogStore()
const route = useRoute()
const router = useRouter()

const isDetailMode = computed(() => route.name === 'catalog-detail')

function goBack() {
  router.push('/catalog')
}
</script>

<template>
  <header class="flex md:hidden items-center gap-3 px-4 h-12 bg-[#1a1a2e] border-b border-white/[0.08] shrink-0">
    <!-- Back arrow in detail mode, hamburger otherwise -->
    <button
      v-if="isDetailMode"
      class="flex items-center justify-center h-8 w-8 rounded text-white/80 hover:bg-white/[0.08] transition-colors"
      @click="goBack"
    >
      <ArrowLeft class="h-5 w-5" />
    </button>
    <button
      v-else
      class="flex items-center justify-center h-8 w-8 rounded text-white/80 hover:bg-white/[0.08] transition-colors"
      @click="store.toggleMobileMenu()"
    >
      <Menu class="h-5 w-5" />
    </button>

    <div class="flex items-center gap-2 min-w-0">
      <div class="flex h-6 w-6 items-center justify-center rounded bg-[#3bbfa0] text-white text-[11px] font-semibold shrink-0">
        L
      </div>
      <template v-if="isDetailMode && store.selectedPart">
        <span class="text-[12px] font-mono text-white/90 truncate">{{ store.selectedPart.partNumber }}</span>
        <span class="text-[11px] text-white/50 truncate hidden xs:inline">{{ store.selectedPart.partName }}</span>
      </template>
      <template v-else>
        <span class="text-[13px] font-medium text-white/90 tracking-tight">Limnocity</span>
      </template>
    </div>
  </header>
</template>
