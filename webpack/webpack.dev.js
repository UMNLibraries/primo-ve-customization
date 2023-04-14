import baseConfig from "./webpack.common.js";
import { merge } from "webpack-merge";
import { responseInterceptor } from "http-proxy-middleware";
import { access } from "node:fs/promises";
import { promisify } from "node:util";
import _glob from "glob";
import webpack from "webpack";

const glob = promisify(_glob);
const outputPath = webpack(baseConfig).options.output.path;
const PROXY_TARGET =
  process.env.PROXY_TARGET || "https://umn.primo.exlibrisgroup.com";

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    allowedHosts: [".lib.umn.edu", ".primo.exlibrisgroup.com"],
    static: {
      directory: outputPath,
    },
    hot: true,
    liveReload: false,
    devMiddleware: {
      writeToDisk: true,
    },
    proxy: [
      {
        // redirect authentication requests to the SAML SP
        context: ["/primaws/suprimaLogin", "/primaws/suprimaExtLogin"],
        target: PROXY_TARGET,
        changeOrigin: true,
        followRedirects: true,
        onProxyReq(proxyReq, req, res) {
          res.writeHead(302, { location: PROXY_TARGET + req.url });
        },
      },
      {
        // intercept configuration data requests and modify responses
        context: ["/primaws/rest/pub/configuration/vid/*"],
        target: PROXY_TARGET,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyRes: responseInterceptor(
          async (responseBuffer, proxyRes, req, res) => {
            if (responseBuffer.length === 0) return responseBuffer;
            const vid = req.url.split("/").pop();
            const view = vid.replace(":", "-");
            try {
              let appConfig = JSON.parse(responseBuffer.toString("utf8"));
              return JSON.stringify(
                await injectCustomizations(appConfig, view)
              );
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
      },
    ],
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
async function injectCustomizations(appConfig, view) {
  // css
  if (await fileExists(`${outputPath}/${view}/css/custom1.css`))
    appConfig.customization.viewCss = `custom/${view}/css/custom1.css`;

  // js
  if (await fileExists(`${outputPath}/${view}/js/custom.js`))
    appConfig.customization.viewJs = `custom/${view}/js/custom.js`;

  // html
  if (await fileExists(`${outputPath}/${view}/html/homepage/homepage_en.html`))
    appConfig.customization.staticHtml.homepage = {
      en: `custom/${view}/html/homepage/homepage_en.html`,
    };
  if (await fileExists(`${outputPath}/${view}/html/email/email_en.html`))
    appConfig.customization.staticHtml.email = {
      en: `custom/${view}/html/email/email_en.html`,
    };
  if (await fileExists(`${outputPath}/${view}/html/help_en.html`))
    appConfig.customization.staticHtml.help = {
      en: `custom/${view}/html/help_en.html`,
    };

  // images
  if (await fileExists(`${outputPath}/${view}/img/favicon.ico`))
    appConfig.customization.favIcon = `custom/${view}/img/favicon.ico`;
  if (await fileExists(`${outputPath}/${view}/img/library-logo.png`))
    appConfig.customization.libraryLogo = `custom/${view}/img/library-logo.png`;
  if (await fileExists(`${outputPath}/${view}/img/home-screen-icon.png`))
    appConfig.customization.homeScreenIcon = `custom/${view}/img/home-screen-icon.png`;
  if (await fileExists(`${outputPath}/${view}/img/custom-ui.svg`))
    appConfig.customization.viewSvg = `custom/${view}/img/custom-ui.svg`;
  for (let icon of await glob(`${outputPath}/${view}/img/icon_**.png`)) {
    const [_, resouce] = icon.match(/^.*icon_(.*).png$/);
    appConfig.customization.resourceIcons[resouce] = icon.replace(
      outputPath,
      "custom"
    );
  }
  return appConfig;
}

export default merge(baseConfig, devConfig);
