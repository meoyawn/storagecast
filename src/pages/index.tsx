import React from "react"

// noinspection JSUnusedGlobalSymbols
export default function Index(): JSX.Element {
  return (
    <div className=''>
      <label className="flex flex-col">
        <span className="font-semibold">Yandex Disk URL:</span>
        <input
          type="url"
          required
          onChange={e => {
          }}
        />
      </label>
    </div>
  )
}
