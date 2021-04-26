const fs = require("fs")
const path = require("path")
const { SitemapStream } = require('sitemap')
const sharp = require('sharp')

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

async function genManifest() {
  const icons = [
    {
      src: "/manifest/icon-192x192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/manifest/icon-512x512.png",
      sizes: "512x512",
      type: "image/png"
    }
  ]

  const icon = sharp("src/images/icon.png")
  await Promise.all(icons.map(({ src, sizes }) => {
    const [w, h] = sizes.split("x").map(s => parseInt(s))
    icon.resize(w, h).toFile(`public${src}`)
  }))

  const manifest = {
    name: dotEnv.SITE_NAME,
    icons: icons,
    theme_color: dotEnv.THEME_COLOR, // browser toolbar
    background_color: dotEnv.THEME_COLOR, // splash screen
  }

  fs.writeFileSync(`public${dotEnv.MANIFEST}`, JSON.stringify(manifest))
}

(async () => {
  genSitemap()
  await genManifest()
})()
