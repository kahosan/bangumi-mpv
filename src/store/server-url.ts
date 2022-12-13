import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useServerUrlStore = defineStore('serverUrl', () => {
  const serverUrl = useStorage<string[]>('server-url', [])

  const setServerUrl = (value: string[]) => {
    serverUrl.value = value
  }

  const getServerUrl = () => {
    return serverUrl.value
  }

  const removeServerUrl = (index: number) => {
    serverUrl.value = serverUrl.value.filter((_, i) => i !== index)
  }

  return {
    setServerUrl,
    getServerUrl,
    removeServerUrl,
  }
})
