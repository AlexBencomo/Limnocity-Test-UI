<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { useThemeStore } from '@/stores/theme'
import { Search, Plus, FileDown, Settings2, Moon, Sun } from 'lucide-vue-next'

const store = useCatalogStore()
const themeStore = useThemeStore()
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
  <div class="min-h-screen bg-[#f7f8fa] dark:bg-[#0f0f1a] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-3xl">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="flex justify-center mb-4">
          <button
            @click="themeStore.toggle()"
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#e5e7eb] dark:border-[#2a2a40] text-[12px] text-[#888] dark:text-[#888899] hover:border-[#3bbfa0] hover:text-[#3bbfa0] transition-colors cursor-pointer"
          >
            <Sun v-if="themeStore.dark" class="h-3.5 w-3.5" />
            <Moon v-else class="h-3.5 w-3.5" />
            <span>{{ themeStore.dark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>
        <h1 class="text-[22px] font-bold text-[#1a1a2e] dark:text-[#e0e0e8] tracking-tight mb-1">Limnocity Catalog</h1>
        <p class="text-[13px] text-[#888] dark:text-[#888899]">What would you like to do?</p>
      </div>

      <!-- Action Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          v-for="action in actions"
          :key="action.label"
          @click="go(action)"
          class="group bg-white dark:bg-[#181828] border border-[#e5e7eb] dark:border-[#2a2a40] rounded-xl p-8 text-left
                 hover:border-[#3bbfa0] hover:shadow-[0_2px_12px_rgba(59,191,160,0.1)]
                 dark:hover:shadow-[0_2px_12px_rgba(59,191,160,0.15)]
                 transition-all duration-200 cursor-pointer"
        >
          <div class="flex items-start gap-5">
            <div class="w-12 h-12 rounded-lg bg-[#f0faf7] dark:bg-[#162e28] flex items-center justify-center shrink-0
                        group-hover:bg-[#3bbfa0] transition-colors duration-200">
              <component
                :is="action.icon"
                :size="22"
                class="text-[#3bbfa0] group-hover:text-white transition-colors duration-200"
              />
            </div>
            <div class="min-w-0">
              <span class="block text-[15px] font-semibold text-[#1a1a2e] dark:text-[#e0e0e8] mb-1">{{ action.label }}</span>
              <span class="block text-[12px] text-[#888] dark:text-[#888899] leading-relaxed">{{ action.description }}</span>
              <span
                v-if="action.stat()"
                class="inline-block mt-3 text-[11px] text-[#3bbfa0] font-medium uppercase tracking-wider"
              >{{ action.stat() }}</span>
            </div>
          </div>
        </button>
      </div>

      <!-- Subtle stats footer -->
      <div class="mt-8 flex justify-center gap-6 text-[11px] text-[#aaa] dark:text-[#666] uppercase tracking-wider">
        <span>{{ store.stats.approved }} approved</span>
        <span class="text-[#ddd] dark:text-[#333]">|</span>
        <span>{{ store.stats.review }} in review</span>
        <span class="text-[#ddd] dark:text-[#333]">|</span>
        <span>{{ store.stats.draft }} draft</span>
      </div>
    </div>
  </div>
</template>
