<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { brands } from '@/data/brands'
</script>

<template>
  <div class="flex h-screen bg-white">
    <AppSidebar />
    <div class="flex-1 overflow-auto px-10 py-8">
      <h1 class="text-[14px] uppercase tracking-wider font-semibold text-[#1a1a2e] mb-6">Brand Settings</h1>

      <!-- Brands table -->
      <div class="mb-10">
        <div class="border-b border-[#eee] pb-2 mb-0">
          <span class="text-[12px] uppercase tracking-wider text-[#888]">Brands &amp; Sub-brands</span>
        </div>
        <table class="w-full">
          <thead>
            <tr class="border-b border-[#eee]">
              <th class="text-left text-[11px] uppercase tracking-wider text-[#888] font-normal py-2 w-24">Code</th>
              <th class="text-left text-[11px] uppercase tracking-wider text-[#888] font-normal py-2">Brand Name</th>
              <th class="text-left text-[11px] uppercase tracking-wider text-[#888] font-normal py-2">Sub-brands</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="brand in brands" :key="brand.code" class="border-b border-[#eee]">
              <td class="py-2 text-[13px] font-mono font-medium text-[#1a1a2e]">{{ brand.code }}</td>
              <td class="py-2 text-[13px] text-[#444]">{{ brand.name }}</td>
              <td class="py-2">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="sb in brand.subBrands"
                    :key="sb"
                    class="text-[11px] text-[#888] bg-[#f5f5f5] rounded px-1.5 py-0.5"
                  >{{ sb }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Coming soon sections -->
      <div class="flex gap-12">
        <div>
          <div class="border-b border-[#eee] pb-2 mb-2">
            <span class="text-[12px] uppercase tracking-wider text-[#888]">Marketing Copy</span>
          </div>
          <p class="text-[13px] text-[#aaa]">Manage marketing copy templates for your brands. Coming soon.</p>
        </div>
        <div>
          <div class="border-b border-[#eee] pb-2 mb-2">
            <span class="text-[12px] uppercase tracking-wider text-[#888]">Pricing Sheets</span>
          </div>
          <p class="text-[13px] text-[#aaa]">Configure pricing sheets and price types. Coming soon.</p>
        </div>
      </div>
    </div>
  </div>
</template>
