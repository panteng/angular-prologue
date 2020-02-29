'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var streamSeries = require('stream-series');
var templateCache = require('gulp-angular-templatecache');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var vendors = require('./config/vendors');



/* ============================================================================================================
============================================ For Development ==================================================
=============================================================================================================*/

// copy fonts from node_modules and app/src/fonts to app/dist/fonts
gulp.task('publish-fonts', function () {
    var fonts = vendors.fonts.concat([
        'app/src/fonts/*'
    ]);

    return gulp.src(fonts)
        .pipe(gulp.dest('app/dist/fonts'));
});

// optimize images under app/src/images and save the results to app/dist/images
gulp.task('publish-images', function () {
    return gulp.src('app/src/images/**/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('app/dist/images'));
});

// copy videos from app/src/videos to app/dist/videos
gulp.task('publish-videos', function () {
    return gulp.src('app/src/videos/**/*')
        .pipe(gulp.dest('app/dist/videos'));
});

// compile sass, concat stylesheets in the right order,
// and save as app/dist/stylesheets/bundle.css
gulp.task('publish-css', function () {
    var cssVendors = vendors.stylesheets;

    return streamSeries(
        gulp.src(cssVendors),
        gulp.src('app/src/scss/main.scss')
            .pipe(plumber({
                errorHandler: errorAlert
            }))
            .pipe(sass({
                outputStyle: 'expanded'
            }))
            .pipe(autoprefixer())
    )
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('app/dist/stylesheets'))
        .pipe(browserSync.stream());
});

// use gulp-angular-templatecache to cache all templates,
// concat it with all js files under app/source/javascripts,
// and save as app/dist/javascripts/app.js
gulp.task('publish-js', function () {
    var jsVendors = vendors.javascripts;

    var jsMine = [
        'app/src/javascripts/app.js',
        'app/src/javascripts/shared/**/*.js',
        'app/src/javascripts/components/**/*.js',
        'app/src/javascripts/templates.js'
    ];

    return streamSeries(
        gulp.src(jsVendors.concat(jsMine)),
        gulp.src('app/src/javascripts/**/*.html')
            .pipe(templateCache({
                standalone: true
            }))
    )
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('app/dist/javascripts'));
});

// inject app/dist/stylesheets/bundle.css and app/dist/javascripts/bundle.js into app/src/index.html
// and save as app/dist/index.html
gulp.task('inject', function () {
    var target = gulp.src('app/src/index.html');
    var assets = gulp.src([
        'app/dist/stylesheets/bundle.css',
        'app/dist/javascripts/bundle.js'
    ], {
        read: false
    });
    return target
        .pipe(inject(assets, {
            ignorePath: 'app/dist/',
            addRootSlash: false,
            removeTags: true
        }))
        .pipe(gulp.dest('app/dist'));
});

// watch files and run corresponding task(s) once files are added, removed or edited.
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'app/dist'
        }
    });

    // use relative paths, or gulp.watch won't be triggered when files are created or deleted.
    gulp.watch('app/src/index.html', ['inject']);
    gulp.watch('app/src/scss/**/*.scss', ['publish-css']);
    gulp.watch('app/src/javascripts/**/*', ['publish-js']);
    gulp.watch('app/src/fonts/**', ['publish-fonts']);
    gulp.watch('app/src/images/**', ['publish-images']);
    gulp.watch('app/src/videos/**', ['publish-videos']);

    gulp.watch('app/dist/index.html').on('change', browserSync.reload);
    gulp.watch('app/dist/javascripts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/fonts/*').on('change', browserSync.reload);
    gulp.watch('app/dist/images/*').on('change', browserSync.reload);
});

// delete files under app/dist
gulp.task('clean-files', function(cb) {
    return del([
        'app/dist/**/*'
    ], cb);
});


// tasks for development workflow
gulp.task('dev', function (cb) {
    runSequence(['clean-files'], ['publish-fonts', 'publish-images', 'publish-videos', 'publish-css', 'publish-js'], 'inject', 'watch', cb);
});

// default task
gulp.task('default', ['dev']);



/* ============================================================================================================
================================================= For Production ==============================================
=============================================================================================================*/

// minify app/dist/stylesheets/bundle.css and save as app/dist/stylesheets/bundle.min.css
gulp.task('minify-css', function () {
    return gulp.src('app/dist/stylesheets/bundle.css')
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/dist/stylesheets'));
});

// uglify app/dist/javascripts/bundle.js and save as app/dist/javascripts/bundle.min.js
gulp.task('uglify-js', function () {
    return gulp.src('app/dist/javascripts/bundle.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/dist/javascripts'));
});

// inject app/dist/stylesheets/bundle.min.css and app/dist/javascripts/bundle.min.js into app/src/index.html
// and save as app/dist/index.html
gulp.task('inject-min', function () {
    var target = gulp.src('app/src/index.html');
    var assets = gulp.src([
        'app/dist/stylesheets/bundle.min.css',
        'app/dist/javascripts/bundle.min.js'
    ], {
        read: false
    });
    return target
        .pipe(inject(assets, {
            ignorePath: 'app/dist/',
            addRootSlash: false,
            removeTags: true
        }))
        .pipe(gulp.dest('app/dist'));
});

// delete app/dist/stylesheets/bundle.css and app/dist/javascripts/bundle.js
gulp.task('del-bundle', function (cb) {
    return del([
        'app/dist/styleshees/bundle.css',
        'app/dist/javascripts/bundle.js'
    ], cb);
});

// run 'minify-css' and 'uglify-js' at the same time
// inject the minified files to index.html
// delete unminified files
gulp.task('prod',  function (cb) {
    runSequence(['minify-css', 'uglify-js'], ['inject-min', 'del-bundle'], cb);
});



/* ===============================================
 ================== Functions ====================
 ================================================*/

// handle errors
function errorAlert(error){
    notify.onError({
        title: "Error in plugin '" + error.plugin + "'",
        message: 'Check your terminal',
        sound: 'Sosumi'
    })(error);
    console.log(error.toString());
    this.emit('end');
};