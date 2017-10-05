const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const baseWebpackConfig = require('./webpack.base.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const manifest = require('./vendor-manifest.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(appDir, './index.js')],
  },
  output: {
    devtoolModuleFilenameTemplate(info) {
      return "file:///" + info.absoluteResourcePath.replace(/\\/g, '/');
    }
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
            plugins: [
              ['react-hot-loader/babel'],
            ]
          }
        }
      }
    ],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: manifest,
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './vendor.js')
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(appDir, './entry.ejs'),
      filename: 'index.html',
      inject: 'body',
      hash: true,
      headScripts: ['/vendor.js'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:7002' })
  ]
});
