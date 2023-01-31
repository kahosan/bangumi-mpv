import { useAjax } from './use-ajax'

export async function useGetAnimeList(urls: string[]): Promise<Record<string, string[]>> {
  const animeList: Record<string, string[]> = {}

  for (const url of urls) {
    try {
      const res = await useAjax({ url })
      const indexDom = res.responseXML

      if (indexDom) {
        indexDom.querySelectorAll('a').forEach((item) => {
          if (animeList[url] === undefined)
            animeList[url] = []

          animeList[url].push(item.textContent?.slice(0, -1) || '')
        })
      }
    }
    catch (error) {
      // eslint-disable-next-line no-alert
      alert('请求服务器错误，详情在 console')
      console.error('useGetAnimeList', error)

      throw new Error('ajax error')
    }
  }

  return animeList
}
