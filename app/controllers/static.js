"use strict"

// static file module

var Base = require('./base')
var path = require('path')
var url = require('url')
var crypto = require('crypto')
var glob = require('glob')
var zlib = require('zlib')
var fs = require('fs')
var mimetypes = require('filed/mimetypes.js')
var cache = {}

/**
 * Read all public files into memory
 */
glob.sync('public/**/*.*').forEach(function(s) {
  s = path.join(__dirname, '../..', s)
  fs.readFile(s, function(err, raw){
    if (err) throw err
    render(s, raw, function(err){
      if (err) throw err
    })
  })
})

/**
 * Caches the file and it's meta data
 *
 * @param {String} s
 * @param {String} raw
 * @param {Function} cb
 * @api private
 */

function render(s, raw, cb) {
  if (cache[s]) return cb()
  var etag = getETag(raw)
  zlib.gzip(raw, function(err, gz){
    if (err) return cb(err)
    var ext = path.extname(s).substr(1)
    var type = mimetypes.lookup(ext)
    cache[s] = [etag, raw, gz, type]
    cb()
  })
}

/**
 * Responds to the request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Array} cache
 * @api private
 */

function send(controller, cache) {
  var etag = cache[0]
  var raw = cache[1]
  var gz = cache[2]
  var type = cache[3]
  var req = controller.req
  var res = controller.res

  if (req.headers['if-none-match'] === etag) {
    res.statusCode = 304
    return res.end()
  }

  var enc = controller.preferredEncoding(['gzip', 'identity'])
  res.setHeader('content-type', type)
  res.setHeader('etag', etag)
  if (enc === 'gzip') {
    res.setHeader('content-encoding', 'gzip')
    res.end(gz)
  } else {
    res.end(raw)
  }
}

/**
 * Generate etag from a string
 *
 * @param {String} str
 * @returns {String}
 * @api public
 */

function getETag(str) {
  var hash = crypto.createHash('sha1')
  hash.update(str)
  return '"' + hash.digest('base64') + '"'
}

/**
 * Entry point for the controller
 * - responds with cached file or loads it
 *
 * @param {Object} req
 * @param {Object} res
 * @api public
 */


var Static = module.exports = Base.extend({

  authPassThrough: true,

  show: function(done) {
    var self = this
    var req = this.req
    var res = this.res

    var reqUrl = url.parse(req.url)

    var f = reqUrl.pathname
    var d = path.join(__dirname, '../../public', f)

    if (cache[d] && !this.config.NODE_ENV == 'development') return send(this, cache[d])

    fs.readFile(d, function(err, raw) {
      if (err) return self.error(404)
      render(d, raw, function(err) {
        send(self, cache[d])
        done()
      })
    })
  }
})
