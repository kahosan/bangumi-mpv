import { useGetAnimeList } from './use-get-anime-list'

export function useGetAnimeFileUrl(urls: string[]) {
  const animeList = useGetAnimeList(urls)

  animeList.then((anime) => {
    console.log(anime.value)
  })
}
