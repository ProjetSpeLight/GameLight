// include plug-ins
// to install a plugin-in : npm install gulp-jshint --save-dev
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');

// JS hint task
gulp.task('jshint', function () {
        gulp.src('./*.js')
          .pipe(jshint())
          .pipe(jshint.reporter('default'));
});


// Recopie des sources dans dist
//var filesToMove = [
//        './_locales/**/*.*',
//        './icons/**/*.*',
//        './src/page_action/**/*.*',
//        './manifest.json'
//];
var filesToMove = './src/*.js';

gulp.task('clean', function () {
        return gulp.src(['dist/*'], { read: false })
        .pipe(clean());
});

gulp.task('cp', ['clean'], function () {
        gulp.src(filesToMove).pipe(gulp.dest('dist'));
});

// Compresser les images


// Créé un serveur
gulp.task('webserver', function () {
    gulp.src('src')
      .pipe(webserver({
          livereload: true,
          directoryListing: true,
          open: true
      }));
});

gulp.task('connect', function () {
    connect.server({
        root: './',
        port: 25225
        //open: {browser: 'Internet Explorer'}
        //livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
      .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
