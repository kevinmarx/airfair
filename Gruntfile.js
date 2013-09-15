/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    concat: {
      helpers: {
        src: [ 'client-wrappers/client-amd-header.js', 'app/templates/helpers/*.js', 'client-wrappers/client-amd-footer.js' ],
        dest: 'app/assets/js/lib/helpers.js'
      }
    },
    handlebars_requirejs: {
      options: {
        processName: function(file) {
          file = file.replace('app/templates/', '')
          file = file.substr(0, file.lastIndexOf('.'))
          return file
        },
        makePartials: true
      },
      basic: {
        src: 'app/templates/**/*.hb*',
        dest: 'app/assets/js/tmpl/'
      }
    },
    mocha: { // for running client/browser tests
      files: ['test-client/**/*.html']
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        asi: true,
        devel: true,
        globals: {
          requirejs: true,
          jQuery: true,
          require: true,
          define: true,
          sinon: true,
          _: true,
          describe: true,
          it: true,
          before: true,
          beforeEach: true,
          after: true,
          afterEach: true,
          assert: true
        }
      },
      all: ['Gruntfile.js', 'app/assets/js/!(lib|plugins|templates|tmpl|ui)/**/*.js', 'test-client/spec/**/*.js', 'app/templates/helpers/**/!(debugger).js']
    },
    compass: {
      dev: {
        options: {
          sassDir: 'app/assets/scss',
          cssDir: 'public/css',
          outputStyle: 'expanded',
          imagesDir: 'public/img',
          noLineComments: false,
          bundleExec: true
        }
      },
      prod: {
        options: {
          sassDir: 'app/assets/scss',
          cssDir: 'public/css',
          outputStyle: 'compressed',
          imagesDir: 'public/img',
          noLineComments: true,
          force: false,
          bundleExec: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: "./app/assets/js",
          baseUrl: "./",
          mainConfigFile: "./app/assets/js/main.js",
          modules: [ { name:'main' } ],
          dir: "./public/js",
          paths: {
            "jquery": "empty:"
          },
          uglify: {
            beautify: false
          }
        }
      }
    },
    exec: {
      make_public: {
        command: 'mkdir -p public',
        stdout: true
      },
      clean_public: {
        command: "rm -rf `find public/* -type d -name '*' -prune -a -type d ! -name 'locales'`",
        stdout: true
      },
      clean_appjs: {
        command: 'rm -rf app/assets/js/tmpl/*',
        stdout: true
      }
    },
    copy: {
      assets_to_public: {
        dest:'public/js/', src:['**/**'], cwd:'app/assets/js/', expand:true
      },
      test_js: {
        dest:'public/js/test/', src:'**/**', cwd:'test-client/', expand:true
      }
    },
    watch: {
      templates: {
        files: '<%= handlebars_requirejs.basic.src %>',
        tasks: ['handlebars_requirejs']
      },
      helpers: {
        files: ['app/templates/helpers/**/*.js'],
        tasks: ['jshint', 'concat:helpers', 'copy:assets_to_public']
      },
      js: {
        files: ['app/assets/js/**/!(helpers).js', 'test-client/spec/**/*.js'],
        tasks: ['jshint', 'copy:assets_to_public']
      },
      compass: {
        files: ['app/assets/scss/**/*.scss'],
        tasks: ['compass:dev']
      }
    }
  });

  // Default task.
  // put require before handlebars because require wipes the dir
  grunt.registerTask('default', ['handlebars_requirejs', 'concat:helpers', 'exec:make_public', 'copy:assets_to_public'])
  grunt.registerTask('js',      ['jshint', 'concat:helpers', 'exec:make_public', 'copy:assets_to_public'])
  grunt.registerTask('tmpl',    ['handlebars_requirejs', 'concat:helpers', 'exec:make_public', 'copy:assets_to_public'])
  grunt.registerTask('dev',     ['cleanup', 'jshint', 'default', 'compass:dev'])
  grunt.registerTask('prod',    ['default', 'compass:prod', 'requirejs'])
  grunt.registerTask('test',    ['jshint', 'copy:assets_to_public', 'copy:test_js', 'simplemocha', 'mocha'])
  grunt.registerTask('cleanup', ['exec:clean_appjs', 'exec:clean_public'])

  // load the grunt task plugins
  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-contrib-compress')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-mocha')
  grunt.loadNpmTasks('grunt-handlebars-requirejs')
  grunt.loadNpmTasks('grunt-exec')
};
