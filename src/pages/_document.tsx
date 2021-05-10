import React from "react"
import Document, { Head, Html, Main, NextScript } from 'next/document'

import path from "path"
import fs from "fs"

class InlineStylesHead extends Head {

  getCssLinks({ sharedFiles }: {
    sharedFiles: ReadonlyArray<string>
    pageFiles: ReadonlyArray<string>
    allFiles: ReadonlyArray<string>
  }): JSX.Element[] {
    const { assetPrefix } = this.context
    return sharedFiles
      .filter((file) => /\.css$/.test(file))
      .map((file) => (
        <style
          key={file}
          nonce={this.props.nonce}
          data-href={`${assetPrefix}/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(path.join(process.cwd(), '.next', file), 'utf-8'),
          }}
        />
      ))
  }
}

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {

  render(): JSX.Element {
    return (
      <Html lang="en">
        <InlineStylesHead>
          <link rel="icon" href="/icon.svg" />
          <link rel="mask-icon" href="/icon.svg" color="#000" />
        </InlineStylesHead>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
