<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Plus, ArrowLeftRight } from 'lucide-vue-next'

defineProps<{ part: Part }>()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] uppercase tracking-wider">Interchange / Cross-Reference</span>
      <button class="flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors">
        <Plus class="h-3.5 w-3.5" />
        Add Record
      </button>
    </div>

    <table v-if="part.interchanges.length > 0" class="w-full">
      <thead>
        <tr class="border-b border-[#eee]">
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Type</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Brand</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Part Number</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ic, i) in part.interchanges" :key="i" class="border-b border-[#eee] h-[40px]">
          <td class="py-1.5">
            <span
              :class="ic.type === 'OE'
                ? 'bg-[#3bbfa0] text-white'
                : 'border border-[#ddd] text-[#888]'"
              class="text-[11px] px-2 py-0.5 rounded-sm"
            >{{ ic.type }}</span>
          </td>
          <td class="text-[13px] text-[#444] py-1.5">{{ ic.brandName }}</td>
          <td class="text-[13px] text-[#1a1a2e] font-mono py-1.5">{{ ic.partNumber }}</td>
          <td class="text-[13px] text-[#888] py-1.5">{{ ic.notes }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else class="flex flex-col items-center py-10">
      <ArrowLeftRight class="h-8 w-8 text-[#aaa] mb-3" />
      <p class="text-[13px] text-[#aaa]">No interchange records</p>
      <p class="text-[11px] text-[#aaa] mt-1">Add OE or competitor cross-references.</p>
    </div>
  </div>
</template>
