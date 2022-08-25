import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgsDir = path.resolve(__dirname, 'src', 'packages');
const pkgs = (await readdir(pkgsDir));
const extractPkgName = (filename) => 
  filename.match(/^.*packages\/([0-9A-Z_-]+)\/.*$/)[1];

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
        })),
        ...pkgs.filter(pkg => !pkg.endsWith('CENTRAL_PACKAGE')).map(pkg => ({
          from: path.resolve(__dirname, 'src', 'common-assets', 'html'),
          to: `${pkg}/html/[name][ext]`,
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png$/,
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

