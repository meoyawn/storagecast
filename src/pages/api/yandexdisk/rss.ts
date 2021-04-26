import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect'

// noinspection JSUnusedGlobalSymbols
export default nc<NextApiRequest, NextApiResponse>()
  .get((req, res) => {

  })
