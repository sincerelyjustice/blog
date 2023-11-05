const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const getPathFromRoot = (to) => path.join(__dirname, to);

const SRC_DIR = getPathFromRoot('src');
const DIST_DIR = getPathFromRoot('dist');
const LIB_DIR = getPathFromRoot('lib');
const PUBLIC_DIR = getPathFromRoot('public');

const cssInjectionLoader =
  process.env.NODE_ENV === 'production'
    ? MiniCssExtractPlugin.loader
    : 'style-loader';

module.exports = {
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    path: DIST_DIR,
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@lib': LIB_DIR,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          cssInjectionLoader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [cssInjectionLoader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_DIR, 'index.html'),
      favicon: path.join(PUBLIC_DIR, 'icons', 'favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: path.join(PUBLIC_DIR, 'blogs'), to: 'blogs' }],
    }),
  ],
  devServer: {
    static: {
      directory: DIST_DIR,
      watch: true,
    },
    historyApiFallback: true,
  },
};
