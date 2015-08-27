module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['ng-scenario'],
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    //browsers: ['PhantomJS'],
    browsers: ['Chrome', 'PhantomJS'],
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000,
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,
    port: 9876,
    autoWatch: false,
    urlRoot: '/_karma_/',
    proxies: {
      //'/': 'http://epkzkarw0247.moscow.epam.com:3000/'
      '/': 'http://localhost:3000/'
    },
    files: [
      //'bower_components/angular-mocks/angular-mocks.js',
      //'bower_components/angular-scenario/angular-scenario.js',
      /*'app/!**!/!*.js',
      'app/!*.js',*/
      'app/**/*.spec.e2e.js'
    ],
    // test results reporter to use
    // possible values: dots || progress || growl
    reporters: ['progress', 'growl'],
    // for debug use config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    plugins: [
      // 'karma-mocha',
      // 'karma-jasmine',
      'karma-ng-scenario',
      //'karma-growl-reporter',
      'karma-chrome-launcher',
      //'karma-firefox-launcher',
      //'karma-safari-launcher',
      'karma-phantomjs-launcher'
    ]
  });
};
