import { useAjax } from './use-ajax'
import { useGetAnimeList } from './use-get-anime-list'
import { useGetAnimeName } from './use-get-anime-name'
import { useServerUrl } from './use-server-url'

export async function useGetAnimePathUrl(alias?: string | null) {
  const serverUrls = useServerUrl()
  const curAnimeName = useGetAnimeName()
  let animePathUrl = ''
  let error = true

  const url = await getFileUrl(alias || '', '9')
  console.log(url)

  //   return alias

  const animeList = await useGetAnimeList(serverUrls)

  /**
   * {
   *   'serverUrl': [animeName, animeName, animeName],
   *   'serverUrl': [animeName, animeName, animeName],
   * }
   */
  for (const [serverUrl, childrenList] of Object.entries(animeList)) {
    for (const anime in childrenList) {
      if (anime === curAnimeName) {
        animePathUrl = serverUrl + curAnimeName
        error = false
      }
    }
  }

  return {
    animePathUrl,
    error,
  }
}

export async function getFileUrl(baseUrl: string, epId: string) {
  const url = new URL(epId, baseUrl).href
  const dom = (await useAjax({ url })).responseText
  let movieUrl: string | undefined

  movieUrl = dom.match(/(?<=<a href=").*(?=\.*(?<!\/|.ass)">)/)?.[0]
  if (movieUrl)
    return new URL(movieUrl[0], baseUrl).href

  movieUrl = await handleSubFolder(url)
  return movieUrl || 'asd'
}

async function handleSubFolder(url: string) {
  const reg = /(?<=<a href="(?!..\/)).*(?=">)/
  return ''
}
