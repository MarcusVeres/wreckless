// dependencies

var del         = require('del');                   // delete files 
var gulp        = require('gulp');
var jshint      = require('gulp-jshint');           // error-checking
var plumber     = require('gulp-plumber');          // gulp.watch does not break if(error)
var rename      = require('gulp-rename');           // rename files 
var sass        = require('gulp-ruby-sass');
var uglify      = require('gulp-uglify');           // crunch javascript files


// file locations

var paths = {
    css: 'static/css/styles.css',
    js: 'static/js/scripts.js',
    sass: 'static/sass/styles.sass'
};


// functions

gulp.task('clean', function() {
    // deletes all existing exports in assets
    del(
        ['assets/*'], 
        function( message ){
            console.log("Deleted: assets/*");        
        }
    );
});

// this does not work at the moment
// the plugin throws errors, and the package maintainer is a total prick
// see : https://github.com/dlmanning/gulp-sass/issues/152
// and : https://github.com/sass/node-sass/issues/602  (near the bottom)
/*
gulp.task('sass', function() {
    return gulp
        .src('static/sass/styles.sass')
        .pipe(sass())
        .pipe(rename('sass.min.css'))
        .pipe(gulp.dest('assets/'));
});
*/

// for now we will be using ruby-sass
// it has slightly different syntax and implementation, but it works! 
gulp.task('ruby_sass', function(){
    return sass( paths.sass , { style: 'compressed'})
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('assets/'));
});

gulp.task('scripts', function() {
    return gulp
        .src('static/js/scripts.js')
        .pipe(plumber())    // prevent from breaking on error
        .pipe(uglify())
        .pipe(jshint())
        .pipe(rename({ suffix : '.min' }))
        .pipe(gulp.dest('assets/'));
});


// defaults

gulp.task('watch', function() {
    gulp.watch( paths.sass , ['ruby_sass']);
    gulp.watch( paths.js , ['scripts']);
});

gulp.task('default', ['ruby_sass', 'scripts', 'watch']);

