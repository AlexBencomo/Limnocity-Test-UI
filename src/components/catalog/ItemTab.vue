<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { brands } from '@/data/brands'

const props = defineProps<{ part: Part }>()

const currentBrand = brands.find((b) => b.code === props.part.brandCode)
</script>

<template>
  <div>
    <!-- Main Section -->
    <div class="pb-5 mb-5 border-b border-[#eee]">
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Main</div>
      <div class="grid grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Part Number</label>
          <Input :model-value="part.partNumber" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Base Part Number</label>
          <Input :model-value="part.basePartNumber" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div class="col-span-2">
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Part Type</label>
          <div class="flex items-center gap-2">
            <div class="flex-1 border border-[#ddd] px-3 py-1.5 text-[13px] text-[#444] rounded-sm">
              {{ part.category }} / {{ part.subcategory }} / {{ part.partName }}
            </div>
            <span class="border border-[#3bbfa0] text-[#3bbfa0] text-[11px] font-mono px-2 py-0.5 rounded-sm">{{ part.partTerminologyId }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Brand</label>
          <Input :model-value="part.brandName" disabled class="h-7 text-[13px] border-[#ddd] bg-[#fafafa]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Sub Brand</label>
          <Select :model-value="part.subBrand">
            <SelectTrigger class="h-7 text-[13px] border-[#ddd]">
              <SelectValue :placeholder="part.subBrand || 'Select sub-brand'" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="sb in currentBrand?.subBrands ?? []"
                :key="sb"
                :value="sb"
              >
                {{ sb }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <Checkbox :checked="part.universalPart" />
          <span class="text-[13px] text-[#444]">Universal Part</span>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <Checkbox :checked="part.acesApplications" />
          <span class="text-[13px] text-[#444]">ACES Applications</span>
        </div>
        <div class="col-span-2">
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Quantity Per Application</label>
          <div class="flex items-center gap-3">
            <Input
              type="number"
              :model-value="part.quantityPerApplication"
              class="w-20 h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]"
            />
            <Select :model-value="part.quantityQualifier">
              <SelectTrigger class="w-56 h-7 text-[13px] border-[#ddd]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal Quantity (NOR)">Normal Quantity (NOR)</SelectItem>
                <SelectItem value="Minimum Required (MIN)">Minimum Required (MIN)</SelectItem>
                <SelectItem value="Maximum Allowed (MAX)">Maximum Allowed (MAX)</SelectItem>
                <SelectItem value="As Required (REQ)">As Required (REQ)</SelectItem>
              </SelectContent>
            </Select>
            <Select :model-value="part.quantityUom">
              <SelectTrigger class="w-28 h-7 text-[13px] border-[#ddd]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Each">Each</SelectItem>
                <SelectItem value="Pair">Pair</SelectItem>
                <SelectItem value="Kit">Kit</SelectItem>
                <SelectItem value="Pack">Pack</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Information -->
    <div>
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Order Information</div>
      <div class="grid grid-cols-3 gap-x-8 gap-y-4">
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Minimum Order Quantity</label>
          <Input type="number" model-value="1" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Effective Date</label>
          <Input type="date" :model-value="part.createdAt" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Available Date</label>
          <Input type="date" :model-value="part.createdAt" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">GTIN / UPC</label>
          <Input :model-value="part.packaging.gtin" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0] font-mono" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Container Type</label>
          <Input :model-value="part.packaging.containerType" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Status</label>
          <Select :model-value="part.status">
            <SelectTrigger class="h-7 text-[13px] border-[#ddd]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>
