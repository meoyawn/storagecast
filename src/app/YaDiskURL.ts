import { mkUrl } from "../lib/url";

export const encodeDiskURL = (url: string): string =>
  encodeURIComponent(btoa(url))

export const decodeDiskURL = (s: string): string =>
  atob(decodeURIComponent(s))

export const enclosure = (host: string, public_key: string, path: string): string =>
  mkUrl({
    baseURL: `${host.startsWith('local') ? "http" : 'https'}://${host}`,
    path: '/api/yadisk/download',
    query: { public_key, path, }
  })
