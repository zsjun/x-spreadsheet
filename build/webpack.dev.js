const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    //  you should know that the HtmlWebpackPlugin by default will generate its own index.html
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "x-spreadsheet",
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contenthash].css",
      // chunkFilename: devMode ? '[id].[hash].css' : '[id].css',
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    // clear dist before bundle
    clean: true,
  },
  devtool: "eval",
  devServer: {
    compress: true,
    port: 9000,
    static: {
      directory: path.join(__dirname, "../dist"),
    },
  },
});
