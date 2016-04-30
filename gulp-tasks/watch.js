var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('watch', function () {
  var taskNames = Object.keys(gulp.tasks)
  var gulpWatchTasks = []

  for (var i = 0; i < taskNames.length; i++) {
    var taskName = taskNames[i]
    var taskParts = taskName.split(':')

    if (taskParts.length > 1 && taskParts[taskParts.length - 1].toLowerCase() === 'watch') {
      gulpWatchTasks.push(taskName)
    }
  }

  runSequence(gulpWatchTasks)
})
