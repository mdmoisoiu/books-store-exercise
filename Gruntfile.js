'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-concurrent');

    // configurable paths
    var yeomanConfig = {
        app: 'lib/assets/'
    };

    var libJsFiles = [
        '<%= yeoman.app %>js/lib/jquery.min.js',
        '<%= yeoman.app %>js/lib/angular.min.js',
        '<%= yeoman.app %>js/lib/angular-ui-router.min.js'
    ];
    var codeFiles = [
        '<%= yeoman.app %>js/app/app.js',
        '<%= yeoman.app %>js/app/components/**/*.js',
        '<%= yeoman.app %>js/templates.js'
    ];

    grunt.initConfig({
        yeoman: yeomanConfig,

        concat: {
            lib: {
                files: {
                    '<%= yeoman.app %>js/lib.js': libJsFiles.concat('!<%= yeoman.app %>/**/*_test.js')
                }
            },
            source: {
                files: {
                    '<%= yeoman.app %>js/bookstore.js': codeFiles.concat('!<%= yeoman.app %>/**/*_test.js')
                },
                options: {
                  sourceMap: true
                }
            }
        },
        ngtemplates:  {
            app:        {
                cwd:      '<%= yeoman.app %>js/app',
                src:      'components/**/*.html',
                dest:     '<%= yeoman.app %>js/templates.js',
                options: {
                    module: 'bookstore.templates'
                }
            }
        },
        watch: {
            watchTemplates: {
                files: [
                    '<%= yeoman.app %>js/app/**/*.html'
                ],
                tasks: ['ngtemplates:app']
            },
            watchJS: {
                files: [
                    '<%= yeoman.app %>js/app/**/*.js',
                    '<%= yeoman.app %>js/templates.js'
                ],
                tasks: ['concat:source']
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
      concurrent: {
          options: {
              logConcurrentOutput: true
          },
          watch: {
              tasks: ["watch:watchTemplates", "watch:watchJS"]
          }
      }
    });

    grunt.registerTask('dev', [
      'ngtemplates:app',
      'concat:lib',
      'concat:source',
      'concurrent:watch'
    ]);

};
