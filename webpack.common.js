import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { readdir } from 'node:fs/promises';

const pkgsDir = './src/packages';
const pkgs = (await readdir(pkgsDir));

const extractPkgName = (filename) => 
  filename.match(/^.*packages\/([0-9A-Z_-]+)\/.*$/)[1];

const baseConfig = {
  entry: pkgs.reduce((entries, pkg) =>
    Object.assign(entries, { [pkg]: `${pkgsDir}/${pkg}/index.ts` }), {}),
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
          from: `${pkgsDir}/*/static/{img,html}/*`,
          to({ context, absoluteFilename }) {
            const [_, pkg, targetPath] = 
              absoluteFilename.match(/^.*packages\/(.+)\/static\/(.+)$/);
            return `${pkg}/${targetPath}`;
          }
        },
        ...pkgs.map(pkg => ({
          from: './src/common-assets/img/*',
          to: `${pkg}/img/[name][ext]`
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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => 
            `${extractPkgName(pathData.filename)}/img/[base]`
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
};

export default baseConfig;

