<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import { Search, ChevronDown, ArrowUpDown, ArrowRight, Plus, Package } from 'lucide-vue-next'

const store = useCatalogStore()

function addPart() {
  store.createPart()
}

function viewDetails(partId: string) {
  store.enterDetail(partId)
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-white overflow-hidden">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-2 px-3 py-1.5 border-b border-[#eee] shrink-0">
      <div class="relative w-full sm:w-56">
        <Search class="absolute left-2 top-[7px] h-3.5 w-3.5 text-[#999]" />
        <Input
          v-model="store.searchQuery"
          placeholder="Search parts..."
          class="pl-7 h-7 text-[12px] border-[#ddd] rounded bg-white focus:border-[#3bbfa0] focus:ring-[#3bbfa0]/20"
        />
      </div>

      <div class="ml-auto flex items-center gap-3 text-[12px] text-[#888]">
        <button
          class="flex items-center gap-1 px-2 py-1 rounded border border-[#3bbfa0] text-[12px] text-[#3bbfa0] hover:bg-[#f0faf7] transition-colors"
          @click="addPart"
        >
          <Plus class="h-3 w-3" />
          Add Part
        </button>
        <span class="hidden sm:inline">{{ store.filteredParts.length }} of {{ store.parts.length }} parts</span>
      </div>
    </div>

    <!-- Column Headers (hidden on mobile) -->
    <div class="hidden sm:flex items-center gap-0 px-3 py-1 border-b border-[#eee] bg-[#fafafa] shrink-0">
      <div class="w-10 shrink-0"></div>
      <button class="flex items-center gap-1 w-28 shrink-0 text-[11px] uppercase tracking-wider text-[#999] hover:text-[#666]">
        Part # <ArrowUpDown class="h-2.5 w-2.5" />
      </button>
      <div class="flex-1 text-[11px] uppercase tracking-wider text-[#999]">Description</div>
      <div class="w-32 shrink-0 text-[11px] uppercase tracking-wider text-[#999] hidden lg:block">Category</div>
      <div class="w-28 shrink-0 text-[11px] uppercase tracking-wider text-[#999] hidden lg:block">Brand</div>
      <div class="w-20 shrink-0 text-[11px] uppercase tracking-wider text-[#999] text-center">Status</div>
      <div class="w-20 shrink-0"></div>
    </div>

    <!-- Rows -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="part in store.filteredParts"
        :key="part.id"
        class="flex items-center gap-0 px-3 min-h-[48px] border-b border-[#eee] cursor-pointer transition-colors"
        :class="store.selectedPartId === part.id ? 'bg-[#f0faf7]' : 'bg-white hover:bg-[#fafafa]'"
        @click="viewDetails(part.id)"
      >
        <!-- Mobile card layout -->
        <div class="flex sm:hidden items-center gap-3 w-full py-2">
          <div class="w-9 h-9 shrink-0 rounded bg-[#f5f5f5] overflow-hidden flex items-center justify-center">
            <img v-if="part.imageUrl" :src="part.imageUrl" :alt="part.partName" class="w-full h-full object-cover" />
            <Package v-else class="h-4 w-4 text-[#ccc]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[13px] font-medium text-[#1a1a2e]">{{ part.partNumber }}</span>
              <span
                v-if="part.status === 'approved'"
                class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#3bbfa0] text-white"
              >Approved</span>
              <span
                v-else-if="part.status === 'review'"
                class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-[#f59e0b] text-[#f59e0b]"
              >Review</span>
              <span
                v-else
                class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border border-[#ccc] text-[#999]"
              >Draft</span>
            </div>
            <div class="text-[12px] text-[#666] truncate mt-0.5">{{ part.descriptions.short }}</div>
          </div>
          <ArrowRight class="h-4 w-4 text-[#ccc] shrink-0" />
        </div>

        <!-- Desktop row layout -->
        <div class="hidden sm:contents">
          <div class="w-10 shrink-0 flex items-center justify-center">
            <div class="w-8 h-8 rounded bg-[#f5f5f5] overflow-hidden flex items-center justify-center">
              <img v-if="part.imageUrl" :src="part.imageUrl" :alt="part.partName" class="w-full h-full object-cover" />
              <Package v-else class="h-3.5 w-3.5 text-[#ccc]" />
            </div>
          </div>
          <div class="w-28 shrink-0 font-mono text-[13px] font-medium text-[#1a1a2e]">
            {{ part.partNumber }}
          </div>
          <div class="flex-1 min-w-0 text-[13px] text-[#444] truncate">
            {{ part.descriptions.short }}
          </div>
          <div class="w-32 shrink-0 text-[12px] text-[#888] truncate hidden lg:block">
            {{ part.category }}
          </div>
          <div class="w-28 shrink-0 text-[12px] text-[#888] truncate hidden lg:block">
            {{ part.brandName }}
          </div>
          <div class="w-20 shrink-0 flex justify-center">
            <span
              v-if="part.status === 'approved'"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#3bbfa0] text-white"
            >Approved</span>
            <span
              v-else-if="part.status === 'review'"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#f59e0b] text-[#f59e0b]"
            >Review</span>
            <span
              v-else
              class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#ccc] text-[#999]"
            >Draft</span>
          </div>
          <div class="w-20 shrink-0 flex justify-center">
            <ArrowRight class="h-4 w-4 text-[#ccc]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
