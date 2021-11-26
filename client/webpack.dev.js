const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {API_ENDPOINT} = process.env

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js','.jsx','.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: "camelCase",
              }
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'API_ENDPOINT': JSON.stringify(API_ENDPOINT),
      }
    }),
  ],
  devServer: {
    contentBase: 'build',
    historyApiFallback: true,
  },
  devtool: 'source-map',
}