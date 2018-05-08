const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: {
    'app': [
      'babel-polyfill',
      './src/index.js'
    ]
  },
  resolve:{
     modules: [
                  path.join(__dirname, "/src"),
                  "node_modules"
              ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html$/,  use: [
                                 {
                                    loader: "html-loader"
                                 }
                               ]
      }
    ]
  },
  plugins:[
	    new HtmlWebPackPlugin({
      	         template: "./src/index.html",
                 filename: "./index.html"
            })
  ]
};
