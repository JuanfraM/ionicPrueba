var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jade = require( 'gulp-jade' );
var inject = require('gulp-inject');
var server = require('karma').Server;

var paths = {
  sass: ['scss/**/*.scss'],
  jade: ['www/views/*.jade'],
  javascript: [
    'www/js/app.js',
    'www/js/config/*.js',
    'www/js/controllers/*.js',
    'www/js/services/*.js',
    'www/lib/*/dist/*.min.js',
    '!www/lib/*/dist/*.fp.min.js',
    '!www/lib/*/dist/*.core.min.js'    
  ],
  css: [
    'www/**/*.css',
    '!www/css/ionic.app*.css',
    '!www/lib/**'
  ]
};

gulp.task('index', function(){
   return gulp.src('./www/index.html')
       .pipe(inject(
           gulp.src(paths.javascript,
               {read: false}), {relative: true}))
       .pipe(gulp.dest('./www'))
       .pipe(inject(
           gulp.src(paths.css,
           {read: false}), {relative: true}))
       .pipe(gulp.dest('./www'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task( 'jade', function (done) {
  gulp.src( paths.jade )
    .pipe( jade() )
    .pipe( gulp.dest( './www/views/html/' ) )
    .on( 'end', done );
} );

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch([paths.javascript, paths.css], ['index']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', ['watch', 'index', 'jade', 'sass']);
