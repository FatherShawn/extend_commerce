/* global require */
const {series, src, dest } = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');

var paths = {

  sass: {
    main: './sass/styles.scss',
    watch: './sass/scss/**/*'
  },
  css: {
    root: './css'
  },
  clean: [
    './css/styles.css',
    './css/**/*.css.map',
  ]
};

function clean(cb) {
  'use strict';
  del(paths.clean);
  cb()
}


function sassCompile(cb) {
  'use strict';
  src(paths.sass.main)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        'node_modules/support-for/sass'
        //'node_modules/bootstrap/scss'
      ]
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'IE >= 11']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(paths.css.root))
    .pipe(livereload());
  cb();
}

exports.build = sassCompile;
exports.default = series(clean, sassCompile);
