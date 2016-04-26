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
  swPrecache.write(path.join('dist', 'sw.js'), {
    staticFileGlobs: [
      'dist/**/*.{js,html,css,png,jpg,jpeg,gif,svg,json}'
    ],
    dynamicUrlToDependencies: {
      '/shell': ['views/index.jade', 'views/layout.jade', 'dist/app.bundle.js', 'dist/app.css'],
      '/about': ['views/index.jade', 'views/layout.jade', 'dist/3.About.bundle.js'],
      '/login': ['views/index.jade', 'views/layout.jade', 'dist/4.Login.bundle.js']
    },
    stripPrefix: 'dist/',
    navigateFallback: '/shell',
    navigateFallbackWhitelist: [
      /^\/posts\//
    ],
    cacheId: packageName,
    handleFetch: true
  })
  .then(cb)
  .catch(() => {
    cb()
  })
})
