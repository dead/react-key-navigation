var path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    'react': 'react'
  }
}
