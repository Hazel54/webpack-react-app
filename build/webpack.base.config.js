const webpack = require('webpack')
const postcssFlexFallback = require('postcss-flex-fallback')
const postcssPx2rem = require('postcss-px2rem')
const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  performance: {
    hints: false
  },
  entry: {
    app: './src/main.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?minimize&-autoprefixer!postcss-loader!sass-loader?outputStyle=expanded',
          publicPath: '/'
        })
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          postcssFlexFallback(),
          postcssPx2rem({ remUnit: 75 }),
          cssnano({
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions', 'Android >= 2.1', 'iOS >= 7.0'],
            },
            discardComments: {
              removeAll: true,
            },
            safe: true
          })
        ]
      }
    })
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.html', '.css', '.scss']
  }
}

module.exports = config
