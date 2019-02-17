const withCSS = require('@zeit/next-css');
const path = require('path')

module.exports = withCSS({
  webpack (config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    return config
  }
});
