import { matchSubFolderReg, matchVideoReg } from '../util/reg'
import { suffixCheck } from '../util/suffix'

import { useServerUrlStore } from '../store/server-url'

import { useAjax } from './use-ajax'
import { useGetAnimeList } from './use-get-anime-list'
import { useGetAnimeName } from './use-get-anime-name'

export async function useGetAnimePathUrl(alias?: string | null) {
  const { getServerUrl } = useServerUrlStore()
  const curAnimeName = useGetAnimeName()

  // 如果有别名，直接返回别名
  if (alias !== undefined && alias !== null)
    return alias

  const animeList = await useGetAnimeList(getServerUrl())

  /**
   * {
   *   'serverUrl': [animeName, animeName, animeName],
   *   'serverUrl': [animeName, animeName, animeName],
   * }
   */
  for (const [serverUrl, animeNameList] of Object.entries(animeList)) {
    for (const anime of animeNameList) {
      if (anime === curAnimeName) {
        const animePathUrl = serverUrl + suffixCheck(curAnimeName)
        return animePathUrl
      }
    }
  }
}

export async function useGetAnimeFileUrl(baseUrl: string, epId: number) {
  const url = new URL(`${epId}/`, baseUrl).href

  const movieUrl = await handleSubFolder(url)

  return movieUrl
}

// 递归往子文件夹里找视频文件，返回找到的第一个视频文件的 url
async function handleSubFolder(url: string): Promise<string | undefined> {
  try {
    const dom = (await useAjax({ url })).responseText
    const movieUrl = dom.match(matchVideoReg)?.[0]
    if (movieUrl)
      return new URL(movieUrl, url).href

    const subFolderList = dom.match(matchSubFolderReg)
    if (subFolderList) {
      for (const subFolder of subFolderList) {
        if (subFolder)
          return await handleSubFolder(new URL(subFolder, url).href)
      }
    }
  }
  catch (error) {
    console.error('handleSubFolder', error)
  }
}
