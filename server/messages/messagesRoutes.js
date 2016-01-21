var messagesHandler = require('./messagesHandler.js');

module.exports = function(app) {
  app.post('/inbox/sendMessage', messagesHandler.sendMessage);
  app.get('/inbox/displayMessages', messagesHandler.displayMessages)
};
