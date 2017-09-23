const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const baseWebpackConfig = require('./webpack.base.config');
const manifest = require('./vendor-manifest.json')

module.exports = merge(baseWebpackConfig, {
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(appDir, './index.js')],
  },
  // output: {
  //   devtoolModuleFilenameTemplate(info) {
  //     return "file:///" + info.absoluteResourcePath.replace(/\\/g, '/');
  //   }
  // },
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin('common'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: manifest,
    })
  ]
});
