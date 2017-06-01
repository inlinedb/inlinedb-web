const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

module.exports = env => {

  const config = {
    entry: [
      './src/index.js'
    ],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          loaders: [
            'babel-loader?sourceMap'
          ],
          test: /\.js$/
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
      })
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
