"use strict"

var Controller = require('./base')

var Home = module.exports =  Controller.extend({

  templateOptions: {
    layout: 'layout'
  },

  initialize: function(options) {
    Home.__super__.initialize.apply(this, arguments)
    this.after({
      'serialize': {format:'html'},
      'jsonify': {format:'json', verb:['POST', 'PUT', 'DELETE']}
    })
  },

  show: function(done) {
    this.template = 'home'
    done()
  }

})
