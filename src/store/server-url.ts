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

  const removeServerUrl = (targatUrl: string) => {
    serverUrl.value = serverUrl.value.filter(url => url !== targatUrl)
  }

  return {
    setServerUrl,
    getServerUrl,
    removeServerUrl,
  }
})
