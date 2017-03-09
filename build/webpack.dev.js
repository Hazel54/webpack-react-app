const config = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PORT = 3001

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: 'dev',
    port: PORT
  },
  entry: config.entry,
  output: {
    path: path.resolve('./dev'),
    publicPath: '/',
    filename: 'main.js'
  },
  performance: config.performance,
  module: config.module,
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}`
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    ...config.plugins
  ],
  resolve: config.resolve
}
