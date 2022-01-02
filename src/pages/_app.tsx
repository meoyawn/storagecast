import 'simpledotcss/simple.min.css'

import React from "react"
import {AppProps} from 'next/app'

// noinspection JSUnusedGlobalSymbols
export default function MyApp({Component, pageProps}: AppProps): JSX.Element {
  return (
    <Component {...pageProps} />
  )
}
