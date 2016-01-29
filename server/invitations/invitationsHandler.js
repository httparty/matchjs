var helpers = require('../db/helpers.js');

module.exports = {
  createInvitation: function(req,res) {
    var username = req.cookies['user-profile'].username;
    var invitee = req.body.mentee;
    var sessionInfo = req.body.sessionInfo;
    console.log('Invitee', invitee);
    console.log('Username', username);
    console.log('SessionInfo', sessionInfo);


    helpers.createInvitation(username,invitee,sessionInfo)
    .then(function(invitation) {
      res.send(invitation);
    });
  },
  
  getInvitationsBySender: function(req, res) {
    var username = req.params.username;

    helpers.getInvitationsBySender(username)
    .then(function(invitations) {
      res.send(invitations);
    });
  },

  getInvitationsByRecipient: function(req, res) {
    var username = req.params.username;

    helpers.getInvitationsByRecipient(username)
    .then(function(invitations) {
      res.send(invitations);
    });
  },

  deleteInvitationByInvitationID: function(req, res) {
  }
};
