<script setup lang="ts">
import type { Part } from '@/data/parts'
import { useEditDialog } from '@/composables/useEditDialog'
import { Plus, Upload, Image, FileText, Pencil } from 'lucide-vue-next'
import DigitalAssetDialog from './DigitalAssetDialog.vue'

const props = defineProps<{ part: Part }>()

const { dialogOpen, editingItem, editingIndex, openAdd, openEdit } =
  useEditDialog<Part['digitalAssets'][number]>()

const assetIcon = (type: string) => type.includes('photo') || type.includes('image') ? Image : FileText
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Digital Assets</span>
      <button
        class="flex items-center gap-1 text-[12px] text-[#444] dark:text-[#ccc] border border-[#ddd] dark:border-[#2a2a40] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors"
        @click="openAdd"
      >
        <Plus class="h-3.5 w-3.5" />
        Add Asset
      </button>
    </div>

    <!-- Upload zone -->
    <div
      class="border border-dashed border-[#ddd] dark:border-[#2a2a40] rounded-sm p-5 text-center hover:border-[#3bbfa0] transition-colors cursor-pointer mb-4"
      @click="openAdd"
    >
      <Upload class="h-6 w-6 mx-auto mb-1.5 text-[#aaa] dark:text-[#666]" />
      <p class="text-[11px] text-[#aaa] dark:text-[#666]">Drag & drop files here or click to browse</p>
    </div>

    <!-- Asset cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
      <div
        v-for="(asset, i) in part.digitalAssets"
        :key="i"
        class="border border-[#eee] dark:border-[#2a2a40] rounded-sm p-3 hover:border-[#3bbfa0] transition-colors cursor-pointer group relative"
        @click="openEdit(asset, i)"
      >
        <div class="flex h-20 items-center justify-center bg-[#fafafa] dark:bg-[#181828] mb-2">
          <component :is="assetIcon(asset.assetType)" class="h-6 w-6 text-[#aaa] dark:text-[#666]" />
        </div>
        <p class="text-[13px] text-[#1a1a2e] dark:text-[#e0e0e8] truncate">{{ asset.fileName }}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[11px] text-[#888] dark:text-[#888899] border border-[#ddd] dark:border-[#2a2a40] px-1.5 py-0.5 rounded-sm">{{ asset.assetType }}</span>
          <span class="text-[11px] text-[#aaa] dark:text-[#666]">{{ asset.fileType }}</span>
        </div>
        <button class="absolute top-2 right-2 h-6 w-6 flex items-center justify-center text-[#aaa] dark:text-[#666] hover:text-[#444] dark:hover:text-[#ccc] opacity-0 group-hover:opacity-100 transition-opacity">
          <Pencil class="h-3 w-3" />
        </button>
      </div>
    </div>

    <div v-if="part.digitalAssets.length === 0" class="flex flex-col items-center py-8">
      <Image class="h-8 w-8 text-[#aaa] dark:text-[#666] mb-3" />
      <p class="text-[13px] text-[#aaa] dark:text-[#666]">No digital assets uploaded yet.</p>
    </div>

    <DigitalAssetDialog
      v-model:open="dialogOpen"
      :asset="editingItem"
      :index="editingIndex"
      :part-id="part.id"
    />
  </div>
</template>
