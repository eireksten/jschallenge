var _ = require('lodash');

var jshint_common_options = {
  eqeqeq: true,
  latedef: 'nofunc',
  undef: true,
  unused: true,
  strict: true,
  trailing: true,
  maxparams: 5,
  noempty: true,
  newcap: true,
  indent: 2,
  immed: true,
  forin: true
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      server: {
        options: _.assign({
          node: true
        }, jshint_common_options),
        src: ['server.js', 'server/**/*.js']
      },
      client: {
        options: _.assign({
          browser: true,
          globals: {
            Zepto: true,
            $: true
          }
        }, jshint_common_options),
        src: ['client/js/src/**/*.js']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', 
    ['server', 'client']);

  grunt.registerTask('server',
    ['jshint:server', 'mochaTest']);

  grunt.registerTask('client',
    ['jshint:client']);
};