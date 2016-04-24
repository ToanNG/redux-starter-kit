var gulp = require('gulp')
var path = require('path')
var fs = require('fs')
var swPrecache = require('sw-precache')

var packageName = JSON.parse(fs.readFileSync('./package.json', 'utf8')).name

gulp.task('service-worker:watch', function (cb) {
  gulp.watch('dist/**/*.*', ['service-worker'])
  gulp.watch('views/**/*.*', ['service-worker'])
})

gulp.task('service-worker', function (cb) {
  swPrecache.write(path.join('public', 'sw.js'), {
    staticFileGlobs: [
      'dist/**/*.{js,html,css,png,jpg,jpeg,gif,svg}'
    ],
    dynamicUrlToDependencies: {
      '/shell': ['views/index.jade', 'views/layout.jade']
    },
    stripPrefix: 'dist/',
    replacePrefix: '/assets/',
    navigateFallback: '/shell',
    cacheId: packageName,
    handleFetch: false
  })
  .then(cb)
  .catch(() => {
    cb()
  })
})
