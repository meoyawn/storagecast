import { describe, expect, test } from "vitest"
import { decodeDiskURL, encodeDiskURL } from "../YaDiskURL"

describe.concurrent("url", () => {
  test("encoding", () => {
    const url = "https://disk.yandex.ru/d/50_ycPLmwx3asA"
    expect(decodeDiskURL(encodeDiskURL(url))).toEqual(url)
  })
})
