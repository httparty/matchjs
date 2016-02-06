'use strict';

var emailHandler = require('./emailHandler.js');

module.exports = function(app) {
  app.post('/sentMessage/',emailHandler.sentMessage);
};