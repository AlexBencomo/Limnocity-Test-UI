<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Plus, Upload, Image, FileText } from 'lucide-vue-next'

defineProps<{ part: Part }>()

const assetIcon = (type: string) => type.includes('photo') || type.includes('image') ? Image : FileText
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] uppercase tracking-wider">Digital Assets</span>
      <button class="flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors">
        <Plus class="h-3.5 w-3.5" />
        Add Asset
      </button>
    </div>

    <!-- Upload zone -->
    <div class="border border-dashed border-[#ddd] rounded-sm p-5 text-center hover:border-[#3bbfa0] transition-colors cursor-pointer mb-4">
      <Upload class="h-6 w-6 mx-auto mb-1.5 text-[#aaa]" />
      <p class="text-[11px] text-[#aaa]">Drag & drop files here or click to browse</p>
    </div>

    <!-- Asset cards -->
    <div class="grid grid-cols-2 xl:grid-cols-3 gap-3">
      <div
        v-for="(asset, i) in part.digitalAssets"
        :key="i"
        class="border border-[#eee] rounded-sm p-3 hover:border-[#3bbfa0] transition-colors"
      >
        <div class="flex h-20 items-center justify-center bg-[#fafafa] mb-2">
          <component :is="assetIcon(asset.assetType)" class="h-6 w-6 text-[#aaa]" />
        </div>
        <p class="text-[13px] text-[#1a1a2e] truncate">{{ asset.fileName }}</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-[11px] text-[#888] border border-[#ddd] px-1.5 py-0.5 rounded-sm">{{ asset.assetType }}</span>
          <span class="text-[11px] text-[#aaa]">{{ asset.fileType }}</span>
        </div>
      </div>
    </div>

    <div v-if="part.digitalAssets.length === 0" class="flex flex-col items-center py-8">
      <Image class="h-8 w-8 text-[#aaa] mb-3" />
      <p class="text-[13px] text-[#aaa]">No digital assets uploaded yet.</p>
    </div>
  </div>
</template>
