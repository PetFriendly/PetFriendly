var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

gulp.task('default', function(){
  gulp.start('mocha/chai', 'jshint');
});

gulpt.task('jshint', function(){
  gulp.src(['app/*.js', 'server/*.js', 'test.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('mocha/chai', function(){
  return gulp.src('test.js')
  .pipe(mocha({reporter:'nyan'}));
});
