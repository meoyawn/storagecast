/** @type {import("next").NextConfig} */
module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      require("./scripts/nextgen")
    }

    return config
  },
}
