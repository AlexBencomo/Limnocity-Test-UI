<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Part } from '@/data/parts'
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-vue-next'

type KitComponent = Part['kitComponents'][number]

const props = defineProps<{
  open: boolean
  component?: KitComponent | null
  index: number
  partId: string
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const store = useCatalogStore()

const form = ref<KitComponent>({ sequence: 1, partNumber: '', quantity: 1, uom: 'Each', brandCode: '' })

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    form.value = props.component
      ? { ...props.component }
      : { sequence: 1, partNumber: '', quantity: 1, uom: 'Each', brandCode: '' }
  }
})

function save() {
  if (props.component) {
    store.updateKitComponent(props.partId, props.index, form.value)
  } else {
    store.addKitComponent(props.partId, form.value)
  }
  emit('update:open', false)
}

function remove() {
  if (props.component) {
    store.removeKitComponent(props.partId, props.index)
    emit('update:open', false)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle class="text-[15px]">{{ component ? 'Edit Component' : 'Add Component' }}</DialogTitle>
        <DialogDescription class="text-[12px] text-[#888]">Define a kit component with part details.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-2">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Sequence</label>
            <Input v-model.number="form.sequence" type="number" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Part Number</label>
            <Input v-model="form.partNumber" class="h-8 text-[13px] border-[#ddd]" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Quantity</label>
            <Input v-model.number="form.quantity" type="number" min="1" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">UOM</label>
            <Input v-model="form.uom" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Brand Code</label>
            <Input v-model="form.brandCode" class="h-8 text-[13px] border-[#ddd]" />
          </div>
        </div>
      </div>

      <DialogFooter class="flex items-center gap-2">
        <button v-if="component" type="button" class="mr-auto flex items-center gap-1 text-[12px] text-red-500 hover:text-red-600" @click="remove">
          <Trash2 class="h-3.5 w-3.5" /> Delete
        </button>
        <button type="button" class="text-[12px] text-[#666] border border-[#ddd] px-4 py-1.5 rounded-sm hover:bg-[#f8f8f8]" @click="emit('update:open', false)">Cancel</button>
        <button type="button" class="text-[12px] text-white bg-[#3bbfa0] px-4 py-1.5 rounded-sm hover:bg-[#2ea88a]" @click="save">{{ component ? 'Save' : 'Add' }}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
