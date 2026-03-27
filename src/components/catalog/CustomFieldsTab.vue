<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Plus, Tags } from 'lucide-vue-next'

defineProps<{ part: Part }>()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] uppercase tracking-wider">Custom Fields</span>
      <button class="flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors">
        <Plus class="h-3.5 w-3.5" />
        Add Field
      </button>
    </div>
    <div class="flex flex-col items-center py-10">
      <Tags class="h-8 w-8 text-[#aaa] mb-3" />
      <p class="text-[13px] text-[#aaa]">No custom fields</p>
      <p class="text-[11px] text-[#aaa] mt-1">Add custom key-value pairs for this part.</p>
    </div>
  </div>
</template>
