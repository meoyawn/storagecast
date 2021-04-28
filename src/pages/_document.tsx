import React from "react";
import Document, { Head, Html, Main, NextScript } from 'next/document'

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon32.png" />
          <link rel="apple-touch-icon" href="/icons/icon192.png" />

          <link rel="manifest" href="/manifest/site.webmanifest" />

          {process.env.THEME_COLOR && <meta name="theme-color" content={process.env.THEME_COLOR} />}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
