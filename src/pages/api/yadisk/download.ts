import { NextApiRequest, NextApiResponse } from "next"

import { publicResourceDownload } from "../../../lib/yadisk/api"

export default async function Download(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { public_key, path } = req.query
  const { href } = await publicResourceDownload(
    public_key as string,
    path as string,
  )
  res.writeHead(302, { location: href }).end()
}
