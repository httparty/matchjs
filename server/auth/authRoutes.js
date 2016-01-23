var authHandler = require('./authHandler.js');

module.exports = function(app) {
  app.get('/github', authHandler.initialLogin);
  app.get('/github/callback', authHandler.redirect, authHandler.success);
};