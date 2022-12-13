import { ref } from 'vue'

import { matchSubFolderReg, matchVideoReg } from '../util/reg'

import { useServerUrlStore } from '../store/server-url'

import { suffixCheck } from '../util/suffix'
import { useAjax } from './use-ajax'
import { useGetAnimeList } from './use-get-anime-list'
import { useGetAnimeName } from './use-get-anime-name'

export async function useGetAnimePathUrl(alias?: string | null) {
  const { getServerUrl } = useServerUrlStore()
  const curAnimeName = useGetAnimeName()

  const animePathUrl = ref<string | undefined>()

  // 如果有别名，直接返回别名
  if (alias !== undefined && alias !== null) {
    animePathUrl.value = alias

    return animePathUrl
  }

  const animeList = await useGetAnimeList(getServerUrl())

  /**
   * {
   *   'serverUrl': [animeName, animeName, animeName],
   *   'serverUrl': [animeName, animeName, animeName],
   * }
   */
  for (const [serverUrl, childrenList] of Object.entries(animeList)) {
    for (const anime of childrenList) {
      if (anime === curAnimeName)
        animePathUrl.value = serverUrl + suffixCheck(curAnimeName)
    }
  }

  return animePathUrl
}

export async function useGetAnimeFileUrl(baseUrl: string, epId: number) {
  try {
    const url = new URL(`${epId}/`, baseUrl).href
    const dom = (await useAjax({ url })).responseText
    const movieUrl = ref<string | undefined>()

    // 匹配到了直接返回第一层的视频文件
    movieUrl.value = dom.match(matchVideoReg)?.[0]
    if (movieUrl.value) {
      movieUrl.value = new URL(movieUrl.value, url).href
      return movieUrl
    }

    movieUrl.value = await handleSubFolder(url)
    if (!movieUrl.value)
      throw new Error('没有找到视频文件')

    return movieUrl
  }
  catch (error) {
    console.error('useGetAnimeFileUrl', error)
    console.error('baseURL', baseUrl, 'epId', epId)
  }
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
