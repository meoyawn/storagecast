import { NextApiRequest, NextApiResponse } from "next"
import nc from 'next-connect'

import { publicResourceDownload } from "../../../lib/yadisk/api";

export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const { public_key, path } = req.query
    const { href } = await publicResourceDownload(public_key as string, path as string)
    res.writeHead(302, { location: href }).end()
  })
