var plugins = require('nokomis-plugins')
var Templating = plugins.Templating
var Handlebars = require('handlebars')

var HBTmpl = module.exports = Templating.extend({

  initialize: function(config) {
    var self = this
    HBTmpl.__super__.initialize.apply(this, arguments)
    this.tmpl.templatePath = config.templatePath
    this.tmpl.engine = Handlebars
    this.tmpl.extension = 'hb'
    this.tmpl.preload(null, function(){
      registerPartials(self.tmpl.cache)
      registerHelpers(config.templatePath)
    })
  }

})

function registerPartials(templates) {
  Object.keys(templates).forEach(function(file) {
    Handlebars.registerPartial(file.replace(/\//g,'.'), templates[file])
  })
}

function registerHelpers(basePath) {
  var glob = require('glob')

  glob.sync(basePath + '/helpers/**/*.js').forEach(function(s) {
    require(s)
  })
}
