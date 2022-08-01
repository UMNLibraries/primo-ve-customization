const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    central: './src/central-package.js',
  },
  output: {
    filename: '[name].custom.js'
  },
  plugins: [
    new ZipPlugin({
      filename: 'TWINCITIES.zip'
    })
  ]
};

