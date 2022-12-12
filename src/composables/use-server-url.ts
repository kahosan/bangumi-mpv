import { useStorage } from '@vueuse/core'

const storage = useStorage<string[]>('server-url', [])

export function useServerUrl() {
  return storage.value
}
