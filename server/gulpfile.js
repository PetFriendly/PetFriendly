var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');

gulp.task('default', function(){
  gulp.start('mocha/chai', 'jshint');
});

gulp.task('jshint', function(){
  gulp.src(['/models/*.js', '/test/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function (){
  return gulp.src(['models/*.js', '/*test.js'])
  .pipe(jscs())
  .pipe(jscs.reporter());
})

gulp.task('mocha/chai', function(){
  return gulp.src('/test/*.js')
  .pipe(mocha({reporter:'nyan'}));
});
