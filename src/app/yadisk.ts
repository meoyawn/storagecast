import { mkUrl } from "../lib/url";
import { File, Item, Resource } from "../lib/yadisk/Resource";

const BASE_URL = 'https://cloud-api.yandex.net'

const publicResource = async (url: string, path: string | undefined): Promise<Resource> => {
  const r = await fetch(mkUrl({
    baseURL: BASE_URL,
    path: "/v1/disk/public/resources",
    query: {
      public_key: url,
      limit: Number.MAX_SAFE_INTEGER,
      preview_crop: true,
      preview_size: "XL",
      path,
    }
  }))
  return JSON.parse(await r.text())
}

interface RecursiveDir {
  dir: Resource
  files: ReadonlyArray<File>
}

const dirFiles = ({ path, public_key, type }: Item): Promise<ReadonlyArray<File>> =>
  type === "dir"
    ? recursiveResource(public_key, path).then(({ files }) => files)
    : Promise.resolve([])

export const recursiveResource = async (url: string, path?: string): Promise<RecursiveDir> => {
  const dir = await publicResource(url, path)

  const { items } = dir._embedded
  const deep = await Promise.all(items.map(dirFiles)).then(x => x.flat())
  const flat = items.flatMap(x => x.type === "file" ? [x] : [])

  return { dir, files: deep.concat(flat) }
}
