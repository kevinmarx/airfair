var conf = module.exports = {}
var env = conf.NODE_ENV = process.env.NODE_ENV || 'development'

conf.config = __filename
conf.appRoot = __dirname

conf.server = {
  port: process.env.PORT || 3080,
  host: 'localhost',
  cluster: { size: require('os').cpus().length }
}

conf.templating = {
  templatePath: __dirname + '/app/templates'
}

conf.cookies = {}

conf.session = {}

conf.logging = {
  name: 'AirFair',
  streams: [{
    level: 'trace',
    stream: process.stdout
  }]
}

conf.errorPage = {
  debug: true
}

conf.timeout = 20

conf.colorScheme = ['blue', 'green', 'orange', 'yellow', 'purple', 'pink']

// Try to load environment configuration
var envconf
try {
  envconf = require('./config/' + env + '.js')
  console.log('Loading environment configuration: ' + env)
} catch (err) {
  console.log('No environment configuration found for ' + env)
  envconf = {}
}

Object.keys(envconf).forEach(function (key) {
  conf[key] = envconf[key]
})

if (module === require.main) {
  console.log(conf)
  process.exit(0)
}
