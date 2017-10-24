var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    gulpSequence = require('gulp-sequence'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    pump = require('pump'),
    uglify = require('gulp-uglify');

gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

var processors = [
  autoprefixer({browsers: ['last 4 versions']}),
];

gulp.task('minify-css', function() {
  return gulp.src(['./src/g2search.less'])
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(cleanCss({
      inline: ['none'],
      level: {
        1: {
          all: true,
          normalizeUrls: false
        },
        2: {
          restructureRules: true
        }
      }
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', gulpSequence(['compress', 'minify-css']));

gulp.task('watch', function(){
  gulp.watch(['./src/*.js'],['compress']);
  gulp.watch(['./src/g2search.less'],['minify-css']);
});

gulp.task('default',[
  'minify-css',
  'compress',
  'watch'
]);
