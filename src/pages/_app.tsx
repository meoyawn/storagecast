import '../tailwind.css'

import React from "react"
import { AppProps } from 'next/app'

import Layout from '../components/Layout'

// noinspection JSUnusedGlobalSymbols
export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
