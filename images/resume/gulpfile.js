var gulp = require('gulp'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    del = require('del');

gulp.task('less', function() {
  return gulp.src('src/less/app.less')
             .pipe(less({
                paths: [
                  'node_modules/font-awesome/less',
                ]
             }))
             .pipe(gulp.dest('dist/css'))
             .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src(['src/js/**/*.js']).pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
  return gulp.src('src/html/index.html')
             .pipe(gulp.dest('dist/'))
             .pipe(connect.reload());
});

gulp.task('assets', function() {
  return gulp.src('src/assets/*').pipe(gulp.dest('dist/assets'));
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*.woff2').pipe(gulp.dest('dist/fonts'));
});

gulp.task('build', ['html', 'assets', 'fonts', 'js', 'less']);

gulp.task('watch', function() {
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/html/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/assets/**/*', ['assets']);
});

gulp.task('clean', function() {
  return del(['dist/**/*']);
});

gulp.task('serve', function() {
  return connect.server({
    host: '0.0.0.0',
    port:  8000,
    root: 'dist',
    livereload: true
  });
});

gulp.task('default', ['build', 'watch', 'serve']);
