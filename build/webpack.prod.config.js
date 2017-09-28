const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const baseWebpackConfig = require('./webpack.base.config');
const libs = require('./dependencies');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin('common'),
  new HtmlWebpackPlugin({
    template: path.resolve(appDir, './entry.ejs'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
  }),
  new OptimizeCSSPlugin(),
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
  })
]

module.exports = merge(baseWebpackConfig, {
  entry: {
    index: [path.resolve(appDir, './index.js')],
    vendor: libs
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: appDir,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0', 'react'],
          }
        }
      }
    ],
  },
  plugins: plugins
});