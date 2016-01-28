var helpers = require('../db/helpers.js');

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
  }
};