<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { Part } from '@/data/parts'
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Save } from 'lucide-vue-next'

const props = defineProps<{ part: Part }>()
const store = useCatalogStore()

const form = reactive({
  height: 0,
  width: 0,
  length: 0,
  weight: 0,
  containerType: '',
  quantityOfEachs: 0,
  gtin: '',
  hazmat: false,
})

function loadForm() {
  form.height = props.part.packaging.height
  form.width = props.part.packaging.width
  form.length = props.part.packaging.length
  form.weight = props.part.packaging.weight
  form.containerType = props.part.packaging.containerType
  form.quantityOfEachs = props.part.packaging.quantityOfEachs
  form.gtin = props.part.packaging.gtin
  form.hazmat = props.part.extendedInfo.hazmat
}

watch(() => props.part.id, loadForm, { immediate: true })

const isDirty = computed(() =>
  form.height !== props.part.packaging.height ||
  form.width !== props.part.packaging.width ||
  form.length !== props.part.packaging.length ||
  form.weight !== props.part.packaging.weight ||
  form.containerType !== props.part.packaging.containerType ||
  form.quantityOfEachs !== props.part.packaging.quantityOfEachs ||
  form.gtin !== props.part.packaging.gtin ||
  form.hazmat !== props.part.extendedInfo.hazmat
)

function save() {
  store.updatePart(props.part.id, {
    packaging: {
      height: form.height,
      width: form.width,
      length: form.length,
      weight: form.weight,
      containerType: form.containerType,
      quantityOfEachs: form.quantityOfEachs,
      gtin: form.gtin,
    } as any,
    extendedInfo: { hazmat: form.hazmat } as any,
  })
}
</script>

<template>
  <div>
    <!-- Package Information -->
    <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
      <div class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-4">Package Information</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Height</label>
          <div class="flex items-center gap-2">
            <Input v-model.number="form.height" type="number" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa] dark:text-[#666]">{{ part.packaging.dimensionUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Width</label>
          <div class="flex items-center gap-2">
            <Input v-model.number="form.width" type="number" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa] dark:text-[#666]">{{ part.packaging.dimensionUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Length</label>
          <div class="flex items-center gap-2">
            <Input v-model.number="form.length" type="number" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa] dark:text-[#666]">{{ part.packaging.dimensionUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Weight</label>
          <div class="flex items-center gap-2">
            <Input v-model.number="form.weight" type="number" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa] dark:text-[#666]">{{ part.packaging.weightUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Container Type</label>
          <Input v-model="form.containerType" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Quantity of Eachs</label>
          <Input v-model.number="form.quantityOfEachs" type="number" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">GTIN / UPC</label>
          <Input v-model="form.gtin" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0] font-mono" />
        </div>
      </div>
    </div>

    <!-- Hazardous Materials -->
    <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
      <div class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-4">Hazardous Materials</div>
      <div class="flex items-center gap-2">
        <Checkbox v-model:checked="form.hazmat" />
        <span class="text-[13px] text-[#444] dark:text-[#ccc]">This product contains hazardous materials</span>
      </div>
    </div>

    <!-- Save -->
    <div class="flex justify-end">
      <button
        :disabled="!isDirty"
        class="flex items-center gap-1.5 text-[12px] px-4 py-1.5 rounded-sm transition-colors"
        :class="isDirty
          ? 'text-white bg-[#3bbfa0] hover:bg-[#2ea88a]'
          : 'text-[#aaa] dark:text-[#666] bg-[#f0f0f0] dark:bg-[#1a1a2e] cursor-not-allowed'"
        @click="save"
      >
        <Save class="h-3.5 w-3.5" />
        Save Changes
      </button>
    </div>
  </div>
</template>
