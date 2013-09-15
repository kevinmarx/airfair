"use strict"
var nokomis = require('nokomis')
var Controller = nokomis.Controller
var Plugin = nokomis.Plugin
var plugins = require('nokomis-plugins')
var _ = require('underscore')

var config = require('../../config')

var BaseController = module.exports = Controller.extend({

  initialize: function(options) {
    if (this.currentUser) {
      this.currentUser.thirdNorth =
        this.currentUser.isThirdNorth() ||
        (config.ngin.whitelistedUsers && !!~config.ngin.whitelistedUsers.indexOf(this.currentUser.id))
    }
  },

  serialize: function(callback) {
    this.model || (this.model = {})
    callback()
  },

  jsonify: function(callback) {
    if (this.model != null && typeof this.model == 'object') {
      var key = Object.keys(this.model)[0]
      this.model = key ? this.model[key] : this.model
    }
    callback()
  }

})

Plugin.makePluggable(BaseController)

BaseController.addPlugin(plugins.ContentNegotiator)
BaseController.addPlugin(plugins.Cookies, config.cookies)
BaseController.addPlugin(plugins.Session, config.session)
BaseController.addPlugin(plugins.Errors, config.errorPage)
BaseController.addPlugin(plugins.Timeout, config.timeout)
BaseController.addPlugin(plugins.Respond)
BaseController.addPlugin(plugins.PostData)

BaseController.addPlugin(require('../plugins/hbtmpl'), config.templating)

