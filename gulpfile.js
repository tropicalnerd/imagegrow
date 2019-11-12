const gulp = require('gulp');
const changed = require('gulp-changed');
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');
const imageminMozJpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const browsersync = require('browser-sync');

// Image resize and compress
function jpg(cb) {
  [180, 270, 360, 720, 1080].forEach(function (size) {
    gulp.src('src/images/*.{jpg,jpeg,png}')
      .pipe(changed('dist/images'))
      .pipe(imageResize({ height: size, format: jpg }))
      .pipe(rename(function (path) {
        path.basename = `${path.basename}_${size}`;
        path.extname = '.jpg';
      }))
      .pipe(imagemin([
        imageminMozJpeg({
          quality: 50,
          progressive: true
        })
      ], {verbose: true}))
      .pipe(gulp.dest('dist/images'))
  });
  cb();
}
gulp.task('jpg', jpg);

function webp(cb) {
  [180, 270, 360, 720, 1080].forEach(function (size) {
    gulp.src('src/images/*.{jpg,jpeg,png}')
      .pipe(changed('dist/images'))
      .pipe(imageResize({ height: size }))
      .pipe(imagemin([
        imageminWebp({
          quality: 50,
        })
      ], {verbose: true}))
      .pipe(rename(function (path) {
        path.basename = `${path.basename}_${size}`;
        path.extname = '.webp';
      }))
      .pipe(gulp.dest('dist/images'))
  });
  cb();
}
gulp.task('webp', webp);

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

  gulp.watch(['src/images/*.{jpg, jpeg}'], gulp.series('images'));
  gulp.watch('src/pug/*.pug', gulp.series('pug'));
  gulp.watch('src/stylus/*.stylus', gulp.series('stylus'));
  gulp.watch('src/js/*.js', gulp.series('js'));

  gulp.watch(['dist/index.html', 'dist/*.js']).on('change', browsersync.reload);
});

gulp.task('images', gulp.parallel('jpg', 'webp'));
gulp.task('default', gulp.series('serve'));
