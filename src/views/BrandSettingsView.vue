<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import { brands } from '@/data/brands'
import { ChevronDown, ChevronRight, Globe, Mail, Phone, User, Award, Truck, FileText, Tag, Edit2 } from 'lucide-vue-next'

const expandedBrand = ref<string | null>(null)
const activeTab = ref<Record<string, string>>({})

function toggleBrand(code: string) {
  if (expandedBrand.value === code) {
    expandedBrand.value = null
  } else {
    expandedBrand.value = code
    if (!activeTab.value[code]) {
      activeTab.value[code] = 'overview'
    }
  }
}

function setTab(code: string, tab: string) {
  activeTab.value[code] = tab
}

function getTab(code: string) {
  return activeTab.value[code] || 'overview'
}
</script>

<template>
  <div class="flex h-screen bg-white dark:bg-[#0f0f1a]">
    <AppSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <MobileHeader />
      <div class="flex-1 overflow-auto px-4 sm:px-10 py-6 sm:py-8">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-[14px] uppercase tracking-wider font-semibold text-[#1a1a2e] dark:text-[#e0e0e8]">Brand Settings</h1>
          <span class="text-[11px] text-[#aaa] dark:text-[#666]">{{ brands.length }} brands configured</span>
        </div>

        <!-- Brand cards -->
        <div class="space-y-3">
          <div
            v-for="brand in brands"
            :key="brand.code"
            class="border border-[#e8e8e8] dark:border-[#2a2a40] rounded-lg overflow-hidden transition-all duration-200"
            :class="expandedBrand === brand.code ? 'shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : 'hover:border-[#ccc] dark:hover:border-[#3a3a50]'"
          >
            <!-- Brand header row -->
            <button
              class="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 text-left bg-white dark:bg-[#181828] hover:bg-[#fafafa] dark:hover:bg-[#1e1e30] transition-colors cursor-pointer"
              @click="toggleBrand(brand.code)"
            >
              <component
                :is="expandedBrand === brand.code ? ChevronDown : ChevronRight"
                class="w-4 h-4 text-[#aaa] dark:text-[#666] shrink-0"
              />
              <div class="w-12 h-12 rounded-md bg-[#f0f0f0] dark:bg-[#1a1a2e] flex items-center justify-center shrink-0">
                <span class="text-[11px] font-bold text-[#888] dark:text-[#888899] tracking-wider">{{ brand.code }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-[13px] font-medium text-[#1a1a2e] dark:text-[#e0e0e8]">{{ brand.name }}</div>
                <div class="text-[11px] text-[#aaa] dark:text-[#666] mt-0.5">{{ brand.subBrands.length }} sub-brands · Est. {{ brand.founded }} · {{ brand.headquarters }}</div>
              </div>
              <div class="hidden sm:flex flex-wrap gap-1 max-w-[280px] justify-end">
                <span
                  v-for="sb in brand.subBrands.slice(0, 4)"
                  :key="sb"
                  class="text-[10px] text-[#888] dark:text-[#888899] bg-[#f5f5f5] dark:bg-[#1a1a2e] rounded px-1.5 py-0.5"
                >{{ sb }}</span>
                <span v-if="brand.subBrands.length > 4" class="text-[10px] text-[#aaa] dark:text-[#666] px-1 py-0.5">+{{ brand.subBrands.length - 4 }}</span>
              </div>
            </button>

            <!-- Expanded detail panel -->
            <div v-if="expandedBrand === brand.code" class="border-t border-[#eee] dark:border-[#2a2a40]">
              <!-- Tabs -->
              <div class="flex border-b border-[#eee] dark:border-[#2a2a40] px-4 sm:px-5 gap-0 overflow-x-auto">
                <button
                  v-for="tab in ['overview', 'marketing', 'pricing', 'distribution']"
                  :key="tab"
                  class="px-3 py-2.5 text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px cursor-pointer"
                  :class="getTab(brand.code) === tab
                    ? 'text-[#3bbfa0] border-[#3bbfa0] font-medium'
                    : 'text-[#999] dark:text-[#666] border-transparent hover:text-[#666] dark:hover:text-[#999]'"
                  @click="setTab(brand.code, tab)"
                >{{ tab }}</button>
              </div>

              <!-- Tab content -->
              <div class="px-4 sm:px-5 py-4">

                <!-- Overview Tab -->
                <div v-if="getTab(brand.code) === 'overview'" class="space-y-5">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899] mb-2">Brand Profile</div>
                      <p class="text-[13px] text-[#555] dark:text-[#aaa] leading-relaxed mb-4">{{ brand.description }}</p>
                      <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[12px] text-[#666] dark:text-[#999]">
                          <Globe class="w-3.5 h-3.5 text-[#aaa] dark:text-[#666]" />
                          <span>{{ brand.website }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-[12px] text-[#666] dark:text-[#999]">
                          <Tag class="w-3.5 h-3.5 text-[#aaa] dark:text-[#666]" />
                          <span>Code: <span class="font-mono font-medium">{{ brand.code }}</span></span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899] mb-2">Primary Contact</div>
                      <div class="bg-[#fafafa] dark:bg-[#1a1a2e] rounded-lg p-3 space-y-2">
                        <div class="flex items-center gap-2 text-[13px] text-[#444] dark:text-[#ccc]">
                          <User class="w-3.5 h-3.5 text-[#aaa] dark:text-[#666]" />
                          <span class="font-medium">{{ brand.contact.name }}</span>
                          <span class="text-[11px] text-[#aaa] dark:text-[#666]">{{ brand.contact.role }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-[12px] text-[#666] dark:text-[#999]">
                          <Mail class="w-3.5 h-3.5 text-[#aaa] dark:text-[#666]" />
                          <span>{{ brand.contact.email }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-[12px] text-[#666] dark:text-[#999]">
                          <Phone class="w-3.5 h-3.5 text-[#aaa] dark:text-[#666]" />
                          <span>{{ brand.contact.phone }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899] mb-2">Sub-brands</div>
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="sb in brand.subBrands"
                        :key="sb"
                        class="text-[12px] text-[#666] dark:text-[#999] bg-[#f0f0f0] dark:bg-[#1a1a2e] rounded-md px-2.5 py-1"
                      >{{ sb }}</span>
                    </div>
                  </div>
                  <div>
                    <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899] mb-2">Certifications</div>
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="cert in brand.certifications"
                        :key="cert"
                        class="flex items-center gap-1 text-[11px] text-[#3bbfa0] bg-[#e8f8f4] dark:bg-[#162e28] rounded-md px-2 py-1"
                      >
                        <Award class="w-3 h-3" />
                        {{ cert }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Marketing Tab -->
                <div v-if="getTab(brand.code) === 'marketing'" class="space-y-5">
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899]">Tagline</div>
                      <button class="flex items-center gap-1 text-[11px] text-[#3bbfa0] hover:text-[#2ea88c] cursor-pointer">
                        <Edit2 class="w-3 h-3" /> Edit
                      </button>
                    </div>
                    <div class="bg-[#fafafa] dark:bg-[#1a1a2e] rounded-lg p-3">
                      <p class="text-[14px] text-[#333] dark:text-[#ddd] font-medium italic">"{{ brand.marketingCopy.tagline }}"</p>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899]">Short Description</div>
                      <button class="flex items-center gap-1 text-[11px] text-[#3bbfa0] hover:text-[#2ea88c] cursor-pointer">
                        <Edit2 class="w-3 h-3" /> Edit
                      </button>
                    </div>
                    <div class="bg-[#fafafa] dark:bg-[#1a1a2e] rounded-lg p-3">
                      <p class="text-[13px] text-[#555] dark:text-[#aaa] leading-relaxed">{{ brand.marketingCopy.shortDescription }}</p>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899]">Long Description</div>
                      <button class="flex items-center gap-1 text-[11px] text-[#3bbfa0] hover:text-[#2ea88c] cursor-pointer">
                        <Edit2 class="w-3 h-3" /> Edit
                      </button>
                    </div>
                    <div class="bg-[#fafafa] dark:bg-[#1a1a2e] rounded-lg p-3">
                      <p class="text-[13px] text-[#555] dark:text-[#aaa] leading-relaxed">{{ brand.marketingCopy.longDescription }}</p>
                    </div>
                  </div>
                </div>

                <!-- Pricing Tab -->
                <div v-if="getTab(brand.code) === 'pricing'" class="space-y-4">
                  <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899] mb-1">Pricing Sheets</div>
                  <div
                    v-for="sheet in brand.pricingSheets"
                    :key="sheet.name"
                    class="bg-[#fafafa] dark:bg-[#1a1a2e] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div class="flex items-center gap-2 flex-1 min-w-0">
                      <FileText class="w-4 h-4 text-[#aaa] dark:text-[#666] shrink-0" />
                      <div>
                        <div class="text-[13px] font-medium text-[#444] dark:text-[#ccc]">{{ sheet.name }}</div>
                        <div class="text-[11px] text-[#aaa] dark:text-[#666]">Effective {{ sheet.effectiveDate }} · {{ sheet.currency }}</div>
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="pt in sheet.priceTypes"
                        :key="pt"
                        class="text-[10px] text-[#666] dark:text-[#999] bg-white dark:bg-[#0f0f1a] border border-[#e0e0e0] dark:border-[#2a2a40] rounded px-1.5 py-0.5"
                      >{{ pt }}</span>
                    </div>
                  </div>
                </div>

                <!-- Distribution Tab -->
                <div v-if="getTab(brand.code) === 'distribution'" class="space-y-4">
                  <div>
                    <div class="text-[11px] uppercase tracking-wider text-[#888] dark:text-[#888899] mb-2">Distribution Channels</div>
                    <div class="space-y-2">
                      <div
                        v-for="channel in brand.distributionChannels"
                        :key="channel"
                        class="flex items-center gap-2 bg-[#fafafa] dark:bg-[#1a1a2e] rounded-lg px-3 py-2"
                      >
                        <Truck class="w-3.5 h-3.5 text-[#aaa] dark:text-[#666]" />
                        <span class="text-[13px] text-[#555] dark:text-[#aaa]">{{ channel }}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
