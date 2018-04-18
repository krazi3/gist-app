const path = require('path');

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
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  },
  devServer: {
    contentBase: './public'
  }
}