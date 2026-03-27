<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

defineProps<{ part: Part }>()
</script>

<template>
  <div class="grid grid-cols-2 gap-x-8 gap-y-0">
    <!-- Shipping -->
    <div class="pb-5 mb-5 border-b border-[#eee]">
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Shipping</div>
      <div class="space-y-4">
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Country of Origin</label>
          <Input :model-value="part.extendedInfo.countryOfOrigin" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Harmonized Tariff Code</label>
          <Input :model-value="part.extendedInfo.harmonizedTariff" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0] font-mono" />
        </div>
      </div>
    </div>

    <!-- Warranty -->
    <div class="pb-5 mb-5 border-b border-[#eee]">
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Warranty</div>
      <div>
        <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Warranty (months)</label>
        <Input :model-value="part.extendedInfo.warrantyMonths" type="number" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
      </div>
    </div>

    <!-- Life Cycle -->
    <div>
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Life Cycle</div>
      <div>
        <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Status</label>
        <span class="text-[11px] border border-[#ddd] text-[#888] px-2 py-0.5 rounded-sm">{{ part.extendedInfo.lifeCycleStatus }}</span>
      </div>
    </div>

    <!-- Hazmat -->
    <div>
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Hazmat</div>
      <div class="flex items-center gap-2">
        <Checkbox :checked="part.extendedInfo.hazmat" />
        <span class="text-[13px] text-[#444]">Contains hazardous materials</span>
      </div>
    </div>
  </div>
</template>
