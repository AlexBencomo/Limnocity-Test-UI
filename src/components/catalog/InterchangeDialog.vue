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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Trash2 } from 'lucide-vue-next'

type Interchange = Part['interchanges'][number]

const props = defineProps<{
  open: boolean
  interchange?: Interchange | null
  index: number
  partId: string
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const store = useCatalogStore()

const form = ref<Interchange>({ type: 'OE', brandCode: '', brandName: '', partNumber: '', notes: '' })

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    form.value = props.interchange
      ? { ...props.interchange }
      : { type: 'OE', brandCode: '', brandName: '', partNumber: '', notes: '' }
  }
})

function save() {
  if (props.interchange) {
    store.updateInterchange(props.partId, props.index, form.value)
  } else {
    store.addInterchange(props.partId, form.value)
  }
  emit('update:open', false)
}

function remove() {
  if (props.interchange) {
    store.removeInterchange(props.partId, props.index)
    emit('update:open', false)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle class="text-[15px]">{{ interchange ? 'Edit Record' : 'Add Record' }}</DialogTitle>
        <DialogDescription class="text-[12px] text-[#888] dark:text-[#888899]">Add an OE or competitor cross-reference.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-2">
        <div>
          <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Type</label>
          <Select v-model="form.type">
            <SelectTrigger class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40] w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OE">OE</SelectItem>
              <SelectItem value="Competitor">Competitor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Brand Name</label>
            <Input v-model="form.brandName" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Brand Code</label>
            <Input v-model="form.brandCode" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
          </div>
        </div>
        <div>
          <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Part Number</label>
          <Input v-model="form.partNumber" class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
        </div>
        <div>
          <label class="text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1 block">Notes</label>
          <Input v-model="form.notes" placeholder="Optional notes..." class="h-8 text-[13px] border-[#ddd] dark:border-[#2a2a40]" />
        </div>
      </div>

      <DialogFooter class="flex items-center gap-2">
        <button v-if="interchange" type="button" class="mr-auto flex items-center gap-1 text-[12px] text-red-500 hover:text-red-600" @click="remove">
          <Trash2 class="h-3.5 w-3.5" /> Delete
        </button>
        <button type="button" class="text-[12px] text-[#666] dark:text-[#999] border border-[#ddd] dark:border-[#2a2a40] px-4 py-1.5 rounded-sm hover:bg-[#f8f8f8] dark:hover:bg-[#181828]" @click="emit('update:open', false)">Cancel</button>
        <button type="button" class="text-[12px] text-white bg-[#3bbfa0] px-4 py-1.5 rounded-sm hover:bg-[#2ea88a]" @click="save">{{ interchange ? 'Save' : 'Add' }}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
