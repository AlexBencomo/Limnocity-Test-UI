<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Input } from '@/components/ui/input'
import { Plus, Pencil } from 'lucide-vue-next'

defineProps<{ part: Part }>()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] uppercase tracking-wider">Attributes</span>
      <button class="flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors">
        <Plus class="h-3.5 w-3.5" />
        Add Attribute
      </button>
    </div>

    <table class="w-full">
      <thead>
        <tr class="border-b border-[#eee]">
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2 w-48">Attribute</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Value</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2 w-24">UOM</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2 w-24">PAdb ID</th>
          <th class="w-10 pb-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attr in part.attributes" :key="attr.padbId" class="border-b border-[#eee] h-[40px]">
          <td class="text-[13px] text-[#1a1a2e] py-1.5">{{ attr.name }}</td>
          <td class="py-1.5">
            <Input :model-value="attr.value" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
          </td>
          <td class="text-[13px] text-[#888] py-1.5">{{ attr.uom }}</td>
          <td class="py-1.5">
            <span class="text-[11px] font-mono border border-[#3bbfa0] text-[#3bbfa0] px-1.5 py-0.5 rounded-sm">{{ attr.padbId }}</span>
          </td>
          <td class="py-1.5">
            <button class="h-6 w-6 flex items-center justify-center text-[#aaa] hover:text-[#444] transition-colors">
              <Pencil class="h-3 w-3" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="part.attributes.length === 0" class="flex flex-col items-center py-8">
      <p class="text-[13px] text-[#aaa]">No attributes defined for this part type.</p>
    </div>
  </div>
</template>
