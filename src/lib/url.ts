import { type NextRequest } from "next/server"

export const mkUrl = ({
  baseURL,
  path,
  query,
}: {
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

export const baseURL = (host: string): string =>
  host.includes("localhost") || host.includes("127.0.0.1")
    ? `http://${host}`
    : `https://${host}`

export const reqURL = ({ headers, url }: NextRequest): string =>
  mkUrl({
    baseURL: baseURL(headers.get("host") ?? ""),
    path: url ?? "",
  })
