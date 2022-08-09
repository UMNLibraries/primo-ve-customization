import baseConfig from './webpack.common.js';
import { merge } from 'webpack-merge';
import ZipPlugin from 'zip-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const entryNames = Object.keys(baseConfig.entry);

const prodConfig = {
  mode: 'production',
  devtool: 'source-map', // TODO: not yet sure if this will work with the cust pkg...
  plugins: entryNames.map(entryName =>
    new ZipPlugin({
      path: 'packages',
      filename: entryName,
      include: [new RegExp(`^${entryName}`)]
    })
  ),
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};

export default merge(baseConfig, prodConfig);

