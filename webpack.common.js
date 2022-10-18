import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import colors from './src/colors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgsDir = path.resolve(__dirname, 'src', 'packages');
const pkgs = (await readdir(pkgsDir));
const extractPkgName = (filename) =>
  filename.match(/^.*packages\/([0-9A-Z_-]+)\/.*$/)[1];

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          ["autoprefixer", { cascade: false }]
        ]
      }
    }
  }
]

const baseConfig = {
  entry: pkgs.reduce((entries, pkg) =>
    Object.assign(entries, { [pkg]: `${pkgsDir}/${pkg}` }), {}),
  output: {
    filename: '[name]/js/custom.js',
    publicPath: '/discovery/custom',
    clean: true,
  },
  target: ['web', 'es5'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/css/custom1.css'
    }),
    new CopyPlugin({
      patterns: [
        {
          context: pkgsDir,
          from: `*/{img,html}/*`,
        },
        ...pkgs.filter(pkg => !pkg.endsWith('CENTRAL_PACKAGE')).map(pkg => ({
          from: path.resolve(__dirname, 'src', 'common-assets', 'img'),
          to: `${pkg}/img/[name][ext]`,
          noErrorOnMissing: true,
        })),
        ...pkgs.filter(pkg => !pkg.endsWith('CENTRAL_PACKAGE')).map(pkg => ({
          from: path.resolve(__dirname, 'src', 'common-assets', 'html'),
          to: `${pkg}/html/[name][ext]`,
          noErrorOnMissing: true,
        })),
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: cssLoaders,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          ...cssLoaders,
          'sass-loader',
          {
            loader: 'sass-loader',
            options: { additionalData: colors.toScss() }
          },
        ],
      },
      {
        test: /\.(svg|png)$/,
        type: 'asset/resource',
        generator: {
          publicPath: 'custom/',
          filename: (pathData) =>
            `${extractPkgName(pathData.filename)}/img/[base]`,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
};

export default baseConfig;

