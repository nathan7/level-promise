'use strict';
var Manifest = require('level-manifest')
  , substitute = require('./substitute')
  , __hop = {}.hasOwnProperty
  , extraMethods = ['open', 'close']

exports = module.exports = install
exports.install = install

function install(db) {
  _install(db)
  return db
}

function _install(db, manifest) {
  manifest = manifest || new Manifest(db)

  var methods = manifest.methods
  for (var methodName in methods) if (__hop.call(methods, methodName)) {
    var method = methods[methodName]
    if (method.type === 'async')
      substitute(db, methodName, db[methodName])
    if (method.type === 'object')
      _install(db[methodName], method)
  }

  extraMethods.forEach(function(methodName) {
    if (!manifest.methods[methodName] && typeof db[methodName] == 'function')
      substitute(db, methodName, db[methodName])
  })

  var sublevels = manifest.sublevels || {}
  for (var sublevelName in sublevels) if (__hop.call(sublevels, sublevelName))
    _install(db.sublevels[sublevelName], sublevels[sublevelName])

  if (typeof db.sublevel == 'function') {
    var Sublevel = db.sublevel
    db.sublevel = function(sublevelName) {
      var existing = __hop.call(sublevels, sublevelName)
        , sublevel = Sublevel.apply(this, arguments)
      if (!existing)
        _install(sublevel)
      return sublevel
    }
  }
}
