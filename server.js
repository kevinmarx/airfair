var config = require('./config')
if (config.NODE_ENV != 'development') {
  require('newrelic')
}

var App = require('nokomis').App

// start the app with the provided worker script
config.worker = config.appRoot + '/app/worker.js'

App.start(config)
