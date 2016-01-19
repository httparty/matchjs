var expect = require('chai').expect;
var request = require('request');
// var app = require('../server/server');  //Uncomment this when using the middleware is built out
var chai = require('chai');

describe('Server Tests', function() {
  describe('Basic Test', function() {
    it('Passes basic test 1 = 1', function() {
      expect(1).to.equal(1);
    });
  });

  describe('Second Test', function(){
    it('Passes more than one test', function(){
      expect(true).to.equal(true);
    });
  });
});
