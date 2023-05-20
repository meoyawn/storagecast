import { recursiveResource } from "../../../app/yadisk"
import { expect, test } from "vitest"

test.concurrent("api file name", async () => {
  const pr = await recursiveResource("https://disk.yandex.ru/d/50_ycPLmwx3asA")
  expect(pr.files.length).toEqual(4)
})
