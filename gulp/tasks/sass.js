// -------------------------------------
//   Task: sass
// -------------------------------------

// require modules
var $ = require('gulp-load-plugins')(),
  gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  flexboxfixer = require('postcss-flexboxfixer');

// require custom modules
var customPlumber = require('../custom-modules/plumber');

// require config
var config = require('../config');

gulp.task('sass', function() {
  var processors = [
    flexboxfixer,
    autoprefixer({
      browsers: ['>1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
    })
  ];

  return gulp.src(config.sass.src)
    .pipe(customPlumber('Error Running Sass'))
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.postcss(processors))
    .pipe($.cleanCss({ level: { 1: {specialComments: false}}, inline: ['all'] }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.sass.dest))
    .pipe($.livereload());
});
