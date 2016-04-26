var gulp = require('gulp')

gulp.task('copy:public', function () {
  return gulp.src('public/**/*.*')
  .pipe(gulp.dest('dist'))
})
