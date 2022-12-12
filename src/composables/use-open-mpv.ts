import { useGetAnimeFileUrl, useGetAnimePathUrl } from './use-get-anime-file-url'
import { useIINA } from './use-iina'
import { useLocalAlias } from './use-local-alias'

export async function useOpenMpv() {
  const alias = useLocalAlias()

  const { error: getAnimePathUrlError, animePathUrl } = await useGetAnimePathUrl(alias.value)

  return async (event: HTMLAnchorElement) => {
    if (getAnimePathUrlError) {
      console.error('寻找本地文件路径失败')
      return
    }

    // 应该咩有人会拿 01 当作文件夹的名字吧，，
    const epId = event.textContent
    const markId = event.id.slice(4)
    const movieUrl = await useGetAnimeFileUrl(animePathUrl, Number(epId || ''))

    if (!movieUrl) {
      console.error('视频地址为空')
      return
    }

    openMpv(movieUrl || '', markId, epId || '')
  }
}

function openMpv(url: string, markId: string, epId: string) {
  const iina = useIINA()
  const iframe = document.createElement('iframe')
  const safeUrl = btoa(url).replace(/\//g, '_').replace(/\+/g, '-')

  if (iina)
    iframe.src = `iina://weblink?url=${url}`
  else
    iframe.src = `mpv://play/${safeUrl}`

  document.body.appendChild(iframe)

  markEpIsSeen(markId, epId || '')
}

function markEpIsSeen(markId: string, epId: string) {
  const button = document.querySelector(`#Watched_${markId}`) as HTMLElement
  button?.click()

  console.info(`第 ${epId} 集标记为已看`)
}

