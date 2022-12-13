import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useIinaStore = defineStore('iina', () => {
  const iina = useStorage('open-with-iina', false)

  const getIina = () => {
    return iina.value
  }

  const toggleIina = () => {
    iina.value = !iina.value
  }

  return {
    getIina,
    toggleIina,
  }
})
