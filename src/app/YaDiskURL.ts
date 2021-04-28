export const encodeDiskURL = (url: string): string =>
  encodeURIComponent(btoa(url))

export const decodeDiskURL = (s: string): string =>
  atob(decodeURIComponent(s))
