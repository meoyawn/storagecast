export const encodeDiskURL = (url: string): string =>
  encodeURIComponent(Buffer.from(url).toString("base64"))

export const decodeDiskURL = (s: string): string =>
  Buffer.from(decodeURIComponent(s), "base64").toString()
