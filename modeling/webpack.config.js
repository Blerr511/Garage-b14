const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name][hash].js',
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
          test: /\.(woff(2)?|ttf|eot|svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
          use: 'url-loader?limit=10000&name=assets/[hash].[ext]'
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      port: isProduction ? process.env.PORT : process.env._PORT,
      host: isProduction ? process.env.HOST : process.env._HOST
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.PORT': JSON.stringify(
          isProduction ? dotenv.parsed.PORT : dotenv.parsed._PORT
        ),
        'process.env.HOST': JSON.stringify(
          isProduction ? dotenv.parsed.HOST : dotenv.parsed._HOST
        ),
        'process.env.TINYAPIKEY': JSON.stringify(dotenv.parsed.TINYAPIKEY),
        'process.env.SERVER': isProduction
          ? JSON.stringify(dotenv.parsed.SERVER)
          : JSON.stringify('http://localhost:8080')
      }),
      new ErrorOverlayPlugin(),
      new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])
    ],
    devtool: 'cheap-module-source-map',
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 8000000,
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
