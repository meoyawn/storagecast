import { publicResourceDownload } from "../../../lib/yadisk/api"
import { type NextRequest } from "next/server"

// noinspection JSUnusedGlobalSymbols
export const config = { runtime: "edge" }

export default async function Download(req: NextRequest): Promise<Response> {
  const public_key = req.nextUrl.searchParams.get("public_key")
  const path = req.nextUrl.searchParams.get("path")
  if (!public_key || !path) {
    throw new Error(`public_key or path is not in ${req.nextUrl}`)
  }

  const { href } = await publicResourceDownload(public_key, path)
  return new Response(null, {
    status: 302,
    headers: { location: href },
  })
}
