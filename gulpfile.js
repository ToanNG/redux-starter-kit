var gulp = require('gulp')
var runSequence = require('run-sequence')

require('require-dir')('gulp-tasks')

gulp.task('dev', function () {
  return runSequence('webpack', 'watch', 'nodemon')
})
