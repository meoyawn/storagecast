import { publicResource } from "../lib/yadisk/api"
import { DiskDir, DiskFile, DiskItem } from "../lib/yadisk/Resource"

interface RecursiveDir {
  dir: DiskDir
  files: ReadonlyArray<DiskFile>
}

const dirFiles = ({
  path,
  public_key,
  type,
}: DiskItem): Promise<ReadonlyArray<DiskFile>> =>
  type === "dir"
    ? recursiveResource(public_key, path).then(({ files }) => files)
    : Promise.resolve([])

export const recursiveResource = async (
  url: string,
  path?: string,
): Promise<RecursiveDir> => {
  const dir = await publicResource(url, path)

  const { items } = dir._embedded
  const deep = await Promise.all(items.map(dirFiles)).then(x => x.flat())
  const flat = items.flatMap(x => (x.type === "file" ? [x] : []))

  return { dir, files: deep.concat(flat) }
}
