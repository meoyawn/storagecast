import { NextApiRequest, NextApiResponse } from "next"
import RSS from "rss"

import { recursiveResource } from "../../../app/yadisk"
import { decodeDiskURL } from "../../../app/YaDiskURL"
import { mkUrl, reqURL } from "../../../lib/url"
import { DiskDir, DiskFile } from "../../../lib/yadisk/Resource"

const downloadUrl = ({ public_key, path }: DiskFile): string =>
  mkUrl({
    baseURL: process.env.NEXT_PUBLIC_SITE ?? "",
    path: "/api/yadisk/download",
    query: {
      public_key,
      path,
    },
  })

const toRSS = (
  req: NextApiRequest,
  dir: DiskDir,
  files: ReadonlyArray<DiskFile>,
) => {
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
      title: path
        .replace(/\//g, " ")
        .replace(/\.[^/.]+$/, "")
        .trim(),
      date: new Date(monotoneDate),
      description: "",
      url: "",
      enclosure: {
        url: downloadUrl(a),
        type: path.endsWith(".m4b") ? "audio/mp4" : mime_type,
        size,
      },
      guid: resource_id,
    })

    monotoneDate += 1000
  }

  return rss
}

// noinspection JSUnusedGlobalSymbols
export default async function EncodedURL(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { encoded_url } = req.query
  const diskURL = decodeDiskURL(encoded_url as string)

  if (diskURL.startsWith("https")) {
    const { dir, files } = await recursiveResource(diskURL)
    const rss = toRSS(req, dir, files)
    res.writeHead(200, { "content-type": "application/xml" }).end(rss.xml())
  } else {
    res.writeHead(400).end(`${diskURL} is not a Yandex Disk URL`)
  }
}
