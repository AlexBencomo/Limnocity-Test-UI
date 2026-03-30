<script setup lang="ts">
import type { Part } from '@/data/parts'
import { useEditDialog } from '@/composables/useEditDialog'
import { Plus, Puzzle, Pencil } from 'lucide-vue-next'
import KitComponentDialog from './KitComponentDialog.vue'

const props = defineProps<{ part: Part }>()

const { dialogOpen, editingItem, editingIndex, openAdd, openEdit } =
  useEditDialog<Part['kitComponents'][number]>()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Kit Components</span>
      <button
        class="flex items-center gap-1 text-[12px] text-[#444] dark:text-[#ccc] border border-[#ddd] dark:border-[#2a2a40] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors"
        @click="openAdd"
      >
        <Plus class="h-3.5 w-3.5" />
        Add Component
      </button>
    </div>

    <table v-if="part.kitComponents.length > 0" class="w-full">
      <thead>
        <tr class="border-b border-[#eee] dark:border-[#2a2a40]">
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Seq</th>
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Part Number</th>
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Quantity</th>
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">UOM</th>
          <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Brand</th>
          <th class="w-10 pb-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comp, i) in part.kitComponents" :key="i" class="border-b border-[#eee] dark:border-[#2a2a40] h-[40px]">
          <td class="text-[13px] text-[#444] dark:text-[#ccc] py-1.5">{{ comp.sequence }}</td>
          <td class="text-[13px] text-[#1a1a2e] dark:text-[#e0e0e8] font-mono py-1.5">{{ comp.partNumber }}</td>
          <td class="text-[13px] text-[#444] dark:text-[#ccc] py-1.5">{{ comp.quantity }}</td>
          <td class="text-[13px] text-[#888] dark:text-[#888899] py-1.5">{{ comp.uom }}</td>
          <td class="text-[13px] text-[#444] dark:text-[#ccc] py-1.5">{{ comp.brandCode }}</td>
          <td class="py-1.5">
            <button
              class="h-6 w-6 flex items-center justify-center text-[#aaa] dark:text-[#666] hover:text-[#444] dark:hover:text-[#ccc] transition-colors"
              @click="openEdit(comp, i)"
            >
              <Pencil class="h-3 w-3" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="flex flex-col items-center py-10">
      <Puzzle class="h-8 w-8 text-[#aaa] dark:text-[#666] mb-3" />
      <p class="text-[13px] text-[#aaa] dark:text-[#666]">No kit components</p>
      <p class="text-[11px] text-[#aaa] dark:text-[#666] mt-1">This part is not a kit.</p>
    </div>

    <KitComponentDialog
      v-model:open="dialogOpen"
      :component="editingItem"
      :index="editingIndex"
      :part-id="part.id"
    />
  </div>
</template>
