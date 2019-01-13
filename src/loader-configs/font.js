module.exports = {
  test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  rules: [
    {
      use: {
        loader: 'file-loader',
        options: { name: 'fonts/[name].[ext]?[hash]' },
      },
    },
  ],
}
