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

type DigitalAsset = Part['digitalAssets'][number]

const props = defineProps<{
  open: boolean
  asset?: DigitalAsset | null
  index: number
  partId: string
}>()

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const store = useCatalogStore()

const form = ref<DigitalAsset>({ fileName: '', assetType: '', fileType: '', uri: '' })

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    form.value = props.asset
      ? { ...props.asset }
      : { fileName: '', assetType: '', fileType: '', uri: '' }
  }
})

function save() {
  if (props.asset) {
    store.updateDigitalAsset(props.partId, props.index, form.value)
  } else {
    store.addDigitalAsset(props.partId, form.value)
  }
  emit('update:open', false)
}

function remove() {
  if (props.asset) {
    store.removeDigitalAsset(props.partId, props.index)
    emit('update:open', false)
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle class="text-[15px]">{{ asset ? 'Edit Asset' : 'Add Asset' }}</DialogTitle>
        <DialogDescription class="text-[12px] text-[#888]">Add a digital asset reference.</DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-2">
        <div>
          <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">File Name</label>
          <Input v-model="form.fileName" placeholder="e.g. product-photo.jpg" class="h-8 text-[13px] border-[#ddd]" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Asset Type</label>
            <Input v-model="form.assetType" placeholder="e.g. Product Photo" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">File Type</label>
            <Input v-model="form.fileType" placeholder="e.g. JPG" class="h-8 text-[13px] border-[#ddd]" />
          </div>
        </div>
        <div>
          <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">URI</label>
          <Input v-model="form.uri" placeholder="https://..." class="h-8 text-[13px] border-[#ddd]" />
        </div>
      </div>

      <DialogFooter class="flex items-center gap-2">
        <button v-if="asset" type="button" class="mr-auto flex items-center gap-1 text-[12px] text-red-500 hover:text-red-600" @click="remove">
          <Trash2 class="h-3.5 w-3.5" /> Delete
        </button>
        <button type="button" class="text-[12px] text-[#666] border border-[#ddd] px-4 py-1.5 rounded-sm hover:bg-[#f8f8f8]" @click="emit('update:open', false)">Cancel</button>
        <button type="button" class="text-[12px] text-white bg-[#3bbfa0] px-4 py-1.5 rounded-sm hover:bg-[#2ea88a]" @click="save">{{ asset ? 'Save' : 'Add' }}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
