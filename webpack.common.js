import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { readdir } from 'node:fs/promises';

const viewsDir = './src/views';

const baseConfig = {
  entry: (await readdir(viewsDir)).reduce((entries, view) =>
    Object.assign(entries, { [view]: `${viewsDir}/${view}/index.ts` }), {}),
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
          from: `${viewsDir}/*/static/{img,html}/*`,
          to({ context, absoluteFilename }) {
            const [_, view, targetPath] = 
              absoluteFilename.match(/^.*views\/(.+)\/static\/(.+)$/);
            return `${view}/${targetPath}`;
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

