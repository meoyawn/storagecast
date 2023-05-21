import Head from "next/head"
import React, { type JSX, type ReactNode } from "react"

export default function SEO({
  title,
  children,
  description,
  image,
  twitterCard = "summary",
  twitterSite,
}: {
  children?: ReactNode
  title: string
  description?: string
  image?: string
  twitterCard?: "summary" | "player" | "summary_large_image"
  twitterSite?: string
}): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />

      {twitterSite && <meta name="twitter:site" content={twitterSite} />}

      {children}
    </Head>
  )
}
