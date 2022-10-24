import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import colors from './src/shared/color-theme/colors.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgsDir = path.resolve(__dirname, 'src', 'packages');
const pkgs = (await readdir(pkgsDir));
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
//    assetModuleFilename: '[runtime]/img/[base]',
  },
  target: ['web', 'es5'],
  optimization: {
    mergeDuplicateChunks: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/css/custom1.css'
    }),
    new CopyPlugin({
      patterns: [
        {
          context: pkgsDir,
          from: `*/{img,html}/**`,
        },
        ...pkgs.map(pkg => ({
          from: path.resolve(__dirname, 'src', 'shared', 'img'),
          to: `${pkg}/img/[name][ext]`,
          noErrorOnMissing: true,
        })),
        ...pkgs.map(pkg => ({
          from: path.resolve(__dirname, 'src', 'shared', 'html'),
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
          {
            loader: 'sass-loader',
            options: { additionalData: colors.toScss() }
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          emit: false,
          filename: '[runtime]/img/[base]'
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
};

export default baseConfig;

