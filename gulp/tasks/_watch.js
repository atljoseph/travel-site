var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

// gulp watch plugin
// can also be ran/tested in git bash as 'gulp watch'
gulp.task('watch', function() {
    console.log('gulp watch task is running');
    
    // tell browsersync how it should initialise
    browserSync.init({
        // when gulp watch is ran, this line causes a browser to open to http://local;host:3000
        notify: false, 
        server: {
            baseDir: "app"
        }
    });
    
    // when index.html changes, start the 'html' task
    watch('./app/index.html', function(){
        // gulp.start('html');    
        browserSync.reload();    
    });

    // watch src css files for changes
    watch('./app/assets/styles/**/*.css', function(){
        // give the processed css to the browser
        gulp.start('cssInject');        
    });


});

// css injection task
// 'styles' task is a dependency of 'cssInject' task
gulp.task('cssInject', ['styles'], function() {
    // give the css to browserSync
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
}); 