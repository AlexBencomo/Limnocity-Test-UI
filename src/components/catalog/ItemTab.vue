<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { Part } from '@/data/parts'
import { useCatalogStore } from '@/stores/catalog'
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
import { categories } from '@/data/categories'
import { Save } from 'lucide-vue-next'

const props = defineProps<{ part: Part }>()
const store = useCatalogStore()

const form = reactive({
  partNumber: '',
  basePartNumber: '',
  category: '',
  subcategory: '',
  partTerminologyId: 0,
  partName: '',
  brandCode: '',
  brandName: '',
  subBrand: '',
  universalPart: false,
  acesApplications: false,
  quantityPerApplication: 1,
  quantityQualifier: '',
  quantityUom: '',
  status: '' as Part['status'],
  gtin: '',
  containerType: '',
  createdAt: '',
})

function loadForm() {
  form.partNumber = props.part.partNumber
  form.basePartNumber = props.part.basePartNumber
  form.category = props.part.category
  form.subcategory = props.part.subcategory
  form.partTerminologyId = props.part.partTerminologyId
  form.partName = props.part.partName
  form.brandCode = props.part.brandCode
  form.brandName = props.part.brandName
  form.subBrand = props.part.subBrand
  form.universalPart = props.part.universalPart
  form.acesApplications = props.part.acesApplications
  form.quantityPerApplication = props.part.quantityPerApplication
  form.quantityQualifier = props.part.quantityQualifier
  form.quantityUom = props.part.quantityUom
  form.status = props.part.status
  form.gtin = props.part.packaging.gtin
  form.containerType = props.part.packaging.containerType
  form.createdAt = props.part.createdAt
}

watch(() => props.part.id, loadForm, { immediate: true })

const currentBrand = computed(() => brands.find((b) => b.code === form.brandCode))

const subcategoriesForCategory = computed(() => {
  const cat = categories.find((c) => c.name === form.category)
  return cat?.subcategories ?? []
})

const partsForSubcategory = computed(() => {
  const sub = subcategoriesForCategory.value.find((s) => s.name === form.subcategory)
  return sub?.parts ?? []
})

function onCategoryChange(val: string | number | bigint | Record<string, any> | null) {
  form.category = String(val ?? '')
  form.subcategory = ''
  form.partName = ''
  form.partTerminologyId = 0
}

function onSubcategoryChange(val: string | number | bigint | Record<string, any> | null) {
  form.subcategory = String(val ?? '')
  form.partName = ''
  form.partTerminologyId = 0
}

function onPartTypeChange(val: string | number | bigint | Record<string, any> | null) {
  const v = String(val ?? '')
  const entry = partsForSubcategory.value.find((p) => String(p.partTerminologyId) === v)
  if (entry) {
    form.partTerminologyId = entry.partTerminologyId
    form.partName = entry.partName
  }
}

function onBrandChange(val: string | number | bigint | Record<string, any> | null) {
  const v = String(val ?? '')
  const brand = brands.find((b) => b.code === v)
  if (brand) {
    form.brandCode = brand.code
    form.brandName = brand.name
    form.subBrand = ''
  }
}

const isDirty = computed(() =>
  form.partNumber !== props.part.partNumber ||
  form.basePartNumber !== props.part.basePartNumber ||
  form.category !== props.part.category ||
  form.subcategory !== props.part.subcategory ||
  form.partTerminologyId !== props.part.partTerminologyId ||
  form.partName !== props.part.partName ||
  form.brandCode !== props.part.brandCode ||
  form.brandName !== props.part.brandName ||
  form.subBrand !== props.part.subBrand ||
  form.universalPart !== props.part.universalPart ||
  form.acesApplications !== props.part.acesApplications ||
  form.quantityPerApplication !== props.part.quantityPerApplication ||
  form.quantityQualifier !== props.part.quantityQualifier ||
  form.quantityUom !== props.part.quantityUom ||
  form.status !== props.part.status ||
  form.gtin !== props.part.packaging.gtin ||
  form.containerType !== props.part.packaging.containerType
)

function save() {
  store.updatePart(props.part.id, {
    partNumber: form.partNumber,
    basePartNumber: form.basePartNumber,
    category: form.category,
    subcategory: form.subcategory,
    partTerminologyId: form.partTerminologyId,
    partName: form.partName,
    brandCode: form.brandCode,
    brandName: form.brandName,
    subBrand: form.subBrand,
    universalPart: form.universalPart,
    acesApplications: form.acesApplications,
    quantityPerApplication: form.quantityPerApplication,
    quantityQualifier: form.quantityQualifier,
    quantityUom: form.quantityUom,
    status: form.status,
    packaging: { gtin: form.gtin, containerType: form.containerType } as any,
  })
}
</script>

<template>
  <div>
    <!-- Main Section -->
    <div class="pb-5 mb-5 border-b border-[#eee]">
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Main</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Part Number</label>
          <Input v-model="form.partNumber" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Base Part Number</label>
          <Input v-model="form.basePartNumber" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Category</label>
          <Select :model-value="form.category" @update:model-value="onCategoryChange">
            <SelectTrigger class="h-7 text-[13px] border-[#ddd]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.name">
                {{ cat.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Subcategory</label>
          <Select :model-value="form.subcategory" @update:model-value="onSubcategoryChange" :disabled="!form.category">
            <SelectTrigger class="h-7 text-[13px] border-[#ddd]">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="sub in subcategoriesForCategory" :key="sub.name" :value="sub.name">
                {{ sub.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Part Type</label>
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <Select :model-value="String(form.partTerminologyId)" @update:model-value="onPartTypeChange" :disabled="!form.subcategory">
                <SelectTrigger class="h-7 text-[13px] border-[#ddd]">
                  <SelectValue :placeholder="form.partName || 'Select part type'" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="pt in partsForSubcategory" :key="pt.partTerminologyId" :value="String(pt.partTerminologyId)">
                    {{ pt.partName }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span class="border border-[#3bbfa0] text-[#3bbfa0] text-[11px] font-mono px-2 py-0.5 rounded-sm shrink-0">{{ form.partTerminologyId || '—' }}</span>
          </div>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Brand</label>
          <Select :model-value="form.brandCode" @update:model-value="onBrandChange">
            <SelectTrigger class="h-7 text-[13px] border-[#ddd]">
              <SelectValue :placeholder="form.brandName || 'Select brand'" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="b in brands" :key="b.code" :value="b.code">
                {{ b.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Sub Brand</label>
          <Select v-model="form.subBrand">
            <SelectTrigger class="h-7 text-[13px] border-[#ddd]">
              <SelectValue :placeholder="form.subBrand || 'Select sub-brand'" />
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
          <Checkbox v-model:checked="form.universalPart" />
          <span class="text-[13px] text-[#444]">Universal Part</span>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <Checkbox v-model:checked="form.acesApplications" />
          <span class="text-[13px] text-[#444]">ACES Applications</span>
        </div>
        <div class="md:col-span-2">
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Quantity Per Application</label>
          <div class="flex flex-wrap items-center gap-3">
            <Input
              type="number"
              v-model.number="form.quantityPerApplication"
              class="w-20 h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]"
            />
            <Select v-model="form.quantityQualifier">
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
            <Select v-model="form.quantityUom">
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
    <div class="pb-5 mb-5 border-b border-[#eee]">
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Order Information</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Minimum Order Quantity</label>
          <Input type="number" model-value="1" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Effective Date</label>
          <Input type="date" v-model="form.createdAt" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Available Date</label>
          <Input type="date" v-model="form.createdAt" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">GTIN / UPC</label>
          <Input v-model="form.gtin" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0] font-mono" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Container Type</label>
          <Input v-model="form.containerType" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <div>
          <label class="block text-[12px] text-[#888] uppercase tracking-wider mb-1.5">Status</label>
          <Select v-model="form.status">
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

    <!-- Save -->
    <div class="flex justify-end">
      <button
        :disabled="!isDirty"
        class="flex items-center gap-1.5 text-[12px] px-4 py-1.5 rounded-sm transition-colors"
        :class="isDirty
          ? 'text-white bg-[#3bbfa0] hover:bg-[#2ea88a]'
          : 'text-[#aaa] bg-[#f0f0f0] cursor-not-allowed'"
        @click="save"
      >
        <Save class="h-3.5 w-3.5" />
        Save Changes
      </button>
    </div>
  </div>
</template>
