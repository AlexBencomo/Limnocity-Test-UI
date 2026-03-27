<script setup lang="ts">
import { computed } from 'vue'
import type { Part } from '@/data/parts'
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import { Plus, Search, Car, Fuel, Settings, Gauge, MapPin } from 'lucide-vue-next'

const props = defineProps<{ part: Part }>()
const store = useCatalogStore()

const applications = computed(() => store.selectedPartApplications)

const appsByVehicle = computed(() => {
  const grouped = new Map<string, typeof applications.value>()
  for (const app of applications.value) {
    const key = `${app.year} ${app.make} ${app.model}`
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(app)
  }
  return grouped
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="relative w-64">
          <Search class="absolute left-2.5 top-1.5 h-3.5 w-3.5 text-[#aaa]" />
          <Input placeholder="Search applications..." class="pl-8 h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
        </div>
        <span class="border border-[#3bbfa0] text-[#3bbfa0] text-[11px] px-2 py-0.5 rounded-sm">{{ applications.length }} applications</span>
      </div>
      <button class="flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors">
        <Plus class="h-3.5 w-3.5" />
        Add Application
      </button>
    </div>

    <!-- Application Cards Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
      <div
        v-for="app in applications"
        :key="app.id"
        class="border border-[#eee] rounded-sm p-3 hover:border-[#3bbfa0] transition-colors cursor-pointer"
      >
        <!-- Vehicle header -->
        <div class="flex items-center justify-between mb-2">
          <span class="text-[13px] text-[#1a1a2e]">
            {{ app.year }} {{ app.make }} {{ app.model }}
          </span>
          <span class="text-[11px] text-[#aaa] border border-[#ddd] px-1.5 py-0.5 rounded-sm">Qty: {{ app.quantity }}</span>
        </div>

        <!-- Vehicle details grid -->
        <div class="grid grid-cols-2 gap-1.5 text-[11px]">
          <div class="flex items-center gap-1.5 text-[#888]">
            <Car class="h-3 w-3 shrink-0" />
            <span>{{ app.subModel || 'Base' }}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[#888]">
            <Settings class="h-3 w-3 shrink-0" />
            <span>{{ app.engineBase }}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[#888]">
            <Fuel class="h-3 w-3 shrink-0" />
            <span>{{ app.fuelType }}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[#888]">
            <Gauge class="h-3 w-3 shrink-0" />
            <span>{{ app.driveType }}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[#888]">
            <MapPin class="h-3 w-3 shrink-0" />
            <span>{{ app.position || 'N/A' }}</span>
          </div>
          <div class="flex items-center gap-1.5 text-[#888]">
            <span class="font-mono">ID: {{ app.baseVehicleId }}</span>
          </div>
        </div>

        <!-- Qualifiers -->
        <div v-if="app.qualifiers.length > 0" class="mt-2 flex flex-wrap gap-1">
          <span
            v-for="q in app.qualifiers"
            :key="q"
            class="text-[11px] text-[#888] border border-[#ddd] px-1.5 py-0.5 rounded-sm"
          >
            {{ q }}
          </span>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="applications.length === 0"
      class="flex flex-col items-center justify-center py-10"
    >
      <Car class="h-8 w-8 text-[#aaa] mb-3" />
      <p class="text-[13px] text-[#aaa]">No applications yet</p>
      <p class="text-[11px] text-[#aaa] mt-1">Add vehicle fitment data for this part.</p>
      <button class="mt-3 flex items-center gap-1 text-[12px] text-[#444] border border-[#ddd] px-3 py-1 rounded-sm hover:border-[#3bbfa0] transition-colors">
        <Plus class="h-3.5 w-3.5" />
        Add First Application
      </button>
    </div>
  </div>
</template>
