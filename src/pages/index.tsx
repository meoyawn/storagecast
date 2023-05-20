import { encodeDiskURL } from "../app/YaDiskURL"
import SEO from "../components/SEO"
import { mkUrl } from "../lib/url"
import React, { type JSX, useState } from "react"

// noinspection JSUnusedGlobalSymbols
export default function Index(): JSX.Element {
  const [text, setText] = useState("")

  const url = text.startsWith("https://")
    ? mkUrl({
        baseURL: process.env.NEXT_PUBLIC_SITE ?? "",
        path: `/api/yadisk/${encodeDiskURL(text)}`,
      })
    : undefined

  return (
    <main>
      <SEO title="Storagecast" description="Yandex.Disk as a podcast" />

      <h1>Yandex.Disk as a podcast</h1>
      <a
        href="https://github.com/meoyawn/storagecast"
        target="_blank"
        rel="noreferrer"
      >
        Source code
      </a>
      <ol>
        <li>
          <span>Go to </span>
          <a href="https://disk.yandex.ru" target="_blank" rel="noreferrer">
            Yandex.Disk
          </a>
        </li>
        <li>Upload a folder with audios</li>
        <li>(Optional) Put an image there for podcast artwork</li>
        <li>Right click the folder → Share → Copy link</li>
        <li>Paste the link below ↓</li>
      </ol>

      <label>
        <p>
          <b>Folder link:</b>
        </p>
        <input type="url" onChange={({ target }) => setText(target.value)} />
      </label>

      {url && (
        <label>
          <p>
            <b>Podcast RSS:</b>
          </p>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </label>
      )}
    </main>
  )
}
