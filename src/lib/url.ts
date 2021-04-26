export const mkUrl = ({ baseURL, path, query }: {
  baseURL: string
  path: string
  query: Partial<Record<string, string | number | boolean>>
}): string => {
  let ret = baseURL + path

  let firstVal = true
  for (const k in query) {
    const v = query[k]
    if (v !== undefined && v !== null) {
      const prefix = firstVal ? "?" : "&"
      ret += `${prefix}${k}=${encodeURIComponent(v)}`
      firstVal = false
    }
  }

  return ret
}
