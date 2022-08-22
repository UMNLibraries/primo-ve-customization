import baseConfig from './webpack.common.js';
import { merge } from 'webpack-merge';
import { responseInterceptor } from 'http-proxy-middleware';
import { access } from 'node:fs/promises';
import { promisify } from 'node:util';
import _glob from 'glob';

const glob = promisify(_glob);

//const PROXY_TARGET = 'https://umn-psb.primo.exlibrisgroup.com';
const PROXY_TARGET = 'https://umn-psb.alma.exlibrisgroup.com';
//const PROXY_TARGET = 'https://umn.primo.exlibrisgroup.com';

function fileExists(filename) {
  return access(filename)
    .then(() => true)
    .catch(() => false);
}

/**
 * Overwrite the appConfig object with local customizations.
 */
async function injectCustomizations(appConfig, pkg) {
  if (await fileExists(`./dist/${pkg}/css/custom1.css`))
    appConfig.customization.viewCss = `custom/${pkg}/css/custom1.css`;
  if (await fileExists(`./dist/${pkg}/js/custom.js`))
    appConfig.customization.viewJs = `custom/${pkg}/js/custom.js`;
  if (await fileExists(`./dist/${pkg}/img/favicon.ico`))
    appConfig.customization.favIcon = `custom/${pkg}/img/favicon.ico`

  for (let icon of await glob(`./dist/${pkg}/img/icon_**.png`)) {
    const [_, resouce] = icon.match(/^.*icon_(.*).png$/);
    appConfig.customization.resourceIcons[resouce] = 
      icon.replace(/^\.?\/dist/, 'custom');
  }
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
            const pkg = req.url.split('/').pop().replace(':', '-');
            try {
              let appConfig = JSON.parse(responseBuffer.toString('utf8'));
              return JSON.stringify(await injectCustomizations(appConfig, pkg));
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

