import { useAnimePathUrlStore } from '../store/anime-path-url'
import { useIinaStore } from '../store/iina'

import { useGetAnimeFileUrl } from './use-get-anime-file-url'

export async function useOpenMpv(event: HTMLAnchorElement) {
  const { getAnimePathUrl } = useAnimePathUrlStore()
  const animePathUrl = await getAnimePathUrl()

  if (animePathUrl === undefined) {
    console.error(`寻找本地文件路径失败, animePathUrl: ${animePathUrl}`)
    // eslint-disable-next-line no-alert
    alert('寻找本地文件路径失败, 确定服务器的文件夹中是否存在该番剧。\n也可以尝试使用目录别名')
    return
  }

  // 应该咩有人会拿 01 当作文件夹的名字吧，，
  const epId = event.textContent
  const markId = event.id.slice(4)

  if (epId === null) {
    console.error('获取 epId 失败')
    return
  }
  else if (markId === undefined) {
    console.error('获取 markId 失败')
    return
  }

  const movieUrl = await useGetAnimeFileUrl(animePathUrl || '', +epId)

  if (!movieUrl?.value) {
    console.error(`寻找本地文件失败, movieUrl: ${movieUrl}, epId: ${epId}`)
    return
  }

  openMpv(movieUrl.value, markId, epId)
}

function openMpv(url: string, markId: string, epId: string) {
  const { getIina } = useIinaStore()
  const iframe = document.createElement('iframe')
  const safeUrl = btoa(url).replace(/\//g, '_').replace(/\+/g, '-')

  if (getIina())
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

