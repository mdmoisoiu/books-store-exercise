module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'lib/assets/js/lib/jquery.min.js',
      'lib/assets/js/lib/angular.js',
      'lib/assets/js/lib/angular-ui-router.min.js',
      'lib/assets/js/lib/lodash.min.js',
      'lib/assets/js/app/app.js',
      'lib/assets/js/app/components/**/*.js',
      'test-frontend/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
        'karma-chrome-launcher',
        'karma-coverage',
        'karma-jasmine'
    ],


    reporters: ['progress', 'coverage'],

    preprocessors: {
      'lib/assets/js/app/components/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }

  });
};
