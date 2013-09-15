// don't need all sorts of workers locally, 2 is plenty to ensure things are
// working
// exports.cluster = { size: 2 }
exports.server = {
  port: process.env.PORT || 3080,
  host: 'localhost',
  cluster: {
    size: process.env.MAX_COULEES || 2,
    enabled:false
  }
}

// set a two minute timeout
exports.requestTimeout = 20


exports.logging = {
  name: 'mySite DEV',
  streams: [{
    level: 'trace',
    stream: process.stdout
  }]
}

// look for a local config and load it if it exists
try {
  var local = require('./local')
  console.warn('Loading local config instead of development')
  module.exports = local
} catch(ex) {}
