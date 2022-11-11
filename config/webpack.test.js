import baseConfig from './webpack.common.js';
import { merge } from 'webpack-merge';

// Karma doesn't use these settings but complains if they're present
delete baseConfig.entry;
delete baseConfig.output;

const testConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  stats: 'errors-only',
};

export default merge(baseConfig, testConfig);
