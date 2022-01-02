// next.config.js
const withPreact = require('next-plugin-preact');

module.exports = withPreact({
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      require('./scripts/nextgen')
    }

    return config
  }
});
