<script setup lang="ts">
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
import { Search, ChevronDown, ArrowUpDown } from 'lucide-vue-next'

const store = useCatalogStore()
</script>

<template>
  <div class="bg-white border-b border-[#eee]">
    <!-- Toolbar -->
    <div class="flex items-center gap-2 px-3 py-1.5 border-b border-[#eee]">
      <div class="relative w-56">
        <Search class="absolute left-2 top-[7px] h-3.5 w-3.5 text-[#999]" />
        <Input
          v-model="store.searchQuery"
          placeholder="Search parts..."
          class="pl-7 h-7 text-[12px] border-[#ddd] rounded bg-white focus:border-[#3bbfa0] focus:ring-[#3bbfa0]/20"
        />
      </div>

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

      <div class="ml-auto flex items-center gap-3 text-[12px] text-[#888]">
        <span>{{ store.filteredParts.length }} of {{ store.parts.length }} parts</span>
        <span v-if="store.selectedPartIds.size > 0" class="text-[#3bbfa0] font-medium">
          {{ store.selectedPartIds.size }} selected
        </span>
        <button class="flex items-center gap-1 px-2 py-1 rounded border border-[#ddd] text-[12px] text-[#666] hover:bg-[#f8f8f8] transition-colors">
          Actions
          <ChevronDown class="h-3 w-3" />
        </button>
      </div>
    </div>

    <!-- Column Headers -->
    <div class="flex items-center gap-0 px-3 py-1 border-b border-[#eee] bg-[#fafafa]">
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
      <div class="w-32 shrink-0 text-[11px] uppercase tracking-wider text-[#999]">Category</div>
      <div class="w-28 shrink-0 text-[11px] uppercase tracking-wider text-[#999]">Brand</div>
      <div class="w-20 shrink-0 text-[11px] uppercase tracking-wider text-[#999] text-center">Status</div>
    </div>

    <!-- Rows -->
    <div class="max-h-[200px] overflow-y-auto">
      <div
        v-for="part in store.filteredParts"
        :key="part.id"
        class="flex items-center gap-0 px-3 h-[48px] border-b border-[#eee] cursor-pointer transition-colors"
        :class="store.selectedPartId === part.id ? 'bg-[#f0faf7]' : 'bg-white hover:bg-[#fafafa]'"
        @click="store.selectPart(part.id)"
      >
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
        <div class="w-32 shrink-0 text-[12px] text-[#888] truncate">
          {{ part.category }}
        </div>
        <div class="w-28 shrink-0 text-[12px] text-[#888] truncate">
          {{ part.brandName }}
        </div>
        <div class="w-20 shrink-0 flex justify-center">
          <span
            v-if="part.status === 'approved'"
            class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#3bbfa0] text-white"
          >
            Approved
          </span>
          <span
            v-else-if="part.status === 'review'"
            class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#f59e0b] text-[#f59e0b]"
          >
            Review
          </span>
          <span
            v-else
            class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-[#ccc] text-[#999]"
          >
            Draft
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
