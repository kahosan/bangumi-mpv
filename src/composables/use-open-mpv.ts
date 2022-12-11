import { useGetAnimePathUrl } from './use-get-anime-file-url'
import { useLocalAlias } from './use-local-alias'

export function useOpenMpv() {
  const localAlias = useLocalAlias()
  const animeFileUrl = useGetAnimePathUrl(localAlias.value)

  return () => {}
}
