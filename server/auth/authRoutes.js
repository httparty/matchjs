var authHandler = require('./authHandler.js');

module.exports = function(app) {
  app.get('/github', authHandler.initialLogin);
  app.get('/github/callback', authHandler.redirect, authHandler.success);
  app.get('/email/:email', authHandler.addEmail);
  app.get('/logout', authHandler.logOut);
};