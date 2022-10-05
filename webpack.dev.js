import baseConfig from './webpack.common.js';
import { merge } from 'webpack-merge';
import { responseInterceptor } from 'http-proxy-middleware';
import { access } from 'node:fs/promises';
import { promisify } from 'node:util';
import _glob from 'glob';

const glob = promisify(_glob);

const PROXY_TARGET = process.env.PROXY_TARGET || 
  'https://umn-psb.primo.exlibrisgroup.com';
//const PROXY_TARGET = 'https://umn.primo.exlibrisgroup.com';

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
        // redirect authentication requests to the SAML SP
        context: ['/primaws/suprimaLogin', '/primaws/suprimaExtLogin'],
        target: PROXY_TARGET,
        changeOrigin: true,
        followRedirects: true,
        onProxyReq(proxyReq, req, res) {
          res.writeHead(302, { location: PROXY_TARGET + req.url });
        },
      },
      {
        // intercept configuration data requests and modify responses
        context: ['/primaws/rest/pub/configuration/vid/*'],
        target: PROXY_TARGET,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes: responseInterceptor(
          async (responseBuffer, proxyRes, req, res) => {
            if (responseBuffer.length === 0)
              return responseBuffer;
            const vid = req.url.split('/').pop();
            const pkg = vid.replace(':', '-');
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
        // forward all other requests to Primo VE (except local custom resources)
        context: (path) => !path.startsWith(baseConfig.output.publicPath),
        target: PROXY_TARGET,
        changeOrigin: true,
      }
    ]
  },
};

async function fileExists(filename) {
  return access(filename)
    .then(() => true)
    .catch(() => false);
}

/**
 * Overwrite the appConfig object with local customizations (js/css/html/images).
 */
async function injectCustomizations(appConfig, pkg) {
  // css
  if (await fileExists(`./dist/${pkg}/css/custom1.css`))
    appConfig.customization.viewCss = `custom/${pkg}/css/custom1.css`;

  // js
  if (await fileExists(`./dist/${pkg}/js/custom.js`))
    appConfig.customization.viewJs = `custom/${pkg}/js/custom.js`;

  // html
  if (await fileExists(`./dist/${pkg}/html/home_en_US.html`))
    appConfig.customization.staticHtml.homepage = {
      'en_US': `custom/${pkg}/html/home_en_US.html`
    };
  if (await fileExists(`./dist/${pkg}/html/email_en_US.html`))
    appConfig.customization.staticHtml.email = {
      'en_US': `custom/${pkg}/html/email_en_US.html`
    };
  if (await fileExists(`./dist/${pkg}/html/help_en_US.html`))
    appConfig.customization.staticHtml.help = {
      'en_US': `custom/${pkg}/html/help_en_US.html`
    };
  
  // images
  if (await fileExists(`./dist/${pkg}/img/favicon.ico`))
    appConfig.customization.favIcon = `custom/${pkg}/img/favicon.ico`;
  if (await fileExists(`./dist/${pkg}/img/library-logo.png`))
    appConfig.customization.libraryLogo = `custom/${pkg}/img/library-logo.png`;
  if (await fileExists(`./dist/${pkg}/img/home-screen-icon.png`))
    appConfig.customization.homeScreenIcon = `custom/${pkg}/img/home-screen-icon.png`;
  for (let icon of await glob(`./dist/${pkg}/img/icon_**.png`)) {
    const [_, resouce] = icon.match(/^.*icon_(.*).png$/);
    appConfig.customization.resourceIcons[resouce] = 
      icon.replace(/^\.?\/dist/, 'custom');
  }
  return appConfig;
}

export default merge(baseConfig, devConfig);

