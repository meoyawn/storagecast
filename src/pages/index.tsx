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
    <div className='flex flex-col space-y-4 m-4'>

      <SEO
        title="Storagecast"
        description="Yandex.Disk as a podcast"
      />

      <div className="prose">
        <h1>Yandex.Disk as a podcast</h1>
        <a
          href="https://github.com/meoyawn/storagecast"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
        <ol>
          <li>Go to <a href="https://disk.yandex.ru">https://disk.yandex.ru</a></li>
          <li>Upload a folder with audios</li>
          <li>(Optional) Put an image there for podcast artwork</li>
          <li>Right click the folder → Share → Copy link</li>
          <li>Paste the link below ↓</li>
        </ol>
      </div>

      <label className="flex flex-col">
        <span className="font-semibold">Folder link:</span>
        <input
          type="url"
          onChange={({ target }) => setText(target.value)}
        />
      </label>

      {url && (
        <label className="flex flex-col">
          <span className="font-semibold">Podcast RSS:</span>
          <a
            className="text-blue-600 font-medium break-words"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            {url}
          </a>
        </label>
      )}
    </div>
  )
}
