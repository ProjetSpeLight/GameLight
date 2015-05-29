// to install gulp : npm install gulp -g
// include plug-ins
// to install a plugin-in : npm install gulp-jshint --save-dev
// attention : il faut r�installer localement gulp : npm install gulp --save-dev
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

// JS hint task
gulp.task('jshint', function () {
    gulp.src('./**.js')
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


// Cr�ation du serveur sur le port 4200 (le dossier source est le dossier o� est lanc� le serveur : doit �tre la racine)
gulp.task('connect', function () {
    connect.server({
        port: 4200,
    });
});

/*
gulp.task('html', function () {
    gulp.src('./*.html', './src/*.js', './node_modules/**')
      .pipe(connect.reload());
});*/

// Permet au serveur de prendre en compte les modifications des sources (ce qui �vite de stopper/relance le serveur � chaque modification)
gulp.task('watch', function () {
    gulp.watch(['./*.html', './src/*.js', './node_modules/**'], ['html']);
});

gulp.task('default', ['connect', 'watch', 'html']);
