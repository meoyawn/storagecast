import "simpledotcss/simple.min.css"
import { type AppProps } from "next/app"
import React, { type JSX } from "react"

// noinspection JSUnusedGlobalSymbols
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
