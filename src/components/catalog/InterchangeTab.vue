<script setup lang="ts">
import type { Part } from '@/data/parts'
import { useEditDialog } from '@/composables/useEditDialog'
import { Plus, ArrowLeftRight, Pencil } from 'lucide-vue-next'
import InterchangeDialog from './InterchangeDialog.vue'

const props = defineProps<{ part: Part }>()

const { dialogOpen, editingItem, editingIndex, openAdd, openEdit } =
  useEditDialog<Part['interchanges'][number]>()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Interchange / Cross-Reference</span>
      <button
        class="flex items-center gap-1 text-[12px] text-[#444] dark:text-[#ccc] border border-[#ddd] dark:border-[#2a2a40] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors"
        @click="openAdd"
      >
        <Plus class="h-3.5 w-3.5" />
        Add Record
      </button>
    </div>

    <table v-if="part.interchanges.length > 0" class="w-full">
      <thead>
        <tr class="border-b border-[#eee] dark:border-[#2a2a40]">
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Type</th>
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Brand</th>
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Part Number</th>
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Notes</th>
          <th class="w-10 pb-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ic, i) in part.interchanges" :key="i" class="border-b border-[#eee] dark:border-[#2a2a40] h-[40px]">
          <td class="py-1.5">
            <span
              :class="ic.type === 'OE'
                ? 'bg-[#3bbfa0] text-white'
                : 'border border-[#ddd] dark:border-[#2a2a40] text-[#888] dark:text-[#888899]'"
              class="text-[11px] px-2 py-0.5 rounded-sm"
            >{{ ic.type }}</span>
          </td>
          <td class="text-[13px] text-[#444] dark:text-[#ccc] py-1.5">{{ ic.brandName }}</td>
          <td class="text-[13px] text-[#1a1a2e] dark:text-[#e0e0e8] font-mono py-1.5">{{ ic.partNumber }}</td>
          <td class="text-[13px] text-[#888] dark:text-[#888899] py-1.5">{{ ic.notes }}</td>
          <td class="py-1.5">
            <button
              class="h-6 w-6 flex items-center justify-center text-[#aaa] dark:text-[#666] hover:text-[#444] dark:hover:text-[#ccc] transition-colors"
              @click="openEdit(ic, i)"
            >
              <Pencil class="h-3 w-3" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="flex flex-col items-center py-10">
      <ArrowLeftRight class="h-8 w-8 text-[#aaa] dark:text-[#666] mb-3" />
      <p class="text-[13px] text-[#aaa] dark:text-[#666]">No interchange records</p>
      <p class="text-[11px] text-[#aaa] dark:text-[#666] mt-1">Add OE or competitor cross-references.</p>
    </div>

    <InterchangeDialog
      v-model:open="dialogOpen"
      :interchange="editingItem"
      :index="editingIndex"
      :part-id="part.id"
    />
  </div>
</template>
