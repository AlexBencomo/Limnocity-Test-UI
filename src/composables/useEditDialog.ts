import { ref } from 'vue'

export function useEditDialog<T>() {
  const dialogOpen = ref(false)
  const editingItem = ref<T | null>(null) as { value: T | null }
  const editingIndex = ref(-1)

  function openAdd() {
    editingItem.value = null
    editingIndex.value = -1
    dialogOpen.value = true
  }

  function openEdit(item: T, index: number) {
    editingItem.value = item
    editingIndex.value = index
    dialogOpen.value = true
  }

  const isEditing = () => editingItem.value !== null

  return { dialogOpen, editingItem, editingIndex, openAdd, openEdit, isEditing }
}
