import { decodeDiskURL, encodeDiskURL } from "../YaDiskURL"
import { expect, test } from "vitest"

test.concurrent("url encoding", () => {
  const url = "https://disk.yandex.ru/d/50_ycPLmwx3asA"
  expect(decodeDiskURL(encodeDiskURL(url))).toEqual(url)
})
