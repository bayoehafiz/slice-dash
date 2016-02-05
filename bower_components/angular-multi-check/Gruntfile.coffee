'use strict'

module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  grunt.initConfig
    watch:
      coffee:
        files: ['src/**/*.coffee', 'test/**/*.coffee']
        tasks: ['coffeelint', 'coffee']
    coffee:
      main:
        files: [{
          cwd: 'src'
          dest: 'dist'
          src: ['**/*.coffee']
          expand: true
          ext: '.js'
        }
        {
          cwd: 'test'
          dest: 'test'
          src: ['**/*.coffee']
          expand: true
          ext: '.js'
        }]
    coffeelint:
      main:
        files:
          src: [
            'src/**/*.coffee'
            'test/**/*.coffee'
            'Gruntfile.coffee'
          ]
        options:
          'no_trailing_whitespace': level: 'ignore'
          'max_line_length': level: 'ignore'
  grunt.registerTask 'default', [
    'coffee'
    'watch'
  ]