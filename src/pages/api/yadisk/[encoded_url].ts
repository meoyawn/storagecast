import { decodeDiskURL } from "../../../app/YaDiskURL"
import { recursiveResource } from "../../../app/yadisk"
import { baseURL, mkUrl, reqURL } from "../../../lib/url"
import { type DiskDir, type DiskFile } from "../../../lib/yadisk/Resource"
import { type NextRequest } from "next/server"
import RSS from "rss"

const downloadUrl = (req: Request, { public_key, path }: DiskFile): string =>
  mkUrl({
    baseURL: baseURL(req.headers.get("host") ?? ""),
    path: "/api/yadisk/download",
    query: { public_key, path },
  })

const toRSS = (
  req: NextRequest,
  dir: DiskDir,
  files: ReadonlyArray<DiskFile>,
): RSS => {
  const img = files.find(({ media_type }) => media_type === "image")?.preview

  const custom_elements: Record<`itunes:${string}`, unknown>[] = [
    { "itunes:author": "Storagecast" },
  ]
  if (img) {
    custom_elements.push({ "itunes:image": { _attr: { href: img } } })
  }

  const rss = new RSS({
    custom_namespaces: { itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd" },
    custom_elements,

    title: dir.name,
    site_url: dir.public_url,
    feed_url: reqURL(req),
    pubDate: dir.created,
  })

  const audios = files.filter(({ media_type }) => media_type === "audio")
  let monotoneDate = Math.min(
    ...audios.map(({ created }) => Date.parse(created)),
  )

  for (const a of audios) {
    const { mime_type, path, resource_id, size } = a

    rss.item({
      /**
       * dir + name
       */
      title: path
        .replace(/\//g, " ")
        .replace(/\.[^/.]+$/, "")
        .trim(),

      date: new Date(monotoneDate),
      description: "",
      url: "",
      enclosure: {
        url: downloadUrl(req, a),
        type: path.endsWith(".m4b") ? "audio/x-m4a" : mime_type,
        size,
      },
      guid: resource_id,
    })

    monotoneDate += 1000
  }

  return rss
}

// noinspection JSUnusedGlobalSymbols
export const config = { runtime: "edge" }

export default async function RenderRSS(req: NextRequest): Promise<Response> {
  const encoded_url = req.nextUrl.searchParams.get("encoded_url")
  if (!encoded_url) throw new Error(`encoded_url is not in ${req.nextUrl}`)

  const diskURL = decodeDiskURL(encoded_url)

  if (!diskURL.startsWith("https")) {
    return new Response(`${diskURL} is not a Yandex Disk URL`, { status: 400 })
  }

  const { dir, files } = await recursiveResource(diskURL)
  const rss = toRSS(req, dir, files)
  return new Response(rss.xml(), {
    headers: { "content-type": "application/xml" },
  })
}
