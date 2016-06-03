var gulp = require('gulp');
var eslint = require('gulp-eslint');
var strip = require('gulp-strip-comments');
var uglify = require('gulp-uglify')
var insert = require('gulp-insert');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

var fs = require('fs');


var paths = {
  srcBase: 'src/',
  jsSrc: 'src/*.js',
  autoSrc: 'src/infocus.auto.js',
  mainSrc: 'src/infocus.js',
  dest: './',
  licenceSrc: 'src/header.js'
};

var licence = fs.readFileSync(paths.licenceSrc);


gulp.task('js:lint', function() {
  return gulp.src(paths.jsSrc, { base: paths.srcBase })
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js:compile', ['js:compile:auto', 'js:compile:main']);

gulp.task('js:compile:main', ['js:lint'], function() {
  return gulp.src(paths.mainSrc, { base: paths.srcBase })
    .pipe(gulp.dest(paths.dest))
    .pipe(uglify())
    .pipe(insert.prepend(licence))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('js:compile:auto', ['js:lint'], function() {
  return gulp.src(paths.autoSrc, { base: paths.srcBase })
    .pipe(browserify())
    .pipe(strip())
    .pipe(insert.prepend(licence))
    .pipe(gulp.dest(paths.dest))
    .pipe(uglify())
    .pipe(insert.prepend(licence))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
  gulp.watch([paths.mainSrc, paths.autoSrc], ['js:compile']);
});

gulp.task('default', ['js:compile', 'watch']);
