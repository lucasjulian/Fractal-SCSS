var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello whoever you are!');
})

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src(['components/**/*.scss']) // Gets all files ending with .scss in components/**/* and children dirs */
    .pipe(concat('styles.scss'))  
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('public/stylesheets/')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch(['components/**/*.scss'] , ['sass']); 
  gulp.watch('components/**/*.hbs').on('change', browserSync.reload);
})

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'sass',
    callback
  )
})