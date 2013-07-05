var Manifest = require('level-manifest')
  , Promise = require('promise')
  , __hop = {}.hasOwnProperty

exports = module.exports = install
exports.install = install

function install(db) {
  var manifest = Manifest(db)
    , methods = manifest.methods

  for (var methodName in methods) if (__hop.call(methods, methodName)) {
    var method = methods[methodName]
    if (method.type === 'async')
      substitute(methodName, method)
  }

  function substitute(methodName, method){
    var methodP = Promise.denodeify(method)
    db[methodName] = function() {
      if (typeof arguments[arguments.length - 1] == 'function')
        method.apply(this, arguments)
      else
        return methodP.apply(this, arguments)
    }
  }
  
  return db
}
