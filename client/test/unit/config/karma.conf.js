module.exports = function(config) {
  var configuration = {

    // base path that will be used to resolve all patterns
    basePath: '.',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      '../../../bower_components/jquery/dist/jquery.min.js',
      '../../../bower_components/angular/angular.min.js',
      '../../../bower_components/angular-mocks/angular-mocks.js',
      '../../../bower_components/angular-ui-router/release/angular-ui-router.min.js',
      '../../../bower_components/ng-tags-input/ng-tags-input.js',
      '../../../bower_components/underscore/underscore-min.js',
      '../../../bower_components/rxjs/dist/rx.all.min.js',
      '../../../bower_components/angular-cookies/angular-cookies.min.js',
      '../../../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      '../../../bower_components/angular-sanitize/angular-sanitize.min.js',
      '../../../bower_components/ui-select/dist/select.min.js',
      '../../../bower_components/firebase/firebase.js',
      '../../../bower_components/angularfire/dist/angularfire.min.js',
      '../../../bower_components/moment/min/moment.min.js',

      './../*.js', //spec files
      '../../../../client/app/**/*.js' //client
    ],

    // test result reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    // Continuous Integration mode
    singleRun: false
  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
    // configuration.reporters = configuration.reporters.concat(['coverage', 'coveralls']);
    // configuration.coverageReporter = {
    //   type : 'lcovonly',
    //   dir : 'coverage/'
    // };
  }

  config.set(configuration);
};