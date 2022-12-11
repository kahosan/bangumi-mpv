import { GM_xmlhttpRequest } from '$'
import type { XhrRequest } from '$'

interface Response {
  readonly responseHeaders: string
  /**
   * Unsent = 0,
   * Opened = 1,
   * HeadersReceived = 2,
   * Loading = 3,
   * Done = 4
   */
  readonly readyState: 0 | 1 | 2 | 3 | 4
  readonly response: any
  readonly responseText: string
  readonly responseXML: Document | null
  readonly status: number
  readonly statusText: string
}

export type ErrorResponse = Response & {
  readonly error: string
}

export function useAjax(options: XhrRequest): Promise<Response> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      ...options,
      onload(res) {
        resolve(res)
      },
      onerror(err) {
        reject(err)
      },
    })
  })
}
