import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const removeLeadingPath = (filename) => 
  filename.replace(/^.*packages\/(.*)$/, '$1');

const baseConfig = {
  // TODO: dynamic entry points (https://dev.to/bbenefield89/webpack-how-to-create-dynamic-entry-output-paths-1oc9)
  entry: {
    '01UMN_INST-TWINCITIES': './src/packages/01UMN_INST-TWINCITIES/index.ts',
    '01UMN_INST-CENTRAL_PACKAGE': './src/packages/01UMN_INST-CENTRAL_PACKAGE/index.ts',
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
    new CopyPlugin({
      patterns: [
        { from: 'src/packages/*/{img,html}/*', 
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

