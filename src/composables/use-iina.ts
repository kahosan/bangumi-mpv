import { useStorage } from '@vueuse/core'

const iinaStorage = useStorage('open-with-iina', false)

export function useIINA() {
  return iinaStorage
}
