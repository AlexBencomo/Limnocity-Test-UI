import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const dark = ref(false)

  function init() {
    const saved = localStorage.getItem('limnocity-theme')
    if (saved === 'dark') {
      dark.value = true
    } else if (saved === null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dark.value = true
    }
    applyClass()
  }

  function toggle() {
    dark.value = !dark.value
    localStorage.setItem('limnocity-theme', dark.value ? 'dark' : 'light')
    applyClass()
  }

  function applyClass() {
    document.documentElement.classList.toggle('dark', dark.value)
  }

  watch(dark, applyClass)

  return { dark, init, toggle }
})
