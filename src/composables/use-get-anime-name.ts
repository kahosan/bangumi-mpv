export function useGetAnimeName() {
  return document.querySelector('#infobox')?.children[0]?.textContent?.slice(5)
}
