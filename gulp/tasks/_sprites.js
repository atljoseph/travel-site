
// creta esprite files in temp, then move to desired location, then clean up

var gulp = require('gulp');
var rename = require('gulp-rename');
var del = require('del');
var svgSprite = require('gulp-svg-sprite');

var config = {
    mode: {
        css: {
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/_sprite.css'
                }
            }
        }
    }
}

gulp.task('beginClean', function(){
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.svg')
    // .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCss', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCss'], function(){
    return del(['./app/temp/sprite']);
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCss', 'endClean']);