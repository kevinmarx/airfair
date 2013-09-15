var Handlebars = require('handlebars')
var i18n = require('i18next')
var _ = require('underscore')

// Basic functionality
Handlebars.registerHelper('t', function(context, options) {
  // If context is not a string or empty, don't even try to translate
  if (typeof context !== 'string' || context === '') return ''

  var opts = _.clone(options.hash)
  // setting values to an empty string so that the translator won't choke on null or undefined values
  _.each(opts, function(value, key, list){
    if (value === null || value === undefined) list[key] = ""
  })
  if (opts.sprintf) {
    opts.postProcess = 'sprintf'
    opts.sprintf = opts.sprintf.split('|')
  }
  if (options.fn) opts.defaultValue = options.fn(context);

  var result = ''
  if (opts.subkey) {
    opts.returnObjectTrees = true
    result = i18n.t(context + '.' + opts.subkey, opts)
  } else {
    result = i18n.t(context, opts);
  }
  return options.fn ? options.fn(result) : new Handlebars.SafeString(result)
})
