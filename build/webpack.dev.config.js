const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const baseWebpackConfig = require('./webpack.base.config');

module.exports = merge(baseWebpackConfig, {
  entry: {
    index: ['react-hot-loader/patch', 'webpack-hot-middleware/client', path.resolve(appDir, './index.js')],
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
              ['react-hot-loader/babel'],
              ['import', {
                "libraryName": "antd",
                "style": "css"
              }]
            ]
          }
        }
      }
    ],
  },
  resolve: {
   extensions: ['.js', '.jsx', '.json'],
   modules: [
     "node_modules",
     path.resolve(__dirname, "./")
   ],
   alias: {
     '@': resolve('src')
   }
 },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]

});
