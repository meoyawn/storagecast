import { describe, expect, test } from "vitest"

import { publicResource } from "../api"

describe.concurrent("api", () => {
  test("file name", async () => {
    const pr = await publicResource(
      "https://disk.yandex.ru/d/50_ycPLmwx3asA",
      undefined,
    )
    expect(pr._embedded.items).toEqual([])
  })
})
