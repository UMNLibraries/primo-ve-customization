const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  output: {
    filename: 'custom.js'
  },
  plugins: [
    new ZipPlugin({
      filename: 'TWINCITIES.zip'
    })
  ]
};

