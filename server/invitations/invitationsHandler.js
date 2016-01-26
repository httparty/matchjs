var helpers = require('../db/helpers.js');

module.exports = {
  createInvitation: function(req,res) {
    var username = req.cookies['user-profile'].username;
    var invitee = req.body.invitee;
    var sessionInfo = req.body.sessionInfo;

    helpers.createInvitation(username,invitee,sessionInfo);
    res.send('Post successful');
  }
};