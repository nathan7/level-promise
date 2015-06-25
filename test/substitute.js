'use strict'
/*global describe, beforeEach, it*/
/*jshint expr: true*/
var sinon = require('sinon')
  , Promise = require('promise')
  , substitute = require('../substitute.js')
  , expect = require('chai').expect

describe('substitute', function() {
  var DB = {}
    , METHOD_NAME = 'METHOD_NAME'
    , METHOD = sinon.spy()
    , PROMISE_METHOD = sinon.spy()

  Promise.denodeify = sinon.stub()
  Promise.denodeify.returns(PROMISE_METHOD)

  beforeEach(function() {
    METHOD.reset()
    PROMISE_METHOD.reset()
    Promise.denodeify.reset()
  })


  it('wrapps the named method', function() {
    substitute(DB, METHOD_NAME, METHOD)
    expect(Promise.denodeify.calledWith(METHOD)).to.be.true
  })

  it('calls a denodeify version if there is no callback', function() {
    substitute(DB, METHOD_NAME, METHOD)
    DB[METHOD_NAME]()

    expect(PROMISE_METHOD.calledOnce).to.be.true
  })

  it('calls the original version if there is a callback', function() {
    substitute(DB, METHOD_NAME, METHOD)
    DB[METHOD_NAME](function() {})

    expect(METHOD.calledOnce).to.be.true
    expect(PROMISE_METHOD.called).to.be.false
  })
})
