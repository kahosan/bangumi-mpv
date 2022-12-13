export function suffixCheck(suffix: string) {
  return suffix.endsWith('/') ? suffix : `${suffix}/`
}
