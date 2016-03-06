var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var chalk      = require('chalk');
var babel      = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var eslint     = require('gulp-eslint');
var del        = require('del');

gulp.task('babel', ['clean', 'lint'], function() {

    console.log(chalk.magenta.bold('[babel]') + ' Transpiling ES6');

    return gulp.src('./**/*.es6')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {

    console.log(chalk.magenta.bold('[clean]') + ' Cleaning dist folder');

    del(['dist']).then(function() { cb(); });
});

gulp.task('lint', function() {

    console.log(chalk.magenta.bold('[lint]') + ' Linting ES6');

    return gulp.src('./**/*.es6')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('watch', function () {

    console.log(chalk.magenta.bold('[watch]') + ' Watching all the files for changes');

    gulp.watch(['./**/*.es6'], ['babel']);
});

gulp.task('dev', ['babel', 'watch'], function () {
    return console.log(chalk.magenta.bold('\n[dev]') + chalk.bold.green(' Ready for you to start doing things\n'));
});


gulp.task('build', ['babel'], function () {
    return console.log(chalk.magenta.bold('\n[build]') + chalk.bold.green(' Built af\n'));
});
