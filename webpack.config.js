const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : false,
  entry: './js/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader?url=false',
            options: {
              module: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/font/[name].[ext]',
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[hash].bundle.js',
  },
  plugins: debug ? [
    new HtmlWebpackPlugin({
      template: './template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      },
      filename: 'index.html',
    }),
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      },
      filename: 'index.html',
    }),
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
