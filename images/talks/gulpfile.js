var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    htmllint = require('gulp-htmllint'),
    concat = require('gulp-concat'),
    del = require('del');

let htmlLintOptions = {
  rules: {
    'tag-self-close': false,
    'attr-name-style': 'dash',
    'indent-width': 2
  }
};

gulp.task('sass', () => {
  return gulp.src('src/scss/prez.scss')
             .pipe(sass({
                includePaths: [
                  'node_modules/reveal.js/css/',
                  'node_modules/reveal.js/lib/css',
                ]
             }))
             .pipe(gulp.dest('dist/css'))
             .pipe(connect.reload());
});

gulp.task('js', () => {
  return gulp.src([
    'src/js/**/*.js',
    'node_modules/reveal.js/js/*.js',
    'node_modules/reveal.js/lib/js/*.js'
  ]).pipe(concat('prez.js')).pipe(gulp.dest('dist/js'));
});

gulp.task('plugins', () => {
  return gulp.src([
    'node_modules/reveal.js/plugin/highlight/*.js'
  ]).pipe(gulp.dest('dist/plugin'));
});

gulp.task('fonts', () => {
  return gulp.src(
    [
      'node_modules/reveal.js/lib/font/source-sans-pro/source-sans-pro.css',
      'node_modules/reveal.js/lib/font/source-sans-pro/*.woff',
    ]
  ).pipe(gulp.dest('dist/lib/font/source-sans-pro'));
});

gulp.task('html', () => {
  return gulp.src('src/html/**/*.html')
             .pipe(htmllint(htmlLintOptions))
             .pipe(gulp.dest('dist/'))
             .pipe(connect.reload());
});

gulp.task('build', ['html', 'js', 'plugins', 'fonts', 'sass']);

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/html/**/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('clean', () => {
  return del(['dist/**/*']);
});

gulp.task('serve', () => {
  return connect.server({
    host: '0.0.0.0',
    port:  8000,
    root: 'dist',
    livereload: true
  });
});

gulp.task('default', ['build', 'watch', 'serve']);
