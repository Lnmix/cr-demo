var config = {
  sass: {
    src: 'src/scss/**/*.scss',
    dest: 'src/templates',
    options: {
      includePaths: [
        'src/bower_components',
        './node_modules'
      ]
    }
  },

  useref: {
    src: 'src/*.html',
    dest: 'dist'
  }
};

module.exports = config;
