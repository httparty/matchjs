var helpers = require('../db/helpers');
var search = require('../search/search');
var sendEmail = require('../email/emailHandler');

module.exports = {

  getAllUsersRec: function(req,res) {
    var username = req.params.username;
    helpers.getAllUsersRec(username)
    .then(function(usersArray) {
      res.send(usersArray);
    });
  },

  getAllUsers: function(req,res) {
    var username = req.params.username;
    helpers.getAllUsers(username)
    .then(function(usersArray) {
      res.send(usersArray);
    });
  },

  getUserProfileData: function(req, res) {
    helpers.getUserByUserName(req.params)
    .then(function(user) {
      res.send(user);
    });
  },

  updateProfile: function(req, res) {
    helpers.updateUser(req.body)
    .then(function(user) {
      res.send(user);
    });
  },

  getUsersByLocation: function(req, res) {
    var location = req.params.cityname;
    helpers.getUsersByLocation(location)
    .then(function(usersArray) {
      res.send(usersArray);
    });
  },

  addPadawan: function(req, res) {
    var username = req.params.username;
    var padawan = req.body.username;
    console.log('ADDPADAWAN: USERNAME', username);
    console.log('ADDPADAWAN: PADAWAN', padawan);
    helpers.addPadawan(username, padawan)
    .then(function(user) {
      // helpers.getUserByUserName()
        .then(function(thisUser) {
          var mentorEmail = thisUser.get('email');
      // sendEmail.newPadawan()
        })
      res.send('success');
    });
  },

  getPadawans: function(req, res) {
    var username = req.params.username;
    helpers.getPadawansByMentor(username)
    .then(function(padawans) {
      res.status(200).send(padawans);
    });
  },

  deletePadawan: function(req, res) {
    var mentor = req.params.mentor;
    var padawan = req.params.padawan;
    helpers.deletePadawan(mentor, padawan)
    .then(function(resp) {
      res.status(200).send('successfully deleted padawan status');
    });
  },

  getUsersByQuery: function(req, res) {
    helpers.getAllUsers()
    .then(function(usersArray) {
      res.send(search.getSearchResults(req.query, usersArray));
    });
  }
};