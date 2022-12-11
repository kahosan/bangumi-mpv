import { useStorage } from '@vueuse/core'

export function useLocalAlias() {
  const doc = document.URL
  const reg = /subject\/\d+/

  const alias = useStorage<string | null>(doc.match(reg)?.[0] || '', null)

  return alias
}
