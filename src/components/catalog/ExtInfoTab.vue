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
  countryOfOrigin: '',
  harmonizedTariff: '',
  warrantyMonths: 0,
  lifeCycleStatus: '',
  hazmat: false,
})

function loadForm() {
  form.countryOfOrigin = props.part.extendedInfo.countryOfOrigin
  form.harmonizedTariff = props.part.extendedInfo.harmonizedTariff
  form.warrantyMonths = props.part.extendedInfo.warrantyMonths
  form.lifeCycleStatus = props.part.extendedInfo.lifeCycleStatus
  form.hazmat = props.part.extendedInfo.hazmat
}

watch(() => props.part.id, loadForm, { immediate: true })

const isDirty = computed(() =>
  form.countryOfOrigin !== props.part.extendedInfo.countryOfOrigin ||
  form.harmonizedTariff !== props.part.extendedInfo.harmonizedTariff ||
  form.warrantyMonths !== props.part.extendedInfo.warrantyMonths ||
  form.lifeCycleStatus !== props.part.extendedInfo.lifeCycleStatus ||
  form.hazmat !== props.part.extendedInfo.hazmat
)

function save() {
  store.updatePart(props.part.id, {
    extendedInfo: { ...form },
  })
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
      <!-- Shipping -->
      <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
        <div class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-4">Shipping</div>
        <div class="space-y-4">
          <div>
            <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Country of Origin</label>
            <Input v-model="form.countryOfOrigin" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
          </div>
          <div>
            <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Harmonized Tariff Code</label>
            <Input v-model="form.harmonizedTariff" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0] font-mono" />
          </div>
        </div>
      </div>

      <!-- Warranty -->
      <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
        <div class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-4">Warranty</div>
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Warranty (months)</label>
          <Input v-model.number="form.warrantyMonths" type="number" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
        </div>
      </div>

      <!-- Life Cycle -->
      <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
        <div class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-4">Life Cycle</div>
        <div>
          <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Status</label>
          <Input v-model="form.lifeCycleStatus" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
        </div>
      </div>

      <!-- Hazmat -->
      <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
        <div class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-4">Hazmat</div>
        <div class="flex items-center gap-2">
          <Checkbox v-model:checked="form.hazmat" />
          <span class="text-[13px] text-[#444] dark:text-[#ccc]">Contains hazardous materials</span>
        </div>
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
