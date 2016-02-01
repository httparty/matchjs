var helpers = require('../db/helpers.js');
var emailer = require('../email/emailHandler');


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
    var mentorObj = req.params;
    var inviteData = req.body;
    var menteeObj = {};
    menteeObj.username = req.body.mentee;

    helpers.updateInvitation(inviteData) 
    .then(function(invite) {
      var updatedInvite = invite.dataValues;
      helpers.getUserByUserName(mentorObj) 
        .then(function(mentor) {
          updatedInvite.mentorEmail = mentor.email;
          helpers.getUserByUserName(menteeObj)
            .then(function(mentee) {
              updatedInvite.menteeEmail = mentee.email;
              console.log('HERE IS UPDATED INVITE', updatedInvite);
              emailer.inviteHasBeenUpdated(updatedInvite);
              res.send('success! invite has been updated and mentor and mentee have received emails.');
            });
        });
    });
  },

  deleteInvitation: function(req, res) {
    var inviteId = req.params.inviteId;
    helpers.deleteInvitation(inviteId)
    .then(function(invite) {
      res.status(200).send('Invitation has been deleted.');
    });
  }
};












