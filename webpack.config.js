const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const apiUrl = process.env.DB_URL || 'http://localhost:3000/api';

module.exports = {
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
      template: './public/index.html',
      filename: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      __NEWS_API_KEY__:    JSON.stringify("c0332ffabbd54d14be6eecec2a682111"),
      __NEWS_API_URL__:    JSON.stringify("https://newsapi.org/v2"),
      __MOVIEDB_API_KEY__: JSON.stringify("2a443d47c5f761eb75c27abba6470b79"),
      __MOVIEDB_API_URL__: JSON.stringify("https://api.themoviedb.org/3"),
      __DB_API_URL__:      JSON.stringify(apiUrl),
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