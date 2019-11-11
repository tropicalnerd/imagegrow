const gulp = require('gulp');
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

gulp.task('stylus', function() {
  return gulp.src('src/stylus/style.stylus')
  .pipe(stylus())
  .pipe(gulp.dest('dist'))
  .pipe(browsersync.stream())
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(gulp.dest('dist'))
});

gulp.task('serve', function() {
  browsersync.init({
    server: 'dist'
  });

  gulp.watch('src/pug/*.pug', gulp.series('pug'));
  gulp.watch('src/stylus/*.stylus', gulp.series('stylus'));
  gulp.watch('src/js/*.js', gulp.series('js'));

  gulp.watch(['dist/index.html', 'dist/*.js']).on('change', browsersync.reload);
});

gulp.task('default', gulp.series('serve'));
