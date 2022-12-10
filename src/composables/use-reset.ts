import { onMounted } from 'vue'

export function useReset(fn: () => void) {
  const episodeUl = document.querySelector('.prg_list')

  onMounted(() => {
    if (!episodeUl)
      return

    for (const episodeLi of episodeUl.children) {
      const epATag = episodeLi.children[0] as HTMLLinkElement
      epATag.href = 'javascript:void(0)'
      epATag.addEventListener('click', fn)
    }
  })
}
