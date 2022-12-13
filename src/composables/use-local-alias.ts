import { useStorage } from '@vueuse/core'

// TODO use global state management

const doc = document.URL
const reg = /subject\/\d+/
const alias = useStorage<string | null>(doc.match(reg)?.[0] || '', null)

export function useLocalAlias() {
  return alias
}
