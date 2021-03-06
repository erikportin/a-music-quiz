// Karma configuration
// Generated on Thu Dec 19 2013 15:26:22 GMT+0800 (SGT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
        'scripts/services/settingsService.js',
        'scripts/vendor/log.js',
        'scripts/vendor/q.js',
        'scripts/vendor/ajax.js',
        'test/utilities/**/*.js',
        'test_libs/react-with-addons.js',
        'app/build_jsx/**/*.js',        
        'app/scripts/**/*.js',
        'test/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      'app/vendor/**/*.js',
      'scripts/services/settingsService.js'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
