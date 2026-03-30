<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { Part } from '@/data/parts'
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save } from 'lucide-vue-next'

const props = defineProps<{ part: Part }>()
const store = useCatalogStore()

const form = reactive({
  marketing: '',
  short: '',
  long: '',
})

function loadForm() {
  form.marketing = props.part.descriptions.marketing
  form.short = props.part.descriptions.short
  form.long = props.part.descriptions.long
}

watch(() => props.part.id, loadForm, { immediate: true })

const isDirty = computed(() =>
  form.marketing !== props.part.descriptions.marketing ||
  form.short !== props.part.descriptions.short ||
  form.long !== props.part.descriptions.long
)

function save() {
  store.updatePart(props.part.id, {
    descriptions: { marketing: form.marketing, short: form.short, long: form.long },
  })
}
</script>

<template>
  <div>
    <!-- Marketing Copy -->
    <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Marketing Copy</span>
        <span class="text-[11px] text-[#aaa] dark:text-[#666] border border-[#ddd] dark:border-[#2a2a40] px-2 py-0.5 rounded-sm">Managed in Brand Settings</span>
      </div>
      <Textarea
        v-model="form.marketing"
        rows="4"
        placeholder="Marketing copy for this part..."
        class="text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]"
      />
    </div>

    <!-- Descriptions -->
    <div class="pb-5 mb-5 border-b border-[#eee] dark:border-[#2a2a40]">
      <div class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider mb-4">Descriptions</div>

      <div class="pb-4 mb-4 border-b border-[#eee] dark:border-[#2a2a40]">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Product Description — Short (EN)</label>
          <span class="text-[11px] text-[#aaa] dark:text-[#666] border border-[#ddd] dark:border-[#2a2a40] px-1.5 py-0.5 rounded-sm font-mono">SHO</span>
        </div>
        <Input v-model="form.short" class="h-7 text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
      </div>

      <div class="pb-4 mb-4 border-b border-[#eee] dark:border-[#2a2a40]">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Product Description — Long (EN)</label>
          <span class="text-[11px] text-[#aaa] dark:text-[#666] border border-[#ddd] dark:border-[#2a2a40] px-1.5 py-0.5 rounded-sm font-mono">DES</span>
        </div>
        <Textarea v-model="form.long" rows="3" class="text-[13px] border-[#ddd] dark:border-[#2a2a40] focus:border-[#3bbfa0]" />
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-[12px] text-[#888] dark:text-[#888899] uppercase tracking-wider">Application Summary (EN)</label>
          <span class="text-[11px] text-[#aaa] dark:text-[#666] border border-[#ddd] dark:border-[#2a2a40] px-1.5 py-0.5 rounded-sm font-mono">ASC</span>
        </div>
        <Textarea
          model-value="Auto-generated from ACES application data"
          rows="2"
          disabled
          class="text-[13px] border-[#ddd] dark:border-[#2a2a40] bg-[#fafafa] dark:bg-[#181828] text-[#aaa] dark:text-[#666]"
        />
      </div>
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
