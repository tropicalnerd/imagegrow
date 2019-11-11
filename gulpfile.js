const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const browsersync = require('browser-sync');

gulp.task('pug', function buildHTML() {
    return gulp.src('src/pug/index.pug')
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(gulp.dest('dist'))
  });

gulp.task('stylus', function () {
    return gulp.src('src/stylus/style.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('dist'))
    .pipe(browsersync.stream())
});