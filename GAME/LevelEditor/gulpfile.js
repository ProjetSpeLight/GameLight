// to install gulp : npm install gulp -g
// include plug-ins
// to install a plugin-in : npm install gulp-util gulp-clean gulp-connect --save-dev
// attention : il faut réinstaller localement gulp : npm install gulp --save-dev
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var connect = require('gulp-connect');


var filesToMove = ['../GAME/requirejs/app/createLevel.js', '../GAME/requirejs/app/objects/*.js'];

gulp.task('clean', function () {
    return gulp.src(['requirejs/app/createLevel.js', 'requirejs/app/objects/*.js'], { read: false })
    .pipe(clean());
});

gulp.task('cp', ['clean'], function () {
    gulp.src('../GAME/requirejs/app/createLevel.js').pipe(gulp.dest('requirejs/app'));
    gulp.src('../GAME/requirejs/app/objects/*.js').pipe(gulp.dest('requirejs/app/objects'));
});

// Compresser les images


// Création du serveur sur le port 4200 (le dossier source est le dossier où est lancé le serveur : doit être la racine)
gulp.task('connect', function () {
    connect.server({
        port: 4200,
    });
});


