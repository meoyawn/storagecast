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
