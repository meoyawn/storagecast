const fs = require("fs")
const path = require("path")
const { SitemapStream } = require('sitemap')

const readEnv = path =>
  fs.readFileSync(path)
    .toString()
    .split("\n")
    .reduce((obj, line) => {
      const [k, v] = line.split("=", 2)
      return k ? { ...obj, [k]: v } : obj
    }, {})

const dotEnv = Object.assign(...[".env", ".env.production"].map(readEnv))

function genSitemap() {
  if (!dotEnv.NEXT_PUBLIC_SITE) {
    throw new Error("define env.NEXT_PUBLIC_SITE to generate a sitemap")
  }

  const EXCLUDE = ["404", "_app", "_document", "index"]

  const sitemap = new SitemapStream({
    hostname: dotEnv.NEXT_PUBLIC_SITE,
  })

  const now = new Date()

  fs.readdirSync(path.join("src", "pages"))
    .filter(name => name.endsWith(".tsx") && !EXCLUDE.some(bad => name.includes(bad)))
    .map(name => ({
      url: `/${name.split(".")[0]}`, // FIXME might contain multiple dots
      priority: 0.8,
      lastmod: now,
    }))
    .concat({
      url: "/",
      priority: 1,
      lastmod: now,
    })
    .forEach(x => sitemap.write(x))

  sitemap.end()
  sitemap.pipe(fs.createWriteStream(path.join("public", "sitemap.xml")))
}

(async () => {
  genSitemap()
})()
