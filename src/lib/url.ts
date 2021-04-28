import { IncomingMessage } from "http";

export const mkUrl = ({ baseURL, path, query }: {
  baseURL: string
  path: string
  query?: Partial<Record<string, string | number | boolean>>
}): string => {
  let ret = baseURL + path

  if (query) {
    let firstVal = true
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) {
        const prefix = firstVal ? "?" : "&"
        ret += `${prefix}${k}=${encodeURIComponent(v)}`
        firstVal = false
      }
    }
  }

  return ret
}

// noinspection HttpUrlsUsage
const base = (host: string): string =>
  host.startsWith("local")
    ? `http://${host}`
    : `https://${host}`

export const reqURL = ({ headers, url }: IncomingMessage): string =>
  mkUrl({
    baseURL: base(headers.host ?? ''),
    path: url ?? '',
  })
