import baseConfig from './webpack.common.js';
import { merge } from 'webpack-merge';
import { responseInterceptor } from 'http-proxy-middleware';
import { access } from 'node:fs/promises';

//const PROXY_TARGET = 'https://umn-psb.primo.exlibrisgroup.com';
const PROXY_TARGET = 'https://umn-psb.alma.exlibrisgroup.com';
//const PROXY_TARGET = 'https://umn.primo.exlibrisgroup.com';

function fileExists(filename) {
  return access(filename)
    .then(() => true)
    .catch(() => false);
}

async function injectCustomizations(appConfig, view) {
  const customOverwites = {};
  if (await fileExists(`./dist/${view}/css/custom1.css`)) 
    customOverwites.viewCss = `custom/${view}/css/custom1.css`;
  if (await fileExists(`./dist/${view}/js/custom.js`)) 
    customOverwites.viewJs = `custom/${view}/js/custom.js`;
  Object.assign(appConfig.customization, customOverwites);
  return appConfig;
}

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    liveReload: true,
    devMiddleware: {
      writeToDisk: true,
    },
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
        context: ['/primaws/rest/pub/configuration/vid/*'],
        target: PROXY_TARGET,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes: responseInterceptor(
          async (responseBuffer, proxyRes, req, res) => {
            if (responseBuffer.length === 0)
              return responseBuffer;
            const view = req.url.split('/').pop().replace(':', '-');
            try {
              let appConfig = JSON.parse(responseBuffer.toString('utf8'));
              return JSON.stringify(await injectCustomizations(appConfig, view));
            } catch (e) {
              console.error(e);
            }
          }
        ),
      },
      {
        context: (path) => !path.startsWith(baseConfig.output.publicPath),
        target: PROXY_TARGET,
        changeOrigin: true,
      }
    ]
  },
};

export default merge(baseConfig, devConfig);

