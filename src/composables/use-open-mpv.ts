import { useStorage } from '@vueuse/core'
import { useGetAnimeFileUrl } from './use-get-anime-file-url'

export function useOpenMpv() {
  const serverUrl = useStorage<string[]>('server-url', [])
  const animeFileUrl = useGetAnimeFileUrl(serverUrl.value)

  return () => {}
}
