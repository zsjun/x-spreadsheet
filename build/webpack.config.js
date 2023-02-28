const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = (dir) => path.join(__dirname, "..", dir);

module.exports = {
  entry: {
    xspreadsheet: "./src/index.js",
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      //   include: [resolve("src"), resolve("test")],
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
      },
      // {
      //   test: /\.scss$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [
      //     'file-loader',
      //   ],
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/,
      //   use: ["file-loader"],
      // },
    ],
  },
};
