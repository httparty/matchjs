var emailHandler = require('./emailHandler.js');

module.exports = function(app) {
  app.get('/signupConfirm',emailHandler.signupConfirm);
};