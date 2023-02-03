const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  output: {
    clean: true,
  },
  entry: './src/index.ts',
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"//"babel-loader",
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        type: "asset/source" 
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        type: "asset/resource" 
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};