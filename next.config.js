module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && isServer) {
      require('./scripts/nextgen')
    }

    return config
  }
}
