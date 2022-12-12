import { useGetAnimePathUrl } from './use-get-anime-file-url'
import { useLocalAlias } from './use-local-alias'

export async function useOpenMpv() {
  const localAlias = useLocalAlias()
  const { error: getAnimePathUrlError, animePathUrl } = await useGetAnimePathUrl(localAlias.value)

  return (event: HTMLAnchorElement) => {
    if (getAnimePathUrlError) {
      console.error('寻找本地文件路径失败')
      return
    }

    // 应该咩有人会拿 01 当作文件夹的名字吧，，
    const epId = event.textContent
    const markId = event.id.slice(4)

    console.log('epId', epId)
  }
}
