<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Application } from '@/data/applications'
import { useCatalogStore } from '@/stores/catalog'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  open: boolean
  application?: Application | null
  partId: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const store = useCatalogStore()

const defaultForm = (): Omit<Application, 'id'> => ({
  partId: props.partId,
  baseVehicleId: 0,
  year: new Date().getFullYear(),
  make: '',
  model: '',
  subModel: '',
  engineBase: '',
  fuelType: 'Gas',
  driveType: 'FWD',
  bodyType: '',
  position: '',
  quantity: 1,
  qualifiers: [],
  notes: '',
})

const form = ref(defaultForm())
const qualifierInput = ref('')

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    if (props.application) {
      form.value = { ...props.application }
    } else {
      form.value = defaultForm()
    }
    qualifierInput.value = ''
  }
})

function addQualifier() {
  const q = qualifierInput.value.trim()
  if (q && !form.value.qualifiers.includes(q)) {
    form.value.qualifiers = [...form.value.qualifiers, q]
  }
  qualifierInput.value = ''
}

function removeQualifier(q: string) {
  form.value.qualifiers = form.value.qualifiers.filter((x) => x !== q)
}

function save() {
  if (props.application) {
    store.updateApplication(props.application.id, form.value)
  } else {
    const id = `app-${Date.now()}`
    store.addApplication({ ...form.value, id, partId: props.partId })
  }
  emit('update:open', false)
}

function remove() {
  if (props.application) {
    store.deleteApplication(props.application.id)
    emit('update:open', false)
  }
}

const isEditing = () => !!props.application
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle class="text-[15px]">{{ isEditing() ? 'Edit Application' : 'Add Application' }}</DialogTitle>
        <DialogDescription class="text-[12px] text-[#888]">
          {{ isEditing() ? 'Update vehicle fitment details.' : 'Add vehicle fitment data for this part.' }}
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4 py-2">
        <!-- Vehicle Info -->
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Year</label>
            <Input v-model.number="form.year" type="number" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Make</label>
            <Input v-model="form.make" placeholder="e.g. Honda" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Model</label>
            <Input v-model="form.model" placeholder="e.g. Accord" class="h-8 text-[13px] border-[#ddd]" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Sub Model</label>
            <Input v-model="form.subModel" placeholder="e.g. EX-L" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Body Type</label>
            <Input v-model="form.bodyType" placeholder="e.g. Sedan" class="h-8 text-[13px] border-[#ddd]" />
          </div>
        </div>

        <!-- Engine & Drive -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Engine</label>
            <Input v-model="form.engineBase" placeholder="e.g. 2.4L 4-cyl" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Fuel Type</label>
            <Input v-model="form.fuelType" placeholder="e.g. Gas" class="h-8 text-[13px] border-[#ddd]" />
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Drive Type</label>
            <Input v-model="form.driveType" placeholder="e.g. FWD" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Position</label>
            <Input v-model="form.position" placeholder="e.g. Rear" class="h-8 text-[13px] border-[#ddd]" />
          </div>
          <div>
            <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Quantity</label>
            <Input v-model.number="form.quantity" type="number" min="1" class="h-8 text-[13px] border-[#ddd]" />
          </div>
        </div>

        <!-- Base Vehicle ID -->
        <div>
          <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Base Vehicle ID</label>
          <Input v-model.number="form.baseVehicleId" type="number" class="h-8 text-[13px] border-[#ddd] w-40" />
        </div>

        <!-- Qualifiers -->
        <div>
          <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Qualifiers</label>
          <div class="flex flex-wrap gap-1 mb-2" v-if="form.qualifiers.length">
            <span
              v-for="q in form.qualifiers"
              :key="q"
              class="inline-flex items-center gap-1 text-[11px] text-[#666] border border-[#ddd] px-2 py-0.5 rounded-sm"
            >
              {{ q }}
              <button class="text-[#aaa] hover:text-[#666]" @click="removeQualifier(q)">&times;</button>
            </span>
          </div>
          <div class="flex gap-2">
            <Input
              v-model="qualifierInput"
              placeholder="Add qualifier..."
              class="h-8 text-[13px] border-[#ddd] flex-1"
              @keydown.enter.prevent="addQualifier"
            />
            <button
              type="button"
              class="text-[12px] text-[#444] border border-[#ddd] px-3 rounded-sm hover:border-[#3bbfa0] transition-colors h-8"
              @click="addQualifier"
            >Add</button>
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label class="text-[11px] text-[#888] uppercase tracking-wider mb-1 block">Notes</label>
          <textarea
            v-model="form.notes"
            placeholder="Optional notes..."
            rows="2"
            class="w-full rounded-sm border border-[#ddd] px-3 py-2 text-[13px] focus:border-[#3bbfa0] focus:outline-none resize-none"
          />
        </div>
      </div>

      <DialogFooter class="flex items-center gap-2">
        <button
          v-if="isEditing()"
          type="button"
          class="mr-auto flex items-center gap-1 text-[12px] text-red-500 hover:text-red-600 transition-colors"
          @click="remove"
        >
          <Trash2 class="h-3.5 w-3.5" />
          Delete
        </button>
        <button
          type="button"
          class="text-[12px] text-[#666] border border-[#ddd] px-4 py-1.5 rounded-sm hover:bg-[#f8f8f8] transition-colors"
          @click="emit('update:open', false)"
        >Cancel</button>
        <button
          type="button"
          class="text-[12px] text-white bg-[#3bbfa0] px-4 py-1.5 rounded-sm hover:bg-[#2ea88a] transition-colors"
          @click="save"
        >{{ isEditing() ? 'Save Changes' : 'Add Application' }}</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
