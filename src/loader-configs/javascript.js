module.exports = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  rules: [
    { use: 'babel-loader' },
  ],
};
