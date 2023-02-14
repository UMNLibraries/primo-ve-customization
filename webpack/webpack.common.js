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
        plugins: [
          [
            "postcss-preset-env",
            {
              autoprefixer: { cascade: false },
            },
          ],
        ],
      },
    },
  },
];

const baseConfig = {
  // create an entry point for each view
  entry: views.reduce(
    (entries, view) =>
      Object.assign(entries, { [view]: `${viewsDir}/${view}` }),
    {}
  ),
  output: {
    filename: "[name]/js/custom.js",
    publicPath: "/discovery/custom/",
    clean: true,
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
          // copy each view's img/ and html/ dir as-is
          context: viewsDir,
          from: `*/{img,html}/**`,
        }, // copy any image in the shared dir to *each* view's img dir
        ...views.map((view) => ({
          from: `${sharedDir}/**/*.{ico,png,svg}`,
          to: `${view}/img/[name][ext]`,
          noErrorOnMissing: true,
        })), // copy the shared html dir to *each* view's html dir
        ...views.map((view) => ({
          from: path.resolve(sharedDir, "html/*"),
          to: `${view}/html/[name][ext]`,
          noErrorOnMissing: true,
        })), // copy the shared email template to *each* view's html dir
        ...views.map((view) => ({
          from: path.resolve(sharedDir, "html/email"),
          to: `${view}/html/email/[name][ext]`,
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
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
        exclude: /node_modules/,
      },
      {
        // enable importing html files as strings
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
            options: {
              // make color variables available globally in sass/scss files
              additionalData: colors.toSass(),
            },
          },
        ],
      },
      {
        // enable importing image urls
        test: /\.(pn|sv)g$/,
        type: "asset/resource",
        generator: {
          //emit: false,
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
