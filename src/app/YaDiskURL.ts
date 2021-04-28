export const encodeDiskURL = (url: string): string =>
  encodeURIComponent(btoa(url))

export const decodeDiskURL = (s: string): string =>
  typeof window === 'undefined'
    ? Buffer.from(decodeURIComponent(s), 'base64').toString()
    : atob(decodeURIComponent(s))
