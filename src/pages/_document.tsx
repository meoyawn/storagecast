import { Head, Html, Main, NextScript } from "next/document"
import React, { type JSX } from "react"

// noinspection JSUnusedGlobalSymbols
export default function MyDocument(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/icon.svg" />
        <link rel="mask-icon" href="/icon.svg" color="#000" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
