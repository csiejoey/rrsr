module.exports = [
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
];
