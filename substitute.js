"use strict";
var Promise = require("promise")

exports = module.exports = substitute

function substitute(db, methodName, method){
  db[methodName] = _wrap(method, Promise.denodeify(method))
}

function _wrap(method, methodP) {
  return function () {
    var last_argument = arguments[arguments.length - 1] 
    if (typeof last_argument == 'function')
      method.apply(this, arguments)
    else
      return methodP.apply(this, arguments)
  }
}
