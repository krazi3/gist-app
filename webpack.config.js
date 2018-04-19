const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'app.js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  devServer: {
    contentBase: './public'
  }
}