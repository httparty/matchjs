var invitationsHandler = require('./invitationsHandler.js');

module.exports = function(app) {
  app.post('/createInvitation',invitationsHandler.createInvitation);
};