import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useLocalAliasStore = defineStore('localAlias', () => {
  const doc = document.URL
  const reg = /subject\/\d+/
  const alias = useStorage<string | null>(doc.match(reg)?.[0] || '', null)

  const setAlias = (value: string | null) => {
    alias.value = value
  }

  const getAlias = () => {
    return alias.value
  }

  return {
    setAlias,
    getAlias,
  }
})
