var invitationsHandler = require('./invitationsHandler.js');

module.exports = function(app) {
  app.post('/createInvitation', invitationsHandler.createInvitation);
  app.get('/sender/:username', invitationsHandler.getInvitationsBySender);
  app.delete('/invite/:inviteId/:mentor/:mentee', invitationsHandler.deleteInvitation);
  app.post('/sender/:username', invitationsHandler.updateInvitationBySender);
  app.get('/recipient/:username', invitationsHandler.getInvitationsByRecipient);
};
