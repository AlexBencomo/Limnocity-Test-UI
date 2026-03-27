<script setup lang="ts">
import type { Part } from '@/data/parts'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

defineProps<{ part: Part }>()
</script>

<template>
  <div>
    <!-- Marketing Copy -->
    <div class="pb-5 mb-5 border-b border-[#eee]">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[12px] text-[#888] uppercase tracking-wider">Marketing Copy</span>
        <span class="text-[11px] text-[#aaa] border border-[#ddd] px-2 py-0.5 rounded-sm">Managed in Brand Settings</span>
      </div>
      <Textarea
        :model-value="part.descriptions.marketing"
        rows="4"
        placeholder="Marketing copy for this part..."
        class="text-[13px] border-[#ddd] focus:border-[#3bbfa0]"
      />
    </div>

    <!-- Descriptions -->
    <div>
      <div class="text-[12px] text-[#888] uppercase tracking-wider mb-4">Descriptions</div>

      <div class="pb-4 mb-4 border-b border-[#eee]">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-[12px] text-[#888] uppercase tracking-wider">Product Description — Short (EN)</label>
          <span class="text-[11px] text-[#aaa] border border-[#ddd] px-1.5 py-0.5 rounded-sm font-mono">SHO</span>
        </div>
        <Input :model-value="part.descriptions.short" class="h-7 text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
      </div>

      <div class="pb-4 mb-4 border-b border-[#eee]">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-[12px] text-[#888] uppercase tracking-wider">Product Description — Long (EN)</label>
          <span class="text-[11px] text-[#aaa] border border-[#ddd] px-1.5 py-0.5 rounded-sm font-mono">DES</span>
        </div>
        <Textarea :model-value="part.descriptions.long" rows="3" class="text-[13px] border-[#ddd] focus:border-[#3bbfa0]" />
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-[12px] text-[#888] uppercase tracking-wider">Application Summary (EN)</label>
          <span class="text-[11px] text-[#aaa] border border-[#ddd] px-1.5 py-0.5 rounded-sm font-mono">ASC</span>
        </div>
        <Textarea
          model-value="Auto-generated from ACES application data"
          rows="2"
          disabled
          class="text-[13px] border-[#ddd] bg-[#fafafa] text-[#aaa]"
        />
      </div>
    </div>
  </div>
</template>
