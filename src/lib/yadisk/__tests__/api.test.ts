import { describe, expect, test } from "vitest"
import { recursiveResource } from "../../../app/yadisk"

describe.concurrent("api", () => {
  test("file name", async () => {
    const pr = await recursiveResource(
      "https://disk.yandex.ru/d/50_ycPLmwx3asA",
    )
    expect(pr.files.length).toEqual(4)
  })
})
