const config = require('./webpack.base.config')
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: config.entry,
  output: {
    path: './dist',
    publicPath: '/',
    filename: 'main.[chunkhash:8].js',
    // chunkFilename: '[name].js'
  },
  performance: config.performance,
  module: config.module,
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      template: './dev/tmpl.html',
      title: 'hello',
      filename: './index.html'
    }),
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      },
      sourceMap: false
    }),
    ...config.plugins
  ],
  resolve: config.resolve
}
