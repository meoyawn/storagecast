import React, { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren<unknown>): JSX.Element {
  return (
    <div className="container mx-auto">
      {children}
    </div>
  )
}
