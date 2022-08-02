const ZipPlugin = require('zip-webpack-plugin');

const baseConfig = {
  entry: {
    TWINCITIES: './src/index.js',
    CENTRAL_PACKAGE: './src/central-package.js',
  },
  output: {
    filename: '[name]/js/custom.js',
    clean: true,
  },
};

const zipPlugins = Object.keys(baseConfig.entry).map(name => 
  new ZipPlugin({
    path: 'packages',
    filename: name,
    include: [new RegExp(`^${name}`)]
//    pathPrefix: `${name}/js`,
  })
);

const pluginsConfig  = {
  plugins: zipPlugins,
}


module.exports = {
  ...baseConfig,
  ...pluginsConfig
};

