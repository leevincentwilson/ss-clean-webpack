const autoprefixer = require('autoprefixer')

module.exports = {
  test: /\.(css|scss)(\?.+)?$/,
  rules: [
    {
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: 'vfuk-[name]__[local]',
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            parser: 'postcss-scss',
            plugins: [
              autoprefixer({
                browsers: [
                  'last 2 versions',
                  'IE >= 11',
                  'safari >= 10',
                ],
              }),
            ],
          },
        },
        {
          loader: 'sass-loader',
          options: { outputStyle: 'expanded' },
        },
        {
          loader: 'sass-resources-loader',
          options: { resources: ['../../node_modules/@vfuk/components/resources/resources.scss'] },
        },
      ],
    },
  ],
}
