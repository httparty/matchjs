var emailHandler = require('./emailHandler.js');

module.exports = function(app) {
  app.get('/signupConfirm',emailHandler.signupConfirm);
  app.get('/sentMessage/:user',emailHandler.sentMessage);
};