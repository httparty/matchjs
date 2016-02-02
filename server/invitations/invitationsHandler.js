var helpers = require('../db/helpers.js');
var emailer = require('../email/emailHandler');


module.exports = {
  createInvitation: function(req,res) {
    // var username = req.cookies['user-profile'].username;
    var username = req.body.mentor;

    var invitee = req.body.mentee;
    var sessionInfo = req.body.sessionInfo;

    emailer.invitationConfirm(req.body);

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
              emailer.inviteHasBeenUpdated(updatedInvite);
              res.send('success! invite has been updated and mentor and mentee have received emails.');
            });
        });
    });
  },

  deleteInvitation: function(req, res) {
    var inviteId = req.params.inviteId;
    var mentorObj = {};
    mentorObj.username = req.params.mentor;
    var menteeObj = {};
    menteeObj.username = req.params.mentee;
    var deletedInviteData = {};
    deletedInviteData.mentor = {};
    deletedInviteData.mentor.username = mentorObj.username;
    deletedInviteData.mentee = {};
    deletedInviteData.mentee.username = menteeObj.username;

    helpers.getInvitationById(inviteId)
    .then(function(invite) {
      deletedInviteData.when = invite.dataValues.when;
      deletedInviteData.location = invite.dataValues.location;
      helpers.getUserByUserName(mentorObj)
        .then(function(mentor) {
          deletedInviteData.mentor.email = mentor.dataValues.email;
          deletedInviteData.mentor.name = mentor.dataValues.name;
          helpers.getUserByUserName(menteeObj)
            .then(function(mentee) {
              deletedInviteData.mentee.email = mentee.dataValues.email;
              deletedInviteData.mentee.name = mentee.dataValues.name;
              emailer.inviteHasBeenDeclined(deletedInviteData);
              helpers.deleteInvitation(inviteId)
                .then(function(invite) {
                  res.status(200).send('Invitation has been deleted, and mentor and mentee have been updated by email.');
                });
            });
        });

    });

  }
};












