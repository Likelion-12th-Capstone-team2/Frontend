const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@auth': path.resolve(__dirname, 'src/pages/auth'),
  };
  return config;
};