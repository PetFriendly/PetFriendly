var bower = require('bower');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jscs = require('gulp-jscs');
var mocha = require('gulp-mocha');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'mocha/chai', 'jscs']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('jscs', function() {
  return gulp.src([
    'models/*.js',
    'routes/*.js',
    'www/auth/*.js',
    'www/favorites/*.js',
    'www/js/*.js',
    'www/services/*.js',
    'www/match/*.js',
    'www/settings/*.js',
    './*.js'
  ])
  .pipe(jscs())
  .pipe(jscs.reporter());
})

gulp.task('mocha/chai', function() {
  return gulp.src('/test/*.js')
  .pipe(mocha({reporter:'nyan'}));
});
