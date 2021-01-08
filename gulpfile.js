var gulp = require("gulp");
var replace = require('gulp-string-replace');
var minifyInline = require('gulp-minify-inline');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');


//paths
const paths = {
  html: {
    src: 'src/*.{html,htm}',
    dest: 'dist/'
  }
}

//gulp move
function move() {
  return (
    gulp
        .src(paths.html.src, {since: gulp.lastRun(move)})

        //get rid of sheets artifacts
        .pipe(replace('""', '"'))
        .pipe(replace('"<', '<'))
        .pipe(replace('>"', '>'))
        .pipe(replace('>,', '>'))
        
        //minify html
        .pipe(htmlmin({ collapseWhitespace: true }))

        //minify css js
        .pipe(minifyInline())

        //rename
        .pipe(rename({extname: '.DIST.html'}))
        
        //move to dist
        .pipe(gulp.dest(paths.html.dest))
  );
};

//watcher (use done to signal async completion)
gulp.task('watch', function(done){
  gulp.watch(paths.html.src, move); 
  done();
});


exports.move = move;