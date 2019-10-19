const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const dotenvext = require('dotenv');
module.exports = (env, argv) => {
  const dotenv = dotenvext.config({
    path:
      argv.mode === 'development'
        ? __dirname + '/.env'
        : __dirname + '/.prod.env'
  });
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    mode: argv.mode,
    devServer: {
      port: process.env.PORT || 8080,
      host: process.env.HOST || 'localhost',
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|tff)/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new ErrorOverlayPlugin(),
      new webpack.DefinePlugin({
        'process.dotenv': JSON.parse(JSON.stringify(dotenv.parsed)),
        'process.env.PORT': JSON.stringify(dotenv.parsed.PORT),
        'process.env.HOST': JSON.stringify(dotenv.parsed.HOST),
        'process.env.SERVER': JSON.stringify(dotenv.parsed.SERVER)
      })
    ],
    devtool: 'cheap-module-source-map'
  };
};
