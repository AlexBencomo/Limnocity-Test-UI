<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { Part } from '@/data/parts'
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import { Save } from 'lucide-vue-next'

const props = defineProps<{ part: Part }>()
const store = useCatalogStore()

const form = reactive({
  wholesale: 0,
  jobber: 0,
  retail: 0,
  currency: '',
  priceSheet: '',
  effectiveDate: '',
})

function loadForm() {
  form.wholesale = props.part.pricing.wholesale
  form.jobber = props.part.pricing.jobber
  form.retail = props.part.pricing.retail
  form.currency = props.part.pricing.currency
  form.priceSheet = props.part.pricing.priceSheet
  form.effectiveDate = props.part.pricing.effectiveDate
}

watch(() => props.part.id, loadForm, { immediate: true })

const isDirty = computed(() =>
  form.wholesale !== props.part.pricing.wholesale ||
  form.jobber !== props.part.pricing.jobber ||
  form.retail !== props.part.pricing.retail ||
  form.currency !== props.part.pricing.currency ||
  form.priceSheet !== props.part.pricing.priceSheet ||
  form.effectiveDate !== props.part.pricing.effectiveDate
)

function save() {
  store.updatePart(props.part.id, {
    pricing: { ...form },
  })
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Pricing</span>
    </div>

    <!-- Shared fields -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 pb-4 border-b border-[#eee] dark:border-[#2a2a40]">
      <div>
        <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Currency</label>
        <Input v-model="form.currency" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
      </div>
      <div>
        <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Price Sheet</label>
        <Input v-model="form.priceSheet" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
      </div>
      <div>
        <label class="block text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-1.5">Effective Date</label>
        <Input v-model="form.effectiveDate" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
      </div>
    </div>

    <div class="overflow-x-auto pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
      <table class="w-full min-w-[400px]">
        <thead>
          <tr class="border-b border-[#eee] dark:border-[#2a2a40]">
            <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Price Type</th>
            <th class="text-left text-[11px] text-[#888] dark:text-[#888899] uppercase tracking-wider font-normal pb-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-[#eee] dark:border-[#2a2a40] h-[40px]">
            <td class="py-1.5">
              <span class="text-[11px] font-mono border border-[#ddd] dark:border-[#2a2a40] text-[#888] dark:text-[#888899] px-1.5 py-0.5 rounded-sm mr-2">WD1</span>
              <span class="text-[13px] text-[#444] dark:text-[#ccc]">Wholesale</span>
            </td>
            <td class="py-1.5">
              <Input v-model.number="form.wholesale" type="number" step="0.01" class="h-7 w-32 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
            </td>
          </tr>
          <tr class="border-b border-[#eee] dark:border-[#2a2a40] h-[40px]">
            <td class="py-1.5">
              <span class="text-[11px] font-mono border border-[#ddd] dark:border-[#2a2a40] text-[#888] dark:text-[#888899] px-1.5 py-0.5 rounded-sm mr-2">JBR</span>
              <span class="text-[13px] text-[#444] dark:text-[#ccc]">Jobber</span>
            </td>
            <td class="py-1.5">
              <Input v-model.number="form.jobber" type="number" step="0.01" class="h-7 w-32 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
            </td>
          </tr>
          <tr class="border-b border-[#eee] dark:border-[#2a2a40] h-[40px]">
            <td class="py-1.5">
              <span class="text-[11px] font-mono border border-[#ddd] dark:border-[#2a2a40] text-[#888] dark:text-[#888899] px-1.5 py-0.5 rounded-sm mr-2">RET</span>
              <span class="text-[13px] text-[#444] dark:text-[#ccc]">Retail</span>
            </td>
            <td class="py-1.5">
              <Input v-model.number="form.retail" type="number" step="0.01" class="h-7 w-32 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
            </td>
          </tr>
        </tbody>
      </table>
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
