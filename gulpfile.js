var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    concat = require('gulp-concat'),
    map = require('map-stream'),
    reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    style: 'build/styles/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/styles/style.less'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/**/*.less'
  },
  clean: '.build'
};

gulp.task('copy', function(){
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
});

gulp.task('less', function() {
  return gulp.src(path.src.style)
    .pipe(less())
    .pipe(gulp.dest(path.build.style))
    .pipe(browserSync.stream());
});

gulp.task('hint', function(){
  return gulp.src(path.src.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

});

gulp.task('concat', ['hint'], function() {
  return gulp.src(path.src.js)
      .pipe(concat('app.js'))
      .pipe(gulp.dest(path.build.js));
});

gulp.task('js-babel', ['concat'], function() {
  return gulp.src(path.build.js + '*')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('uglify', ['js-babel'], function() {
  return gulp.src(path.build.js + '*')
  .pipe(uglify())
  .pipe(gulp.dest(path.build.js))
  .pipe(browserSync.stream());
});

gulp.task('del', function() {
  return del.sync('build');
});

gulp.task('livereload', function() {
  browserSync.init({
    server: 'build/'
  });
});

gulp.task('style:build', ['less']);

gulp.task('html:build', ['copy']);

gulp.task('js:build', ['hint', 'concat', 'js-babel', 'uglify']);

gulp.task('server', ['livereload', 'html:build', 'style:build', 'js:build'], function() {

  gulp.watch(path.src.html, ['copy']).on('change', reload);

  gulp.watch(path.src.style, ['style:build']);

  gulp.watch([path.src.js], ['js:build']);

});

gulp.task('prod', ['del', 'html:build', 'style:build', 'js:build']);

gulp.task('default', ['prod', 'server']);