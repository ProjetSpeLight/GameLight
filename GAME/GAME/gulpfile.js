// to install gulp : npm install gulp -g
// include plug-ins
// to install a plugin-in : npm install gulp-jshint --save-dev
// attention : il faut réinstaller localement gulp : npm install gulp --save-dev
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
    return gulp.src(['build/*'], { read: false })
    .pipe(clean());
});

gulp.task('cp', ['clean'], function () {
    gulp.src(filesToMove).pipe(gulp.dest('dist'));

});



/****** Déplacement des sources *****/


gulp.task('html', function () {
    gulp.src('./*.html').pipe(gulp.dest('./build'));

});


gulp.task('xml', function () {
    gulp.src('./*.xml').pipe(gulp.dest('./build'));

});


/************ Déplacement des assets ***************/

// minify new images
gulp.task('imagemin', function () {
    var imgSrc = './assets/**/*.png',
        imgDst = './build/assets';

    gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});


gulp.task('imageminJPG', function () {
    var imgSrc = './assets/**/*.jpg',
        imgDst = './build/assets';

    gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});

// Moves levels
gulp.task('levels', function () {
    var imgSrc = './assets/**/*.json',
        imgDst = './build/assets';

    gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});


// Moves audio
gulp.task('audioMP3', function () {
    var imgSrc = './assets/**/*.mp3',
        imgDst = './build/assets';

    gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});

gulp.task('audioOgg', function () {
    var imgSrc = './assets/**/*.ogg',
        imgDst = './build/assets';

    gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});

gulp.task('assets', ['imagemin', 'imageminJPG', 'levels', 'audioMP3', 'audioOgg']);


// Création du serveur sur le port 4200 (le dossier source est le dossier où est lancé le serveur : doit être la racine)
gulp.task('connect', function () {
    connect.server({
        port: 4200,
    });
});


gulp.task('default', ['connect', 'watch', 'html']);





