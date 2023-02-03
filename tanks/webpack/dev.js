const { merge } = require('webpack-merge');
const path = require("path");
const base = require("./base");

module.exports = merge(base, {
  mode: "development",
  output: {
    filename: "scrypt.dev.js",
    clean: true,
  },
  devtool: 'source-map',
});