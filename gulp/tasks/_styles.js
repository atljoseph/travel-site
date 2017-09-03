var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
cssnested = require('postcss-nested'),
cssimport = require('postcss-import'),
cssmixins = require('postcss-mixins');

// css processing
gulp.task('styles', function() {
    // console.log('imagine SASS or PostCSS tasks here!');
    // convert postCSS to CSS
    // gulp.src is ASYNC - gulp must be aware when this function completes
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssimport, cssmixins, cssvars, cssnested, autoprefixer]))
        .on('error', function(errorInfo){
            console.log(errorInfo.toString());
            // gracefully end the task before gulp finds out about the error
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles'));
}); 