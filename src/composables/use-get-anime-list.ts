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
      console.error('useGetAnimeList', error)
    }
  }

  return animeList
}
