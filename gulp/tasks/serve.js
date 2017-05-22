// -------------------------------------
//   Task: serve
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  gulp = require('gulp');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// require config
var config = require('../config');

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    open: false
  });

  $.livereload.listen();
  gulp.watch(config.sass.src, ['sass']);
});
