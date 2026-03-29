<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCatalogStore, type TabName } from '@/stores/catalog'
import {
  LayoutDashboard,
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
  Settings2,
  FileDown,
  Tags,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-vue-next'

const store = useCatalogStore()
const router = useRouter()
const route = useRoute()

const catalogOpen = ref(true)
const settingsOpen = ref(true)

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

function handleTabClick(tab: TabName) {
  store.selectTab(tab)
}

function isTabActive(tab: TabName) {
  return store.selectedTab === tab && route.name === 'catalog'
}

function navigate(path: string) {
  router.push(path)
  store.closeMobileMenu()
}

function navigateTab(tab: TabName) {
  handleTabClick(tab)
  if (store.selectedPartId) {
    router.push(`/catalog/${store.selectedPartId}`)
  } else {
    router.push('/catalog')
  }
  store.closeMobileMenu()
}

const isDetailMode = computed(() => route.name === 'catalog-detail')

// Close mobile menu on route change
watch(() => route.fullPath, () => {
  store.closeMobileMenu()
})
</script>

<template>
  <!-- Desktop Sidebar -->
  <aside class="hidden md:flex flex-col w-[200px] shrink-0 bg-[#1a1a2e] text-[#b0b0b0] overflow-hidden">
    <!-- Logo -->
    <div class="flex items-center gap-2 px-4 h-12 border-b border-white/[0.08]">
      <div class="flex h-6 w-6 items-center justify-center rounded bg-[#3bbfa0] text-white text-[11px] font-semibold">
        L
      </div>
      <span class="text-[13px] font-medium text-white/90 tracking-tight">Limnocity</span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-2">
      <button
        class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors"
        :class="route.name === 'dashboard' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
        @click="navigate('/dashboard')"
      >
        <LayoutDashboard class="h-[15px] w-[15px] shrink-0" />
        <span>Dashboard</span>
      </button>

      <!-- Catalog Section -->
      <div class="mt-3">
        <button
          class="flex items-center justify-between w-full px-4 py-1 text-[11px] uppercase tracking-wider text-[#666] hover:text-[#888] transition-colors"
          @click="catalogOpen = !catalogOpen"
        >
          <span>Catalog</span>
          <ChevronDown v-if="catalogOpen" class="h-3 w-3" />
          <ChevronRight v-else class="h-3 w-3" />
        </button>
        <div v-show="catalogOpen" class="mt-0.5">
          <!-- Active part indicator -->
          <div
            v-if="isDetailMode && store.selectedPart"
            class="mx-1.5 mb-1 px-3 py-1.5 rounded border-l-2 border-[#3bbfa0] bg-white/[0.06]"
          >
            <div class="text-[11px] font-mono text-[#3bbfa0] truncate">{{ store.selectedPart.partNumber }}</div>
            <div class="text-[10px] text-[#888] truncate">{{ store.selectedPart.partName }}</div>
          </div>

          <button
            v-for="tab in tabs"
            :key="tab.name"
            class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors"
            :class="isTabActive(tab.name) ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
            @click="navigateTab(tab.name)"
          >
            <component :is="tab.icon" class="h-[15px] w-[15px] shrink-0" />
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>

      <!-- Settings Section -->
      <div class="mt-3">
        <button
          class="flex items-center justify-between w-full px-4 py-1 text-[11px] uppercase tracking-wider text-[#666] hover:text-[#888] transition-colors"
          @click="settingsOpen = !settingsOpen"
        >
          <span>Settings</span>
          <ChevronDown v-if="settingsOpen" class="h-3 w-3" />
          <ChevronRight v-else class="h-3 w-3" />
        </button>
        <div v-show="settingsOpen" class="mt-0.5">
          <button
            class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors"
            :class="route.name === 'brand-settings' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
            @click="navigate('/brand-settings')"
          >
            <Settings2 class="h-[15px] w-[15px] shrink-0" />
            <span>Brand Settings</span>
          </button>
          <button
            class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors"
            :class="route.name === 'export' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
            @click="navigate('/export')"
          >
            <FileDown class="h-[15px] w-[15px] shrink-0" />
            <span>Export XML</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="border-t border-white/[0.08] px-3 py-2">
      <div class="flex items-center gap-2">
        <div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#3bbfa0] text-white text-[10px] font-medium">
          MW
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[12px] text-white/80 truncate">Michael Wanner</div>
          <div class="text-[10px] text-[#666]">Admin</div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile Sidebar Overlay -->
  <Teleport to="body">
    <Transition name="sidebar">
      <div
        v-if="store.mobileMenuOpen"
        class="fixed inset-0 z-50 md:hidden"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50"
          @click="store.closeMobileMenu()"
        />

        <!-- Drawer -->
        <aside class="absolute inset-y-0 left-0 flex flex-col w-[260px] bg-[#1a1a2e] text-[#b0b0b0] shadow-xl">
          <!-- Logo + Close -->
          <div class="flex items-center justify-between px-4 h-12 border-b border-white/[0.08]">
            <div class="flex items-center gap-2">
              <div class="flex h-6 w-6 items-center justify-center rounded bg-[#3bbfa0] text-white text-[11px] font-semibold">
                L
              </div>
              <span class="text-[13px] font-medium text-white/90 tracking-tight">Limnocity</span>
            </div>
            <button
              class="flex items-center justify-center h-7 w-7 rounded text-white/60 hover:text-white/90 hover:bg-white/[0.08] transition-colors"
              @click="store.closeMobileMenu()"
            >
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 overflow-y-auto py-2">
            <button
              class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors"
              :class="route.name === 'dashboard' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
              @click="navigate('/dashboard')"
            >
              <LayoutDashboard class="h-[15px] w-[15px] shrink-0" />
              <span>Dashboard</span>
            </button>

            <!-- Catalog Section -->
            <div class="mt-3">
              <button
                class="flex items-center justify-between w-full px-4 py-1 text-[11px] uppercase tracking-wider text-[#666] hover:text-[#888] transition-colors"
                @click="catalogOpen = !catalogOpen"
              >
                <span>Catalog</span>
                <ChevronDown v-if="catalogOpen" class="h-3 w-3" />
                <ChevronRight v-else class="h-3 w-3" />
              </button>
              <div v-show="catalogOpen" class="mt-0.5">
                <!-- Active part indicator (mobile) -->
                <div
                  v-if="isDetailMode && store.selectedPart"
                  class="mx-1.5 mb-1 px-3 py-1.5 rounded border-l-2 border-[#3bbfa0] bg-white/[0.06]"
                >
                  <div class="text-[11px] font-mono text-[#3bbfa0] truncate">{{ store.selectedPart.partNumber }}</div>
                  <div class="text-[10px] text-[#888] truncate">{{ store.selectedPart.partName }}</div>
                </div>

                <button
                  v-for="tab in tabs"
                  :key="tab.name"
                  class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors"
                  :class="isTabActive(tab.name) ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
                  @click="navigateTab(tab.name)"
                >
                  <component :is="tab.icon" class="h-[15px] w-[15px] shrink-0" />
                  <span>{{ tab.label }}</span>
                </button>
              </div>
            </div>

            <!-- Settings Section -->
            <div class="mt-3">
              <button
                class="flex items-center justify-between w-full px-4 py-1 text-[11px] uppercase tracking-wider text-[#666] hover:text-[#888] transition-colors"
                @click="settingsOpen = !settingsOpen"
              >
                <span>Settings</span>
                <ChevronDown v-if="settingsOpen" class="h-3 w-3" />
                <ChevronRight v-else class="h-3 w-3" />
              </button>
              <div v-show="settingsOpen" class="mt-0.5">
                <button
                  class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors"
                  :class="route.name === 'brand-settings' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
                  @click="navigate('/brand-settings')"
                >
                  <Settings2 class="h-[15px] w-[15px] shrink-0" />
                  <span>Brand Settings</span>
                </button>
                <button
                  class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors"
                  :class="route.name === 'export' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
                  @click="navigate('/export')"
                >
                  <FileDown class="h-[15px] w-[15px] shrink-0" />
                  <span>Export XML</span>
                </button>
              </div>
            </div>
          </nav>

          <!-- Footer -->
          <div class="border-t border-white/[0.08] px-3 py-3">
            <div class="flex items-center gap-2">
              <div class="flex h-6 w-6 items-center justify-center rounded-full bg-[#3bbfa0] text-white text-[10px] font-medium">
                MW
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[12px] text-white/80 truncate">Michael Wanner</div>
                <div class="text-[10px] text-[#666]">Admin</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: opacity 0.2s ease;
}
.sidebar-enter-active aside,
.sidebar-leave-active aside {
  transition: transform 0.2s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
}
.sidebar-enter-from aside,
.sidebar-leave-to aside {
  transform: translateX(-100%);
}
</style>
