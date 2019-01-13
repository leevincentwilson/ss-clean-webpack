module.exports = {
  test: /\.(css)(\?.+)?$/,
  rules: [
    {
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            sourceMap: true,
          },
        },
      ],
    },
  ],
}
