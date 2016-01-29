var invitationsHandler = require('./invitationsHandler.js');

module.exports = function(app) {
  app.post('/createInvitation', invitationsHandler.createInvitation);
  app.get('/sender/:username', invitationsHandler.getInvitationsBySender);
  app.post('/sender/:username', invitationsHandler.updateInvitationBySender);
  app.get('/recipient/:username', invitationsHandler.getInvitationsByRecipient);
};
