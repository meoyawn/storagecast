export const mkUrl = ({ baseURL, path, query }: {
  baseURL: string,
  path: string,
  query: Partial<Record<string, string | number | boolean>>,
}): string => {
  let ret = baseURL + path

  Object.entries(query).forEach(([k, v], i) => {
    if (v) {
      const prefix = i === 0 ? "?" : "&";
      ret += `${prefix}${k}=${encodeURIComponent(v)}`
    }
  })

  return ret
}
