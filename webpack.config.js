const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css|.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 8080,
    open: true,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src", "assets/images"),
          to: path.join(__dirname, "dist", "assets/images"),
        },
      ],
    }),
  ],
};
