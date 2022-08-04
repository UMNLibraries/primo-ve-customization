import ZipPlugin from 'zip-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

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
        context: ['/primaws/rest/pub/configuration/vid/**'],
        target: PROXY_TARGET, 
        changeOrigin: true, 
        selfHandleResponse : true,
        onProxyRes(proxyRes, req, res) {
          const view = req.url.split('/').pop().replace(':', '-');
          let chunks = [];
          proxyRes.on('data', data => chunks.push(data));
          proxyRes.on('end', () => {
            const body = Buffer.concat(chunks);
            const appConfig = JSON.parse(body);
            appConfig.customization.viewCss = `custom/${view}/css/custom1.css`
            res.end(JSON.stringify(appConfig));
          });
        },
      },
      {
        context: (path) => !path.startsWith(CUST_PATH),
        target: PROXY_TARGET,
        changeOrigin: true,
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
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
    ...zipPluginConfig,
    new MiniCssExtractPlugin({
      filename: '[name]/css/custom1.css'
    }),
  ],
}

export default {
  ...baseConfig,
  ...pluginsConfig
};

