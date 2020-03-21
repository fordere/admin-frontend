// Load plugins
var gulp = require('gulp'),
  es = require('event-stream'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rimraf = require('gulp-rimraf'),
  inject = require('gulp-inject'),
  cssmin = require('gulp-cssmin'),
  less = require('gulp-less'),
  gutil = require('gulp-util'),
  path = require('path'),
  webserver = require('gulp-webserver'),
  minifyHTML = require('gulp-htmlmin'),
  babel = require('gulp-babel'),
  gulpNgConfig = require('gulp-ng-config'),
  templateCache = require('gulp-angular-templatecache');

var streamqueue = require('streamqueue');
var strip = require('gulp-strip-comments');

// bump version before deploying and rerun gulp index!
var version = 90;

// external bower css dependencies
var externalCssFiles = [
  'lib/toastr/toastr.css',
  'lib/textAngular/dist/textAngular.min.css',
  'lib/select2/select2.css',
  'lib/angular-chart.js/dist/angular-chart.css',
  'lib/leaflet/dist/leaflet.css',
  'lib/ngQuickDate/dist/ng-quick-date-plus-default-theme.css',
];

// external bower js dependencies
var externalJsFiles = [
  'lib/jquery/dist/jquery.min.js',
  'lib/jquery-bracket/dist/jquery.bracket.min.js',
  'lib/angular/angular.min.js',
  'lib/angular-route/angular-route.min.js',
  'lib/angular-resource/angular-resource.min.js',
  'lib/angular-stripe-checkout/angular-stripe-checkout.min.js',
  'lib/angular-cookies/angular-cookies.min.js',
  'lib/textAngular/dist/textAngular-rangy.min.js',
  'lib/textAngular/dist/textAngular-sanitize.min.js',
  'lib/textAngular/dist/textAngular.min.js',
  'lib/ngstorage/ngStorage.min.js',
  'lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'lib/toastr/toastr.min.js',
  'lib/moment/min/moment.min.js',
  'lib/angular-recaptcha/release/angular-recaptcha.min.js',
  'lib/angulartics/dist/angulartics.min.js',
  'lib/angulartics-google-analytics/dist/angulartics-ga.min.js',
  'lib/ng-sortable/dist/ng-sortable.min.js',
  'lib/chart.js/dist/Chart.min.js',
  'lib/angular-chart.js/dist/angular-chart.min.js',
  'lib/bootstrap/dist/js/bootstrap.min.js',
  'lib/underscore/underscore-min.js',
  'lib/leaflet/dist/leaflet.js',
  'lib/angular-simple-logger/dist/angular-simple-logger.min.js',
  'lib/ui-leaflet/dist/ui-leaflet.min.js',
  'assets/ng-breadcrumbs.min.js'
];

// TODO: get rid of all those scripts
var jsFromAssetsTemplate = [
  'assets/template/js/tabs.js'
];

// injects all dependencies into dev index.html
gulp.task('index', ['less'], function () {
  var target = gulp.src('./index.html');

  gulp.src('config/config.json')
    .pipe(gulpNgConfig('fordere.config', {
      environment: 'local',
      wrap: true
    }))
    .pipe(gulp.dest('./app'));

  var appJsFiles = gulp.src(externalJsFiles.concat(['./app/**/*.js'], jsFromAssetsTemplate, './css/**/*.css', externalCssFiles), { read: false });

  return target.pipe(inject(appJsFiles, {
    transform: function (filepath) {
      if (filepath.slice(-3) === '.js') {
        return '<script src="' + filepath + '?v=' + version + '"></script>';
      } else if (filepath.slice(-4) === '.css') {
        return '<link rel="stylesheet" href="' + filepath + '?v=' + version + '" />';
      }
      // Use the default transform as fallback:
      return inject.transform.apply(inject.transform, arguments);
    }
  }))
    .pipe(gulp.dest('./'));
});

gulp.task('switch-environment', function () {
  gulp.src('config/config.json')
      .pipe(gulpNgConfig('fordere.config', {
        environment: argv.environment
      }))
      .pipe(gulp.dest(path.join(targetDir, 'js')));
});

// creates the release build in ./dist
gulp.task('dist', ['templates', 'less'], function () {
  gulp.start('assets');

  gulp.src('config/config.json')
     .pipe(gulpNgConfig('fordere.config', {
       environment: 'production',
       wrap: true
     }))
     .pipe(gulp.dest('./app'));

  var externalFileStream = gulp.src(externalJsFiles);
  //.pipe(strip());


  var appJsStream = gulp.src(['./app/app.js'].concat(['./app/**/!(app)*.js'], jsFromAssetsTemplate))
    .pipe(babel({
      compact: false,
      presets: ['es2015']
    }))
    .pipe(uglify().on('error', gutil.log));

  var jsStream = streamqueue({ objectMode: true }, externalFileStream, appJsStream)
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist'));

  var appCssStream = gulp.src(externalCssFiles.concat('./css/**/*.css'))
    .pipe(concat('styles.css'))
    .pipe(cssmin({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('dist'));

  gulp.src('./index.html')
    .pipe(inject(es.merge(jsStream, appCssStream), {
      ignorePath: '/dist/',
      transform: function (filepath) {
        if (filepath.slice(-3) === '.js') {
          return '<script src="' + filepath + '?v=' + version + '"></script>';
        } else if (filepath.slice(-4) === '.css') {
          return '<link rel="stylesheet" href="' + filepath + '?v=' + version + '" />';
        }
        // Use the default transform as fallback:
        return inject.transform.apply(inject.transform, arguments);
      }
    }))
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));

  gulp.src('./sitemap.xml').pipe(gulp.dest('dist'));
});

// writes all angular templates in one .js file
gulp.task('templates', ['clean'], function () {
  gulp.src('app/**/*.html')
     .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(templateCache({ module: 'fordere', root: 'app/' }))
    .pipe(gulp.dest('./app/'));
});

// copy assets to dist
gulp.task('assets', function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['./assets/**/*.*', '!./assets/template', '!./assets/template/**'], { base: './' })
    .pipe(gulp.dest('dist'));
});

// cleans the dist directory
gulp.task('clean', function (cb) {
  return gulp.src('./dist', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('less', function () {
  gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./css/02_compiled'));
});

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      host: '127.0.0.1',
      fallback: '/index.html'
    }));
});

gulp.task('dist-webserver', function () {
  gulp.src('./dist/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      host: '127.0.0.1',
      fallback: './dist/index.html'
    }));
});

gulp.task('watch', function () {
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('app/**/*.html', ['templates']);
});

// Default task
gulp.task('default', ['index', 'watch', 'webserver'], function () {
});
