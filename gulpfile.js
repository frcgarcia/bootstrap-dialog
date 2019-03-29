// Gulpfile.js

'use strict';

var gulp      = require('gulp'),
    del       = require('del'),
    eslint    = require('gulp-eslint'),
    sass      = require('gulp-sass'),
    cleanCSS  = require('gulp-clean-css'),
    path      = require('path'),
    notify    = require('gulp-notify'),
    rename    = require('gulp-rename'),
    concat    = require('gulp-concat'),
    uglify    = require('gulp-uglify');

sass.compiler = require('node-sass');

var sass_src = [
    'node_modules/bootstrap/scss/_functions.scss',
    'node_modules/bootstrap/scss/_variables.scss',
    'node_modules/bootstrap/scss/mixins/*.scss',
    'src/sass/bootstrap-dialog.scss'
];

gulp.task('sass', function () {
    return gulp.src(sass_src)
        .pipe(concat('bootstrap-dialog.scss'))
        .pipe(gulp.dest('dist/sass'))
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('src/css'))
        .pipe(rename('bootstrap-dialog.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('lint', function () {
    return gulp.src([ 'src/js/bootstrap-dialog.js' ])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('clean', function () {
    return del([ 'dist/' ]);
});

gulp.task('dist', gulp.series([ 'clean', 'sass' ], function () {
    return gulp.src([ 'src/js/bootstrap-dialog.js' ])
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('bootstrap-dialog.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'Build task completed.'
        }));
}));

gulp.task('default', gulp.series('dist'));
