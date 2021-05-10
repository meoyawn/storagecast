import React from "react";
import Document, { Head, Html, Main, NextScript } from 'next/document'

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {

  render(): JSX.Element {
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
}
