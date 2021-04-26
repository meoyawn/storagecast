import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect'
import { recursiveResource } from "../../../app/yadisk";

// noinspection JSUnusedGlobalSymbols
export default nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    res.json(await recursiveResource("https://disk.yandex.ru/d/jcrQgkyE3TN7MX?w=1"))
  })
