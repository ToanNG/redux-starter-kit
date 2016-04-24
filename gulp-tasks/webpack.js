var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')

gulp.task('webpack:watch', function () {
  gulp.watch(['shared/**/*', 'client/**/*'], ['webpack'])
})

gulp.task('webpack', function (cb) {
  var config = process.env.NODE_ENV === 'production' ? '../webpack.prod.config.js' : '../webpack.config.js'
  webpack(require(config), function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
      children: false,
      chunks: false,
      modules: false
    }))
    cb()
  })
})
