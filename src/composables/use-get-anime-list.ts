import { ref } from 'vue'
import { useAjax } from './use-ajax'

export async function useGetAnimeList(urls: string[]) {
  const animeList = ref<string[]>([])

  for (const url of urls) {
    const res = await useAjax({ url })
    const indexDom = res.responseXML

    if (indexDom) {
      indexDom.querySelectorAll('a').forEach((item) => {
        animeList.value.push(item.textContent?.slice(0, -1) || '')
      })
    }
  }

  return animeList
}
