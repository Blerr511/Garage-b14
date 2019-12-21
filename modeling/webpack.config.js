const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = env => {
  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
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
          test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg)(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader'
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      port: process.env.PORT || 3000,
      host: process.env.HOST || 'localhost'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.PORT': JSON.stringify(dotenv.parsed.PORT),
        'process.env.HOST': JSON.stringify(dotenv.parsed.HOST),
        'process.env.TINYAPIKEY': JSON.stringify(dotenv.parsed.TINYAPIKEY),
        'process.env.SERVER':
          JSON.stringify(dotenv.parsed.SERVER) || 'http://localhost:8080'
      }),
      new ErrorOverlayPlugin(),
      new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])
    ],
    devtool: 'cheap-module-source-map',
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 6000000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  };
};
