import ZipPlugin from 'zip-webpack-plugin';

const CUST_PATH = '/discovery/custom';
//const PROXY_TARGET = 'https://umn-psb.primo.exlibrisgroup.com';
const PROXY_TARGET = 'https://umn-psb.alma.exlibrisgroup.com';

const baseConfig = {
  entry: {
    '01UMN_INST-TWINCITIES': './src/TWINCITIES/js/index.js',
    '01UMN_INST-CENTRAL_PACKAGE': './src/CENTRAL_PACKAGE/js/index.js',
  },
  output: {
    filename: '[name]/js/custom.js',
    publicPath: CUST_PATH,
    clean: true,
  },
  devServer: {
    proxy: [
      {
        context: ['/primaws/suprimaLogin', '/primaws/suprimaExtLogin'],
        target: PROXY_TARGET,
        changeOrigin: true, 
        followRedirects: true,
        onProxyReq(proxyReq, req, res) {
          res.writeHead(302, { location: PROXY_TARGET + req.url });
        },
      },
      {
        context: (path) => !path.startsWith(CUST_PATH),
        target: PROXY_TARGET,
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

