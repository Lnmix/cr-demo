// plumber.js
// Custom Plumber function for catching errors

// required modules
var gutil = require('gulp-util'),
gulp      = require('gulp'),
notify    = require('gulp-notify'),
plumber   = require('gulp-plumber');


function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || 'Error running Gulp',
      message: 'Error: <%= error.message %>',
      sound: 'Glass'
    })
  });
}

module.exports = customPlumber;
