<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, ChevronDown, ArrowUpDown, ArrowRight, Plus } from 'lucide-vue-next'

const store = useCatalogStore()
const router = useRouter()

function addPart() {
  const newId = store.createPart()
  router.push(`/catalog/${newId}`)
}

function viewDetails(partId: string) {
  store.selectPart(partId)
  router.push(`/catalog/${partId}`)
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

      <div class="flex items-center gap-2 flex-wrap">
        <Select v-model="store.filterCategory">
          <SelectTrigger class="w-36 h-7 text-[12px] border-[#ddd] rounded">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem :value="null as any">All Categories</SelectItem>
            <SelectItem v-for="cat in store.categories" :key="cat" :value="cat">
              {{ cat }}
            </SelectItem>
          </SelectContent>
        </Select>

        <Select v-model="store.filterStatus">
          <SelectTrigger class="w-28 h-7 text-[12px] border-[#ddd] rounded">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem :value="null as any">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
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
        <span v-if="store.selectedPartIds.size > 0" class="text-[#3bbfa0] font-medium">
          {{ store.selectedPartIds.size }} selected
        </span>
        <button class="flex items-center gap-1 px-2 py-1 rounded border border-[#ddd] text-[12px] text-[#666] hover:bg-[#f8f8f8] transition-colors">
          Actions
          <ChevronDown class="h-3 w-3" />
        </button>
      </div>
    </div>

    <!-- Column Headers (hidden on mobile) -->
    <div class="hidden sm:flex items-center gap-0 px-3 py-1 border-b border-[#eee] bg-[#fafafa] shrink-0">
      <div class="w-8 shrink-0 flex items-center justify-center">
        <Checkbox
          :checked="store.selectedPartIds.size === store.filteredParts.length && store.filteredParts.length > 0"
          @update:checked="(val: boolean) => val ? store.selectAllParts() : store.deselectAllParts()"
        />
      </div>
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
        class="flex items-center gap-0 px-3 min-h-[48px] border-b border-[#eee] transition-colors"
        :class="store.selectedPartId === part.id ? 'bg-[#f0faf7]' : 'bg-white hover:bg-[#fafafa]'"
      >
        <!-- Mobile card layout -->
        <div class="flex sm:hidden items-center gap-3 w-full py-2">
          <Checkbox
            :checked="store.selectedPartIds.has(part.id)"
            @click.stop
            @update:checked="store.togglePartSelection(part.id)"
          />
          <div class="flex-1 min-w-0 cursor-pointer" @click="viewDetails(part.id)">
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
          <button
            class="shrink-0 flex items-center gap-1 text-[11px] text-[#3bbfa0] border border-[#3bbfa0] px-2 py-1 rounded-sm hover:bg-[#f0faf7] transition-colors"
            @click.stop="viewDetails(part.id)"
          >
            View
            <ArrowRight class="h-3 w-3" />
          </button>
        </div>

        <!-- Desktop row layout -->
        <div class="hidden sm:contents">
          <div class="w-8 shrink-0 flex items-center justify-center">
            <Checkbox
              :checked="store.selectedPartIds.has(part.id)"
              @click.stop
              @update:checked="store.togglePartSelection(part.id)"
            />
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
            <button
              class="flex items-center gap-1 text-[11px] text-[#3bbfa0] border border-[#3bbfa0] px-2 py-1 rounded-sm hover:bg-[#f0faf7] transition-colors"
              @click.stop="viewDetails(part.id)"
            >
              Details
              <ArrowRight class="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
