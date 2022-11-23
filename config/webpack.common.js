import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as path from "node:path";
import colors from "../src/shared/color-theme/colors.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsDir = path.resolve(__dirname, "..", "src", "views");
const sharedDir = path.resolve(__dirname, "..", "src", "shared");
const views = await readdir(viewsDir);
const cssLoaders = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [["autoprefixer", { cascade: false }]],
      },
    },
  },
];

const baseConfig = {
  entry: views.reduce(
    (entries, view) =>
      Object.assign(entries, { [view]: `${viewsDir}/${view}` }),
    {}
  ),
  output: {
    filename: "[name]/js/custom.js",
    publicPath: "/discovery/custom/",
    clean: true,
    //    assetModuleFilename: '[runtime]/img/[base]',
  },
  target: ["web", "es5"],
  optimization: {
    mergeDuplicateChunks: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/css/custom1.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          context: viewsDir,
          from: `*/{img,html}/**`,
        },
        ...views.map((view) => ({
          from: path.resolve(sharedDir, "img"),
          to: `${view}/img/[name][ext]`,
          noErrorOnMissing: true,
        })),
        ...views.map((view) => ({
          from: path.resolve(sharedDir, "html"),
          to: `${view}/html/[name][ext]`,
          noErrorOnMissing: true,
        })),
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/,
        use: "html-loader",
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
            loader: "sass-loader",
            options: { additionalData: colors.toSass() },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          emit: false,
          filename: "[runtime]/img/[base]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", "..."],
  },
};

export default baseConfig;
