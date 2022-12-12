export function useReset(fn: (event: HTMLAnchorElement) => void) {
  const episodeUlEle = document.querySelector('.prg_list')

  if (!episodeUlEle)
    return

  for (const episodeLiEle of episodeUlEle.children) {
    const epATag = episodeLiEle.children[0] as HTMLAnchorElement

    epATag.href = 'javascript:void(0)'
    epATag.addEventListener('click', function () {
      fn(this)
    })
  }
}
