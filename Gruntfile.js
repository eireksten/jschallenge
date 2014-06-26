var _ = require('lodash');

var clientlibraries = [
  'client/bower_components/zepto/zepto.min.js',
  'client/bower_components/lodash/dist/lodash.min.js',
  'client/bower_components/handlebars/handlebars.min.js'
];

var jshint_common_options = {
  eqeqeq: true,
  latedef: 'nofunc',
  nonew: true,
  undef: true,
  strict: true,
  trailing: true,
  maxparams: 5,
  noempty: true,
  indent: 2,
  immed: true,
  forin: true
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      clientscripts: {
        files: ['client/js/src/*.js'],
        tasks: ['jshint:client', 'uglify:src']
      },
      templates: {
        files: ['client/templates/**/*.hbs'],
        tasks: ['handlebars']
      }
    },
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
            $: true,
            _: true
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
    },
    concat: {
      libs: {
        src: clientlibraries,
        dest: 'client/js/libs.js'  
      }
    },
    uglify: {
      src: {
        options: {
          banner: '/*! <%= pkg.name %> by eireksten */',
          sourceMap: true,
          sourceMapName: 'client/js/src.map',
          compress: true
        },
        src: ['client/js/src/*.js'],
        dest: 'client/js/src.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['Chrome']
      }
    },
    handlebars: {
      options: {
        namespace: 'challenge.templates',
        processName: function (filepath) {
          return filepath.substring(filepath.lastIndexOf('/') + 1, filepath.lastIndexOf('.'));
        }
      },
      build: {
        src: ['client/templates/*.hbs'],
        dest: 'client/js/templates.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', 
    ['server', 'client']);

  grunt.registerTask('server',
    ['jshint:server', 'mochaTest']);

  grunt.registerTask('client',
    ['jshint:client', 'concat:libs', 'karma', 'uglify', 'handlebars']);
};