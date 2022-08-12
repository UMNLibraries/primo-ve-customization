import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const baseConfig = {
  // TODO: dynamic entry points (https://dev.to/bbenefield89/webpack-how-to-create-dynamic-entry-output-paths-1oc9)
  entry: {
    '01UMN_INST-TWINCITIES': './src/TWINCITIES/index.ts',
    '01UMN_INST-CENTRAL_PACKAGE': './src/CENTRAL_PACKAGE/index.ts',
  },
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

