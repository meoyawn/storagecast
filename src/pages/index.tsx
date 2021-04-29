import React, { useState } from "react"

import { mkUrl } from "../lib/url";
import { encodeDiskURL } from "../app/YaDiskURL";
import SEO from "../components/SEO";

// noinspection JSUnusedGlobalSymbols
export default function Index(): JSX.Element {
  const [text, setText] = useState("")

  const url = text.startsWith("https://")
    ? mkUrl({
      baseURL: process.env.NEXT_PUBLIC_SITE ?? '',
      path: `/api/yadisk/${encodeDiskURL(text)}`,
    })
    : undefined

  return (
    <div className='flex flex-col space-y-4'>

      <SEO
        title="Storagecast"
        description="Yandex.Disk as a podcast"
      />

      <h1 className="text-3xl font-semibold">Yandex.Disk as a podcast</h1>

      <a
        className="text-blue-600 font-medium"
        href="https://github.com/meoyawn/storagecast"
        target="_blank"
        rel="noreferrer"
      >
        Source code
      </a>

      <label className="flex flex-col">
        <span className="font-semibold">Folder URL:</span>

        <input
          type="url"
          required
          onChange={({ target }) => setText(target.value)}
        />
      </label>

      <a
        className="text-blue-600 font-medium"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        {url}
      </a>
    </div>
  )
}
