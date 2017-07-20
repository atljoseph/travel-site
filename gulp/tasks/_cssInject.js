var gulp = require('gulp'),
browserSync = require('browser-sync').create();

// css injection task
// 'styles' task is a dependency of 'cssInject' task
gulp.task('cssInject', ['styles'], function() {
    // give the css to browserSync
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});