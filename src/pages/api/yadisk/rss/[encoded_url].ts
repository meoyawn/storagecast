import { NextApiRequest, NextApiResponse } from "next"
import nc from 'next-connect'
import RSS from "rss"

import { recursiveResource } from "../../../../app/yadisk";
import { decodeDiskURL, enclosure } from "../../../../app/YaDiskURL";
import { DiskDir, DiskFile } from "../../../../lib/yadisk/Resource";

const title = (path: string): string =>
  path.replaceAll("/", " ").trim()

function toRSS(req: NextApiRequest, dir: DiskDir, files: ReadonlyArray<DiskFile>) {
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
    description: dir.public_url,
    site_url: 'https://disk.yandex.ru/',
    feed_url: req.url!,
    pubDate: dir.created,
  })

  for (const { public_key, media_type, mime_type, path, created } of files) {
    if (media_type === 'audio') {
      rss.item({
        title: title(path),
        enclosure: {
          url: enclosure(req.headers.host!, public_key, path),
          type: mime_type,
        },
        date: created,

        description: '',
        url: '',
      })
    }
  }

  return rss
}

// noinspection JSUnusedGlobalSymbols
export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {

    const { encoded_url } = req.query
    const diskURL = decodeDiskURL(encoded_url as string)
    const { dir, files } = await recursiveResource(diskURL)

    res.setHeader('content-type', 'application/xml')
    res.send(toRSS(req, dir, files).xml())
  })
