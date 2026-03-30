<script setup lang="ts">
import { ref, watch } from 'vue'
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

const props = defineProps<{
  open: boolean
  field?: { key: string; value: string } | null
  index: number
  partId: string
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const store = useCatalogStore()

const form = ref({ key: '', value: '' })

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    form.value = props.field ? { ...props.field } : { key: '', value: '' }
  }
})

function save() {
  if (props.field) {
    store.updateCustomField(props.partId, props.index, form.value)
  } else {
    store.addCustomField(props.partId, form.value)
  }
  emit('update:open', false)
}

function remove() {
  if (props.field) {
    store.removeCustomField(props.partId, props.index)
    emit('update:open', false)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle class="text-[15px]">{{ field ? 'Edit Field' : 'Add Field' }}</DialogTitle>
        <DialogDescription class="text-[12px] text-[#888] dark:text-[#888899]">Add a custom key-value pair for this part.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-2">
        <div>
          <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Key</label>
          <Input v-model="form.key" placeholder="e.g. warranty_type" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
        </div>
        <div>
          <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Value</label>
          <Input v-model="form.value" placeholder="e.g. Limited Lifetime" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
        </div>
      </div>

      <DialogFooter class="flex items-center gap-2">
        <button v-if="field" type="button" class="mr-auto flex items-center gap-1 text-[12px] text-red-500 hover:text-red-600" @click="remove">
          <Trash2 class="h-3.5 w-3.5" /> Delete
        </button>
        <button type="button" class="text-[12px] text-[#666] dark:text-[#999] border border-[#ddd] dark:border-[#2a2a40] px-4 py-1.5 rounded-sm hover:bg-[#f8f8f8] dark:hover:bg-[#181828]" @click="emit('update:open', false)">Cancel</button>
        <button type="button" class="text-[12px] text-white bg-[#3bbfa0] px-4 py-1.5 rounded-sm hover:bg-[#2ea88a]" @click="save">{{ field ? 'Save' : 'Add' }}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
