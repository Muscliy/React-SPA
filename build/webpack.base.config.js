const webpack = require('webpack');
const path = require('path');
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const theme = require('./theme.js');

var version = null;
var server = null;

if(process.argv.length > 2) {
  version = process.argv[1];
}

if(process.env.NODE_ENV == 'production') {
  server = serverConfig[process.env.DEPLOY_ENV].server;
}

console.log(path.resolve(rootDir));

module.exports = {
  context: rootDir,
  output: {
    path: distDir,
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    filename: '[name].[hash:8].js',
    chunkFilename: 'chunk.[id].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        include: path.resolve(rootDir),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 3,
                localIdentName: '[local]'
              }
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
              loader: 'less-loader',
              options: {
                modifyVars: theme
              }
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
        use: 'url-loader?limit=8192&name=images/[name]-[hash:8].[ext]'
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
      '@': appDir,
    }
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      'VERSION': JSON.stringify(version),
      'SERVER': JSON.stringify(server)
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery",
      _: 'underscore',
      React: 'react',
      ReactDOM: 'react-dom',
      moment: 'moment',
      toastr: 'toastr',
      G2: 'g2',
      Antd: 'antd',
    }),
  ]
}