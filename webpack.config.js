const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loaders = require('./loaders');

const hwp = new HtmlWebpackPlugin({
  template: './template.html',
  files: {
    css: ['style.css'],
    js: ['bundle.js'],
  },
  filename: 'index.html',
});

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : false,
  entry: './js/index.js',
  module: {
    rules: loaders,
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[hash].bundle.js',
  },
  plugins: debug ? [
    hwp,
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    hwp,
  ],
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
};
