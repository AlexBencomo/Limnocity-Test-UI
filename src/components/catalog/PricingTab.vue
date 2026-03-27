<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-vue-next'

defineProps<{ part: Part }>()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <span class="text-[12px] text-[#888] uppercase tracking-wider">Pricing</span>
      <button class="flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors">
        <Plus class="h-3.5 w-3.5" />
        Add Price
      </button>
    </div>

    <table class="w-full">
      <thead>
        <tr class="border-b border-[#eee]">
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Price Type</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Amount</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Currency</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Price Sheet</th>
          <th class="text-left text-[11px] text-[#888] uppercase tracking-wider font-normal pb-2">Effective Date</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-[#eee] h-[40px]">
          <td class="py-1.5">
            <span class="text-[11px] font-mono border border-[#ddd] text-[#888] px-1.5 py-0.5 rounded-sm mr-2">WD1</span>
            <span class="text-[13px] text-[#444]">Wholesale</span>
          </td>
          <td class="py-1.5">
            <Input :model-value="'$' + part.pricing.wholesale.toFixed(2)" class="h-7 w-28 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
          </td>
          <td class="text-[13px] text-[#444] py-1.5">{{ part.pricing.currency }}</td>
          <td class="text-[13px] text-[#444] py-1.5">{{ part.pricing.priceSheet }}</td>
          <td class="text-[13px] text-[#888] py-1.5">{{ part.pricing.effectiveDate }}</td>
        </tr>
        <tr class="border-b border-[#eee] h-[40px]">
          <td class="py-1.5">
            <span class="text-[11px] font-mono border border-[#ddd] text-[#888] px-1.5 py-0.5 rounded-sm mr-2">JBR</span>
            <span class="text-[13px] text-[#444]">Jobber</span>
          </td>
          <td class="py-1.5">
            <Input :model-value="'$' + part.pricing.jobber.toFixed(2)" class="h-7 w-28 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
          </td>
          <td class="text-[13px] text-[#444] py-1.5">{{ part.pricing.currency }}</td>
          <td class="text-[13px] text-[#444] py-1.5">{{ part.pricing.priceSheet }}</td>
          <td class="text-[13px] text-[#888] py-1.5">{{ part.pricing.effectiveDate }}</td>
        </tr>
        <tr class="border-b border-[#eee] h-[40px]">
          <td class="py-1.5">
            <span class="text-[11px] font-mono border border-[#ddd] text-[#888] px-1.5 py-0.5 rounded-sm mr-2">RET</span>
            <span class="text-[13px] text-[#444]">Retail</span>
          </td>
          <td class="py-1.5">
            <Input :model-value="'$' + part.pricing.retail.toFixed(2)" class="h-7 w-28 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
          </td>
          <td class="text-[13px] text-[#444] py-1.5">{{ part.pricing.currency }}</td>
          <td class="text-[13px] text-[#444] py-1.5">{{ part.pricing.priceSheet }}</td>
          <td class="text-[13px] text-[#888] py-1.5">{{ part.pricing.effectiveDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
