const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');

const basePath = path.dirname(require.resolve('inlinedb-docs/readme.md'));

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
              loader: 'docs-loader',
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
      new ExtractTextPlugin('index.css')
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

  } else {

    config.plugins.push(new Webpack.optimize.UglifyJsPlugin());

  }

  return config;

};
