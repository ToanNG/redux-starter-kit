var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development') // <-- change to production to remove logs and warnings
      }
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: false // <-- disable redux-logger
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared', 'client/scripts', 'client/styles', 'client/images']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]!myth!sass') },
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file?name=[name].[ext]' },
      { test: require.resolve('react-addons-perf'), loader: 'expose?Perf' }
    ]
  }
}
