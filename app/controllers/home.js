"use strict"

var Controller = require('./base')

var Home = module.exports =  Controller.extend({

  initialize: function(options) {
    Home.__super__.initialize.apply(this, arguments)
    this.after({
      'serialize': {format:'json'},
      'jsonify': {format:'json', verb:['POST', 'PUT', 'DELETE']}
    })
  },

  show: function(done) {
    this.template = 'home'
    done()
  }

})
