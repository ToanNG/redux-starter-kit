var webpack = require('webpack')

module.exports = {
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
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared', 'client/scripts', 'client/styles']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css!myth!sass' }
    ]
  }
}
