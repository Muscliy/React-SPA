const webpack = require('webpack');
const path = require('path');
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: rootDir,
  output: {
    path: distDir,
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../app'),
        exclude: path.resolve(__dirname, '../node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 3,
              localIdentName: '[path][name]-[local]-[hash:base64:5]'
            }
          },
          {
            loader: path.resolve(__dirname, './loader/less-css-modules-assets-fix-loader.js')
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')()
              ]
            }
          },
          {
            loader: 'less-loader'
          }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.woff(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=font/opentype'
      },
      {
        test: /\.ttf(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?.*)?$/,
        use: 'file-loader?prefix=fonts/&name=[name]_[hash:8].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        use: 'url-loader?prefix=fonts/&name=[name]_[hash:8].[ext]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'url-loader?limit=8192'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(appDir, './index.html'),
      filename: 'index.html',
      inject: 'body',
      hash: true
    }),
    new ExtractTextPlugin({
      filename: 'style.[contenthash].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0 && module.context.indexOf('jquery') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}