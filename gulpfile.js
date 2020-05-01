const BUILD_FILENAME = 'bundle.js'

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');

gulp.task('watch', function(done) {
  gulp.watch(['./src/**/*.js'], { ignoreInitial: false }, gulp.task('typescript'));
});

// jsのビルド
gulp.task('typescript', function(done) {
  return gulp.src('src/**/*.ts')
  .pipe(sourcemaps.init())
  .pipe(ts({
      module: 'amd',
      target: "ES6",
      noImplicitAny: true,
      outFile: BUILD_FILENAME,
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./_bundle', { sourcemaps: false }))
});

gulp.task('build', gulp.series('typescript'));
gulp.task('default', gulp.series('build'));
