const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  entry: {
    index: [path.resolve(appDir, './index.js')],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: appDir,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-0', 'react'],
          plugins: [
            ['import', {
              "libraryName": "antd",
              "style": "css"
            }]
          ]
        }
      }
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false,
      comments: false
    }),
    new OptimizeCSSPlugin(),
  ]

});