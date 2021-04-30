import { mkUrl } from "../url";
import { DiskResource } from "./Resource";

const BASE_URL = 'https://cloud-api.yandex.net'

export const publicResource = async (url: string, path: string | undefined): Promise<DiskResource> => {
  const r = await fetch(mkUrl({
    baseURL: BASE_URL,
    path: "/v1/disk/public/resources",
    query: {
      public_key: url,
      limit: Number.MAX_SAFE_INTEGER,
      preview_crop: true,
      preview_size: "XXXL",
      path,
    }
  }))
  return JSON.parse(await r.text())
}

export const publicResourceDownload = async (public_key: string, path: string): Promise<{ href: string }> => {
  const r = await fetch(mkUrl({
    baseURL: BASE_URL,
    path: "/v1/disk/public/resources/download",
    query: {
      public_key,
      path,
    }
  }))
  return JSON.parse(await r.text())
}
