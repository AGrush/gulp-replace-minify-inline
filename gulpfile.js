var gulp = require("gulp");
var replace = require('gulp-string-replace');
var minifyInline = require('gulp-minify-inline');
var htmlmin = require('gulp-htmlmin');

//gulp move
function move() {
  return (
    gulp
        .src("src/*.html")


        .pipe(replace('""', '"'))
        .pipe(replace('"<', '<'))
        .pipe(replace('>"', '>'))
        .pipe(replace('>,', '>'))
        
        //mini html
        .pipe(htmlmin({ collapseWhitespace: true }))

        //mini css js
        .pipe(minifyInline())
        
        .pipe(gulp.dest("dist"))
  );
};

exports.move = move;