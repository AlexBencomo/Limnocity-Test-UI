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

type Attribute = Part['attributes'][number]

const props = defineProps<{
  open: boolean
  attribute?: Attribute | null
  index: number
  partId: string
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const store = useCatalogStore()

const form = ref<Attribute>({ name: '', value: '', uom: '', padbId: 0 })

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    form.value = props.attribute
      ? { ...props.attribute }
      : { name: '', value: '', uom: '', padbId: 0 }
  }
})

function save() {
  if (props.attribute) {
    store.updateAttribute(props.partId, props.index, form.value)
  } else {
    store.addAttribute(props.partId, form.value)
  }
  emit('update:open', false)
}

function remove() {
  if (props.attribute) {
    store.removeAttribute(props.partId, props.index)
    emit('update:open', false)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle class="text-[15px]">{{ attribute ? 'Edit Attribute' : 'Add Attribute' }}</DialogTitle>
        <DialogDescription class="text-[12px] text-[#888] dark:text-[#888899]">Define a part attribute with its value and unit of measure.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-2">
        <div>
          <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Attribute Name</label>
          <Input v-model="form.name" placeholder="e.g. Inlet Diameter" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Value</label>
            <Input v-model="form.value" placeholder="e.g. 2.5" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">UOM</label>
            <Input v-model="form.uom" placeholder="e.g. inches" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
          </div>
        </div>
        <div>
          <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">PAdb ID</label>
          <Input v-model.number="form.padbId" type="number" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40] w-32" />
        </div>
      </div>

      <DialogFooter class="flex items-center gap-2">
        <button v-if="attribute" type="button" class="mr-auto flex items-center gap-1 text-[12px] text-red-500 hover:text-red-600" @click="remove">
          <Trash2 class="h-3.5 w-3.5" /> Delete
        </button>
        <button type="button" class="text-[12px] text-[#666] dark:text-[#999] border border-[#ddd] dark:border-[#2a2a40] px-4 py-1.5 rounded-sm hover:bg-[#f8f8f8] dark:hover:bg-[#181828]" @click="emit('update:open', false)">Cancel</button>
        <button type="button" class="text-[12px] text-white bg-[#3bbfa0] px-4 py-1.5 rounded-sm hover:bg-[#2ea88a]" @click="save">{{ attribute ? 'Save' : 'Add' }}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
