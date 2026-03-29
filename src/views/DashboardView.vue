<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { Search, Plus, FileDown, Settings2 } from 'lucide-vue-next'

const store = useCatalogStore()
const router = useRouter()

onMounted(async () => {
  if (store.parts.length === 0) {
    const { parts } = await import('@/data/parts')
    const { applications } = await import('@/data/applications')
    store.initializeData(parts, applications)
  }
})

const actions = [
  {
    label: 'Search Parts',
    description: 'Find and edit existing parts in your catalog',
    icon: Search,
    route: '/catalog',
    stat: () => `${store.stats.total} parts`,
  },
  {
    label: 'Add Part',
    description: 'Create a new part entry from scratch',
    icon: Plus,
    route: '/catalog',
    query: { action: 'add' },
    stat: () => null,
  },
  {
    label: 'Export Data',
    description: 'Generate PIES and ACES XML files',
    icon: FileDown,
    route: '/export',
    stat: () => `${store.stats.totalApplications} applications`,
  },
  {
    label: 'Brand Settings',
    description: 'Manage brands and sub-brands',
    icon: Settings2,
    route: '/brand-settings',
    stat: () => null,
  },
]

function go(action: (typeof actions)[number]) {
  router.push({ path: action.route, query: action.query })
}
</script>

<template>
  <div class="min-h-screen bg-[#f7f8fa] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-3xl">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-[22px] font-bold text-[#1a1a2e] tracking-tight mb-1">Limnocity Catalog</h1>
        <p class="text-[13px] text-[#888]">What would you like to do?</p>
      </div>

      <!-- Action Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          v-for="action in actions"
          :key="action.label"
          @click="go(action)"
          class="group bg-white border border-[#e5e7eb] rounded-xl p-8 text-left
                 hover:border-[#3bbfa0] hover:shadow-[0_2px_12px_rgba(59,191,160,0.1)]
                 transition-all duration-200 cursor-pointer"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-lg bg-[#f0faf7] flex items-center justify-center shrink-0
                        group-hover:bg-[#3bbfa0] transition-colors duration-200">
              <component
                :is="action.icon"
                :size="22"
                class="text-[#3bbfa0] group-hover:text-white transition-colors duration-200"
              />
            </div>
            <div class="min-w-0">
              <span class="block text-[15px] font-semibold text-[#1a1a2e] mb-1">{{ action.label }}</span>
              <span class="block text-[12px] text-[#888] leading-relaxed">{{ action.description }}</span>
              <span
                v-if="action.stat()"
                class="inline-block mt-3 text-[11px] text-[#3bbfa0] font-medium uppercase tracking-wider"
              >{{ action.stat() }}</span>
            </div>
          </div>
        </button>
      </div>

      <!-- Subtle stats footer -->
      <div class="mt-8 flex justify-center gap-6 text-[11px] text-[#aaa] uppercase tracking-wider">
        <span>{{ store.stats.approved }} approved</span>
        <span class="text-[#ddd]">|</span>
        <span>{{ store.stats.review }} in review</span>
        <span class="text-[#ddd]">|</span>
        <span>{{ store.stats.draft }} draft</span>
      </div>
    </div>
  </div>
</template>
