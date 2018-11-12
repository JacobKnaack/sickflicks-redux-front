const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const NODE_ENV = JSON.stringify(process.env.NODE_ENV)
const isProd = (process.env.NODE_ENV === 'production')
let apiUrl = 'http://localhost:3000/api'
if (isProd) {
  apiUrl = 'https://movie-blog-backend.herokuapp.com/api'
}

const config = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      template: './public/index.html',
      filename: 'index.html',
      inject: true
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        console.log(message);
      },
      minify: true, // minify and uglify the script
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.DefinePlugin({
      __NEWS_API_KEY__: JSON.stringify("c0332ffabbd54d14be6eecec2a682111"),
      __NEWS_API_URL__: JSON.stringify("https://newsapi.org/v2"),
      __MOVIEDB_API_KEY__: JSON.stringify("2a443d47c5f761eb75c27abba6470b79"),
      __MOVIEDB_API_URL__: JSON.stringify("https://api.themoviedb.org/3"),
      __DB_API_URL__: JSON.stringify(apiUrl),
      'process.env': { NODE_ENV },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/, include: [path.resolve(__dirname, './src')] },
      { test: /\.(png|jpg|jepg|gif|svg)$/, loader: 'file-loader?name=img/img-[hash:6].[ext]' },
      { test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('autoprefixer')({
                      add: true,
                      remove: true,
                      browsers: ['last 2 versions'],
                    }),
                  ];
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
    ]
  }
}

if (isProd) {
  config.plugins.push(
    new CleanPlugin([
      'dist/',
    ], { verbose: true }),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: './',
        ignore: [
          'index.html',
        ],
      },
    ]),
    new UglifyJsPlugin()
  )
}

module.exports = config
