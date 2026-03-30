<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import {
  ChevronDown,
  ChevronRight,
  X,
  FileDown,
  Truck,
  Settings2,
  LogOut,
  Package,
  ShieldCheck,
} from 'lucide-vue-next'

const store = useCatalogStore()
const router = useRouter()
const route = useRoute()

const brandsOpen = ref(true)
const distributionOpen = ref(false)
const settingsOpen = ref(false)

function navigate(path: string) {
  store.exitDetail()
  router.push(path)
  store.closeMobileMenu()
}

function navigateCatalog() {
  store.exitDetail()
  router.push('/catalog')
  store.closeMobileMenu()
}

const isDetailMode = computed(() => store.detailMode)

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
      <!-- Available Brands -->
      <div>
        <button
          class="flex items-center justify-between w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors"
          :class="brandsOpen ? 'text-white/90' : 'hover:bg-white/[0.06]'"
          @click="brandsOpen = !brandsOpen"
        >
          <div class="flex items-center gap-2.5">
            <ShieldCheck class="h-[15px] w-[15px] shrink-0" />
            <span>Available Brands</span>
          </div>
          <ChevronDown v-if="brandsOpen" class="h-3 w-3" />
          <ChevronRight v-else class="h-3 w-3" />
        </button>
        <div v-show="brandsOpen" class="mt-0.5">
          <button
            class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 pl-9 pr-3 py-1.5 rounded text-[13px] transition-colors"
            :class="route.name === 'brand-settings' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
            @click="navigate('/brand-settings')"
          >
            All Brands
          </button>
          <button
            class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 pl-9 pr-3 py-1.5 rounded text-[13px] transition-colors"
            :class="route.name === 'catalog' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
            @click="navigateCatalog"
          >
            All Products
          </button>
        </div>
      </div>

      <!-- Export -->
      <button
        class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors mt-1"
        :class="route.name === 'export' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
        @click="navigate('/export')"
      >
        <FileDown class="h-[15px] w-[15px] shrink-0" />
        <span>Export</span>
      </button>

      <!-- Distribution -->
      <div class="mt-1">
        <button
          class="flex items-center justify-between w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors hover:bg-white/[0.06]"
          @click="distributionOpen = !distributionOpen"
        >
          <div class="flex items-center gap-2.5">
            <Truck class="h-[15px] w-[15px] shrink-0" />
            <span>Distribution</span>
          </div>
          <ChevronDown v-if="distributionOpen" class="h-3 w-3" />
          <ChevronRight v-else class="h-3 w-3" />
        </button>
        <div v-show="distributionOpen" class="mt-0.5 mx-1.5 pl-9 pr-3 py-2">
          <span class="text-[11px] text-[#555]">Coming soon</span>
        </div>
      </div>

      <!-- Settings -->
      <div class="mt-1">
        <button
          class="flex items-center justify-between w-[calc(100%-12px)] mx-1.5 px-3 py-1.5 rounded text-[13px] transition-colors hover:bg-white/[0.06]"
          @click="settingsOpen = !settingsOpen"
        >
          <div class="flex items-center gap-2.5">
            <Settings2 class="h-[15px] w-[15px] shrink-0" />
            <span>Settings</span>
          </div>
          <ChevronDown v-if="settingsOpen" class="h-3 w-3" />
          <ChevronRight v-else class="h-3 w-3" />
        </button>
        <div v-show="settingsOpen" class="mt-0.5">
          <button
            class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 pl-9 pr-3 py-1.5 rounded text-[13px] transition-colors hover:bg-white/[0.06]"
            @click="navigate('/brand-settings')"
          >
            Brand Settings
          </button>
        </div>
      </div>
    </nav>

    <!-- Selected Part Info Card -->
    <div
      v-if="isDetailMode && store.selectedPart"
      class="border-t border-white/[0.08] px-3 py-3"
    >
      <div class="flex flex-col items-center gap-2">
        <div class="w-16 h-16 rounded-lg bg-white/[0.08] overflow-hidden flex items-center justify-center">
          <img
            v-if="store.selectedPart.imageUrl"
            :src="store.selectedPart.imageUrl"
            :alt="store.selectedPart.partName"
            class="w-full h-full object-cover"
          />
          <Package v-else :size="24" class="text-[#555]" />
        </div>
        <div class="text-center w-full">
          <div class="text-[11px] font-mono text-[#3bbfa0] truncate">{{ store.selectedPart.partNumber }}</div>
          <div class="text-[10px] text-[#888] truncate">{{ store.selectedPart.partName }}</div>
        </div>
        <div class="w-full text-[10px] text-[#666] space-y-0.5">
          <div class="flex justify-between">
            <span>Weight:</span>
            <span class="text-[#888]">{{ store.selectedPart.packaging.weight }} {{ store.selectedPart.packaging.weightUom }}</span>
          </div>
          <div class="flex justify-between">
            <span>Category:</span>
            <span class="text-[#888] truncate ml-1">{{ store.selectedPart.category || '—' }}</span>
          </div>
          <div class="flex justify-between">
            <span>Brand:</span>
            <span class="text-[#888] truncate ml-1">{{ store.selectedPart.brandName || '—' }}</span>
          </div>
        </div>
      </div>
    </div>

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
      <button class="flex items-center gap-2 w-full mt-2 px-1 py-1 rounded text-[12px] text-[#666] hover:text-[#aaa] hover:bg-white/[0.04] transition-colors">
        <LogOut class="h-3.5 w-3.5" />
        <span>Logout</span>
      </button>
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
            <!-- Available Brands -->
            <div>
              <button
                class="flex items-center justify-between w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors"
                :class="brandsOpen ? 'text-white/90' : 'hover:bg-white/[0.06]'"
                @click="brandsOpen = !brandsOpen"
              >
                <div class="flex items-center gap-2.5">
                  <ShieldCheck class="h-[15px] w-[15px] shrink-0" />
                  <span>Available Brands</span>
                </div>
                <ChevronDown v-if="brandsOpen" class="h-3 w-3" />
                <ChevronRight v-else class="h-3 w-3" />
              </button>
              <div v-show="brandsOpen" class="mt-0.5">
                <button
                  class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 pl-9 pr-3 py-2 rounded text-[13px] transition-colors"
                  :class="route.name === 'brand-settings' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
                  @click="navigate('/brand-settings')"
                >
                  All Brands
                </button>
                <button
                  class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 pl-9 pr-3 py-2 rounded text-[13px] transition-colors"
                  :class="route.name === 'catalog' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
                  @click="navigateCatalog"
                >
                  All Products
                </button>
              </div>
            </div>

            <!-- Export -->
            <button
              class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors mt-1"
              :class="route.name === 'export' ? 'bg-[#3bbfa0] text-white font-medium' : 'hover:bg-white/[0.06]'"
              @click="navigate('/export')"
            >
              <FileDown class="h-[15px] w-[15px] shrink-0" />
              <span>Export</span>
            </button>

            <!-- Distribution -->
            <div class="mt-1">
              <button
                class="flex items-center justify-between w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors hover:bg-white/[0.06]"
                @click="distributionOpen = !distributionOpen"
              >
                <div class="flex items-center gap-2.5">
                  <Truck class="h-[15px] w-[15px] shrink-0" />
                  <span>Distribution</span>
                </div>
                <ChevronDown v-if="distributionOpen" class="h-3 w-3" />
                <ChevronRight v-else class="h-3 w-3" />
              </button>
              <div v-show="distributionOpen" class="mt-0.5 mx-1.5 pl-9 pr-3 py-2">
                <span class="text-[11px] text-[#555]">Coming soon</span>
              </div>
            </div>

            <!-- Settings -->
            <div class="mt-1">
              <button
                class="flex items-center justify-between w-[calc(100%-12px)] mx-1.5 px-3 py-2 rounded text-[13px] transition-colors hover:bg-white/[0.06]"
                @click="settingsOpen = !settingsOpen"
              >
                <div class="flex items-center gap-2.5">
                  <Settings2 class="h-[15px] w-[15px] shrink-0" />
                  <span>Settings</span>
                </div>
                <ChevronDown v-if="settingsOpen" class="h-3 w-3" />
                <ChevronRight v-else class="h-3 w-3" />
              </button>
              <div v-show="settingsOpen" class="mt-0.5">
                <button
                  class="flex items-center gap-2.5 w-[calc(100%-12px)] mx-1.5 pl-9 pr-3 py-2 rounded text-[13px] transition-colors hover:bg-white/[0.06]"
                  @click="navigate('/brand-settings')"
                >
                  Brand Settings
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
            <button class="flex items-center gap-2 w-full mt-2 px-1 py-1 rounded text-[12px] text-[#666] hover:text-[#aaa] hover:bg-white/[0.04] transition-colors">
              <LogOut class="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
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
