import React, { useState } from "react"
import { mkUrl } from "../lib/url";
import { encodeDiskURL } from "../app/YaDiskURL";

// noinspection JSUnusedGlobalSymbols
export default function Index(): JSX.Element {
  const [text, setText] = useState("")

  const url = mkUrl({
    baseURL: process.env.NEXT_PUBLIC_SITE!,
    path: `/api/yadisk/rss/${encodeDiskURL(text)}`,
  })

  return (
    <div className=''>
      <label className="flex flex-col">
        <span className="font-semibold">Yandex Disk URL:</span>
        <input
          type="url"
          required
          onChange={e => {
            setText(e.target.value)
          }}
        />
        <a
          className="text-blue-600 font-medium"
          href={url}
          target="_blank"
          rel="noreferrer"
        >{url}</a>
      </label>
    </div>
  )
}
