var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  context: __dirname + '/client/scripts',
  entry: {
    app: './index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: true // <-- disable redux-logger
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared', 'client/scripts', 'client/styles', 'client/images']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css!myth!sass' },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file?name=[name].[ext]' }
    ]
  }
}
