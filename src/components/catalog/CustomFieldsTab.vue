<script setup lang="ts">
import type { Part } from '@/data/parts'
import { useEditDialog } from '@/composables/useEditDialog'
import { Plus, Tags, Pencil } from 'lucide-vue-next'
import CustomFieldDialog from './CustomFieldDialog.vue'

const props = defineProps<{ part: Part }>()

const { dialogOpen, editingItem, editingIndex, openAdd, openEdit } =
  useEditDialog<{ key: string; value: string }>()

const fields = () => props.part.customFields ?? []
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] uppercase tracking-wider">Custom Fields</span>
      <button
        class="flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors"
        @click="openAdd"
      >
        <Plus class="h-3.5 w-3.5" />
        Add Field
      </button>
    </div>

    <table v-if="fields().length > 0" class="w-full">
      <thead>
        <tr class="border-b border-[#eee]">
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Key</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Value</th>
          <th class="w-10 pb-2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, i) in fields()" :key="i" class="border-b border-[#eee] h-[40px]">
          <td class="text-[13px] text-[#1a1a2e] font-mono py-1.5">{{ field.key }}</td>
          <td class="text-[13px] text-[#444] py-1.5">{{ field.value }}</td>
          <td class="py-1.5">
            <button
              class="h-6 w-6 flex items-center justify-center text-[#aaa] hover:text-[#444] transition-colors"
              @click="openEdit(field, i)"
            >
              <Pencil class="h-3 w-3" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="flex flex-col items-center py-10">
      <Tags class="h-8 w-8 text-[#aaa] mb-3" />
      <p class="text-[13px] text-[#aaa]">No custom fields</p>
      <p class="text-[11px] text-[#aaa] mt-1">Add custom key-value pairs for this part.</p>
    </div>

    <CustomFieldDialog
      v-model:open="dialogOpen"
      :field="editingItem"
      :index="editingIndex"
      :part-id="part.id"
    />
  </div>
</template>
