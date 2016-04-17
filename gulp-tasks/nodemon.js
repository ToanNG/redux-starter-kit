var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var env = require('gulp-env')

gulp.task('nodemon', function () {
  env({
    vars: {
      PORT: 3000
    }
  })

  return nodemon({
    watch: ['routes', 'shared'],
    script: 'bin/www'
  })
})
