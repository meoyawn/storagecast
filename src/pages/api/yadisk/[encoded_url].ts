import { NextApiRequest, NextApiResponse } from "next"
import nc from 'next-connect'
import RSS from "rss"

import { recursiveResource } from "../../../app/yadisk"
import { decodeDiskURL } from "../../../app/YaDiskURL"
import { DiskDir, DiskFile } from "../../../lib/yadisk/Resource"
import { reqURL } from "../../../lib/url"

const toRSS = (req: NextApiRequest, dir: DiskDir, files: ReadonlyArray<DiskFile>) => {
  const img = files.find(({ media_type }) => media_type === "image")?.preview

  const rss = new RSS({
    custom_namespaces: {
      itunes: 'https://www.itunes.com/dtds/podcast-1.0.dtd',
    },
    custom_elements: [
      { 'itunes:author': 'Storagecast' },
      { 'itunes:image': { _attr: { href: img } } },
    ],

    title: dir.name,
    site_url: dir.public_url,
    feed_url: reqURL(req),
    pubDate: dir.created,
  })

  const audios = files.filter(({ media_type }) => media_type === "audio")
  let monotoneDate = Math.min(...audios.map(({ created }) => Date.parse(created)))

  for (const { mime_type, path, file, resource_id, size } of audios) {
    rss.item({
      title: path.replace(/\//g, " ").replace(/\.[^/.]+$/, "").trim(),
      date: new Date(monotoneDate),
      description: '',
      url: '',
      enclosure: {
        url: file,
        type: mime_type,
        size,
      },
      guid: resource_id,
    })

    monotoneDate += 1000
  }

  return rss
}

// noinspection JSUnusedGlobalSymbols
export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const { encoded_url } = req.query
    const diskURL = decodeDiskURL(encoded_url as string)

    if (diskURL.startsWith("https")) {
      const { dir, files } = await recursiveResource(diskURL)
      const rss = toRSS(req, dir, files)
      res
        .writeHead(200, { 'content-type': 'application/xml' })
        .end(rss.xml())
    } else {
      res
        .writeHead(400)
        .end(`${diskURL} is not a Yandex Disk URL`)
    }
  })
