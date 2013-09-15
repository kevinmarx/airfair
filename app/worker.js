var path = require('path')
var config = require('../config')

var routes = require('./routes')
var i18n = require('i18next')
var i18nPath = path.normalize( __dirname + '/../public/locales/__lng__/__ns__.json' )
i18n.init({ lng: "en", resGetPath: i18nPath })

// set the root directory for the app
config.appRoot = __dirname

var App = require('nokomis').App

var AirFair = App.extend({

  initialize: function(options) {

  },

  setupRoutes: routes

})

module.exports = AirFair
