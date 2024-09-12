const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:html|css|js|json|png|jpg|jpeg|svg)$/, // Regex to match file types for caching
          handler: "StaleWhileRevalidate", // Caching strategy for these resources
          options: {
            cacheName: "static-resources",
          },
        },
      ],
    }),
    new Dotenv(),
  ],
  devServer: {
    port: 3000,
    allowedHosts: "all",
  },
};
