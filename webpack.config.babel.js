import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  node: {
    __filename: false,
    __dirname: false
  },
  entry: {
    script: ["babel-polyfill", "./page/script.ts"]
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "./",
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  target: "web", // important
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./page/index.html",
      inject: true
    })
  ]
};
