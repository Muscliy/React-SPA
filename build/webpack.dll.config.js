const webpack = require('webpack');
const path = require('path');
const rootDir = path.resolve(__dirname, '../');
const appDir = path.resolve(rootDir, './app');
const distDir = path.resolve(rootDir, './dist');
const libs = require('./dependencies');

module.exports = {
  name: 'vendor',
  entry: {
    vendor: libs
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
        ],
      }
    ]
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]-manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
}
