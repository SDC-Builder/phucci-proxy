/* eslint-disable no-unused-vars */

const path = require('path');
const nodeExternals = require('webpack-node-externals');
require("@babel/polyfill"); // necesarry


module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.join(__dirname, './server/index.js')],

  target: 'node',

  externals: [nodeExternals()],

  output: {
    filename: 'index.js',
    path: path.resolve('server-build')
  },

  module: {
    rules: [
      {
        test: /\.js?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        }
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },


    ]
  },

};
