const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const javascript = require('./loader-configs/javascript');
const html = require('./loader-configs/html');
const css = require('./loader-configs/css');
const font = require('./loader-configs/font');

const root = process.cwd();

const printInstructions = require('./prettyConsole');
module.exports = (env = {}) => {
  const port = env.port || 8080;
  printInstructions('Running on:', port);

  const webpackSettings = {
    entry: [
      path.resolve(root, 'src'),
    ],
    mode: 'development',
    output: {
      path: path.resolve(root, 'build'),
      publicPath: '/',
      filename: '[name].js',
    },
    module: {
      rules: [
        javascript,
        html,
        css,
        font
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
    ],
    devServer: {
      contentBase: path.resolve(root, 'src'),
      quiet: true,
      historyApiFallback: true,
      port,
    },
  };
  return webpackSettings;
};
