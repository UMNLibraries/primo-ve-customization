import ZipPlugin from 'zip-webpack-plugin';

const baseConfig = {
  entry: {
    '01UMN_INST-TWINCITIES': './src/index.js',
    '01UMN_INST-CENTRAL_PACKAGE': './src/central-package.js',
  },
  output: {
    filename: '[name]/js/custom.js',
    clean: true,
    publicPath: '/discovery/custom'
  },
  devServer: {
//    proxy: [
//      {
//        context: ['/discovery/**', '!/discovery/custom/**/*.js', '/primaws/rest/**'],
//        target: 'https://umn-psb.primo.exlibrisgroup.com',
//        changeOrigin: true,
//        secure: false,
//      },
//    ],
//    proxy: {
//      context: () => true, // proxy everything
//      target: 'https://umn-psb.primo.exlibrisgroup.com',
//      changeOrigin: true,
//      bypass: (req, res, proxyOptions) => {
//        if (req.path.startsWith('/discovery/custom')) {
//          console.log(req.headers);
//          return `http://localhost:8080/${req.path}`;
//        }
//      },
//    },
    devMiddleware: {
      index: false,
      publicPath: '/discovery/custom',
    },
    proxy: [
//      {
//        context: '/discovery/custom/**',
//        target: 'http:localhost:8080',
//        secure: false,
//        pathRewrite: (path, req) => path.replace('/discovery/custom/', '/'),
//      },
      {
        context: (path) => !path.startsWith('/discovery/custom'),
        target: 'https://umn-psb.primo.exlibrisgroup.com',
        changeOrigin: true,
      }
    ]
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

