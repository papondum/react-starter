var webpack = require('webpack');

module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port: 5555
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','react','stage-1']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style-loader!css-loader" },
      { test: /\.useable\.css$/, loader: "style-loader/useable!css-loader" }
    ]
  }
}
