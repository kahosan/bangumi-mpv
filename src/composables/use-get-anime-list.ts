import { ref } from 'vue'

import { useAjax } from './use-ajax'
import type { ErrorResponse } from './use-ajax'

export async function useGetAnimeList(urls: string[]): Promise<Record<string, string[]>> {
  const animeList = ref<Record<string, string[]>>({})

  for (const url of urls) {
    try {
      const res = await useAjax({ url })
      const indexDom = res.responseXML

      if (indexDom) {
        indexDom.querySelectorAll('a').forEach((item) => {
          if (animeList.value[url] === undefined)
            animeList.value[url] = []

          animeList.value[url].push(item.textContent?.slice(0, -1) || '')
        })
      }
    }
    catch (error) {
      const ajaxErr = error as ErrorResponse
      console.error(ajaxErr)
    }
  }

  return animeList.value
}
