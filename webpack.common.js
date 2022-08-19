import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { readdirSync } from 'node:fs';

/*
const packages = await readdir('src/packages/');
const entries = packages.reduce((accumulator, current) => {
  accumulator[current] = `src/packages/${current}/index.ts`;
  return accumulator;
}, {});
*/

const removeLeadingPath = (filename) => 
  filename.replace(/^.*views\/(.*)$/, '$1');

const baseConfig = {
  entry: readdirSync('./src/views/').reduce((acc, view) => {
    acc[view] = `./src/views/${view}/index.ts`;
    return acc;
  }, {}),
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
        { from: 'src/views/*/{img,html}/*', 
          to({ context, absoluteFilename }) {
            return removeLeadingPath(absoluteFilename);
          }
        },
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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
};

export default baseConfig;

