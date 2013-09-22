/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
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
    }
  });

  // Default task.
  // put require before handlebars because require wipes the dir
  grunt.registerTask('default', ['jshint'])
  grunt.registerTask('test',    ['jshint', 'mocha'])

  // load the grunt task plugins
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-mocha')
};
