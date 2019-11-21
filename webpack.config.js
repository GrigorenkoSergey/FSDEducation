const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  pages: path.join(__dirname, "./src/pages")
}

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = fs.readdirSync(`${PATHS.pages}/`).map(item => fs.readdirSync(PAGES_DIR + item));
let pugPages = [].concat(...PAGES).filter(fileName => fileName.endsWith('.pug'));

let entries = {"index": `${PATHS.src}`};

pugPages.forEach((item, index) => {
  let key = item.replace(/\.pug/, "");
  entries[key] = `${PATHS.src}/pages/${key}/${key}.js`;
});

let conf = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: (data) => data.chunk.name == "index" ? "index.js" : "pages/[name]/[name].js"
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  devServer: {
    overlay: true,
    port: 8081,
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader"
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader",
      ],
    },
    {
      test: /\.pug$/,
      use: [
        {
          loader: "pug-loader",
        },
      ],
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          }
        }
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]/[name].[ext]",
          }
        }
      ],
    },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.pug`,
      filename: './index.html',
      chunks: ['index'],
    }),

    ...pugPages.map(page => new HtmlWebpackPlugin({
      template: `${PATHS.pages}/${page.replace(/\.pug/, "")}/${page}`,
      filename: `./pages/${page.replace(/\.pug/,'/$`.html')}`,
      chunks: [`${page.replace(/\.pug/,'')}`],
    })),

    new MiniCssExtractPlugin({
      moduleFilename: ({name}) => name === "index" ? "[name].css" : "pages/[name]/[name].css",
      chunkFilename: "[id].css",
    }),

    new CopyPlugin([
      { from: `${PATHS.src}/assets/images/`, to: `${PATHS.dist}/assets/images/` },
      { from: `${PATHS.src}/assets/fonts/`, to: `${PATHS.dist}/assets/fonts/` },
    ]),
  ],
};

module.exports = (env, options) => {
  let production = options.mode === "production";

  conf.devtool = production
    ? false
    : "eval-sourcemap";
  return conf;
}
