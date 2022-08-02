import ZipPlugin from 'zip-webpack-plugin';

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

const zipPluginConfig = Object.keys(baseConfig.entry).map(entryName => 
  new ZipPlugin({
    path: 'packages',
    filename: entryName,
    include: [new RegExp(`^${entryName}`)]
  })
);

const pluginsConfig  = {
  plugins: [
    ...zipPluginConfig
  ],
}

export default {
  ...baseConfig,
  ...pluginsConfig
};

