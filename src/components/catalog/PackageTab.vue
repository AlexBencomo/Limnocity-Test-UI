<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

defineProps<{ part: Part }>()
</script>

<template>
  <div>
    <!-- Package Information -->
    <div class="pb-5 mb-5 border-b border-[#eee]">
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Package Information</div>
      <div class="grid grid-cols-3 gap-x-8 gap-y-4">
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Height</label>
          <div class="flex items-center gap-2">
            <Input :model-value="part.packaging.height" type="number" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa]">{{ part.packaging.dimensionUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Width</label>
          <div class="flex items-center gap-2">
            <Input :model-value="part.packaging.width" type="number" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa]">{{ part.packaging.dimensionUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Length</label>
          <div class="flex items-center gap-2">
            <Input :model-value="part.packaging.length" type="number" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa]">{{ part.packaging.dimensionUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Weight</label>
          <div class="flex items-center gap-2">
            <Input :model-value="part.packaging.weight" type="number" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
            <span class="text-[11px] text-[#aaa]">{{ part.packaging.weightUom }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Container Type</label>
          <Input :model-value="part.packaging.containerType" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Quantity of Eachs</label>
          <Input :model-value="part.packaging.quantityOfEachs" type="number" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div class="col-span-2">
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">GTIN / UPC</label>
          <Input :model-value="part.packaging.gtin" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0] font-mono" />
        </div>
      </div>
    </div>

    <!-- Hazardous Materials -->
    <div>
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Hazardous Materials</div>
      <div class="flex items-center gap-2">
        <Checkbox :checked="part.extendedInfo.hazmat" />
        <span class="text-[13px] text-[#444]">This product contains hazardous materials</span>
      </div>
    </div>
  </div>
</template>
