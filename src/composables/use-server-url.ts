import { useStorage } from '@vueuse/core'

export function useServerUrl() {
  return useStorage<string[]>('server-url', []).value
}
