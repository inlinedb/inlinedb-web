const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');

const basePath = path.dirname(require.resolve('@inlinedb/docs/readme.md'));

module.exports = env => {

  const config = {
    entry: [
      './src/index.js'
    ],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loaders: ['html-loader'],
          test: /\.html$/
        },
        {
          loaders: [
            {
              loader: '@inlinedb/docs-loader',
              options: {basePath}
            }
          ],
          test: /\.md$/
        },
        {
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract([
            'css-loader',
            'sass-loader'
          ]),
          test: /\.s?css$/
        }
      ]
    },
    output: {
      filename: 'index.js',
      path: `${__dirname}/dist`
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: './src/index.html'
      }),
      new ExtractTextPlugin('index.css'),
      new CopyWebpackPlugin([
        {from: './.gitignore'},
        {from: './license.md'},
        {from: './src/favicon.ico'},
        {
          from: './src/readme-io.md',
          to: 'readme.md'
        },
        {
          from: './src/google.html',
          to: 'googlecd046b12c3254999.html'
        }
      ])
    ]
  };

  if (env && env.dev) {

    config.entry.unshift('webpack-dev-server/client?http://localhost:8080/');
    config.plugins.unshift(new Webpack.HotModuleReplacementPlugin());

    config.devtool = 'source-map';

    config.devServer = {
      contentBase: './',
      hot: true
    };

    /*

     } else {

     config.plugins.push(new Webpack.optimize.UglifyJsPlugin());

     doesn't support es6

     */

  }

  return config;

};
