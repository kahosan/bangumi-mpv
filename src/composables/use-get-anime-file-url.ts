import { matchSubFolderReg, matchVideoReg } from '../util/reg'

import { useAjax } from './use-ajax'
import { useGetAnimeList } from './use-get-anime-list'
import { useGetAnimeName } from './use-get-anime-name'
import { useServerUrl } from './use-server-url'

export async function useGetAnimePathUrl(alias?: string | null) {
  const serverUrls = useServerUrl()
  const curAnimeName = useGetAnimeName()
  let animePathUrl = ''
  let error = true

  // 如果有别名，直接返回别名
  if (alias !== undefined && alias !== null) {
    return {
      animePathUrl: alias,
      error: false,
    }
  }

  const animeList = await useGetAnimeList(serverUrls)

  /**
   * {
   *   'serverUrl': [animeName, animeName, animeName],
   *   'serverUrl': [animeName, animeName, animeName],
   * }
   */
  for (const [serverUrl, childrenList] of Object.entries(animeList)) {
    for (const anime of childrenList) {
      if (anime === curAnimeName) {
        // TODO 弄个工具函数处理后缀
        animePathUrl = serverUrl + (curAnimeName.endsWith('/') ? curAnimeName : `${curAnimeName}/`)
        error = false
      }
    }
  }

  return {
    animePathUrl,
    error,
  }
}

export async function useGetAnimeFileUrl(baseUrl: string, epId: number) {
  try {
    const url = new URL(`${epId}/`, baseUrl).href
    const dom = (await useAjax({ url })).responseText
    let movieUrl: string | undefined

    // 匹配到了直接返回第一层的视频文件
    movieUrl = dom.match(matchVideoReg)?.[0]
    if (movieUrl)
      return new URL(movieUrl, url).href

    movieUrl = await handleSubFolder(url)
    if (!movieUrl)
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
