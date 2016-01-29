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

  updateInvitationBySender: function(req, res) {
    var username = req.params.username;
    var inviteData = req.body;
    // console.log('here is inviteData WOOOO', inviteData);
    helpers.updateInvitation(inviteData)
    .then(function(invite) {
      res.status(200).send(invite);
    });
  },

  deleteInvitation: function(req, res) {
    var inviteId = req.params.inviteId;
    helpers.deleteInvitation(inviteId)
    .then(function(invite) {
      res.status(200).send('Invitation has been deleted.')
    })
  }
};
