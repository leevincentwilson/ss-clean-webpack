const path = require('path');

const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackMd5Hash = require('webpack-md5-hash');

const javascript = require('./loader-configs/javascript');
const htmlLoader = require('./loader-configs/html');

const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const css = require('./loader-configs/css');
const font = require('./loader-configs/font');

const root = process.cwd();

module.exports = (env) => {
  const webpackSettings = {
    entry: [
      path.resolve(root, 'src'),
    ],
    mode: 'production',
    output: {
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(root, 'build'),
      publicPath: './',
      filename: '[name].[chunkhash].js',
    },
    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          materialUi: {
            test: /[\\/]node_modules[\\/](@material-ui)/,
            name: 'materialUi',
            enforce: true,
            chunks: 'all',
          },
          vendors: {
            test: /[\\/]node_modules[\\/](?!@material-ui)/,
            name: 'vendor',
            enforce: true,
            chunks: 'all',
          },
        },
      },
    },

    module: {
      rules: [
        javascript,
        htmlLoader,
        css,
        font
      ],
    },

    plugins: [
      new CleanWebpackPlugin([
        'build',
      ],
      {
        root: path.resolve(root),
        verbose: true,
        dry: false,
      }),
      new WebpackMd5Hash(),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
    ],
  };
  if (env && env.analysis) {
    webpackSettings.plugins.push(new BundleAnalyzerPlugin());
  } else if (env && env.debug) {
    webpackSettings.optimization.minimize = false;
  } else if(env && env.compress){
    webpackSettings.plugins.push(new CompressionPlugin({ deleteOriginalAssets: true }));
  }
  return webpackSettings;
};
