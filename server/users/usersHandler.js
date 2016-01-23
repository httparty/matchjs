var helpers = require('../db/helpers.js');
var db = require('../db/config.js');

module.exports = {
  getAllUsers: function(req,res) {
    return db.User.findAll()
    .then(function(usersArray) {
      console.log('HERE ARE ALL USERS', usersArray);
      res.send(usersArray);
    });
  },

  getUserProfileData: function(req, res) {
    helpers.getUserByUserName(req.params)
    .then(function(user) {
      res.send(user);
    });
  },

  updateProfileBasics: function(req, res) {
    helpers.updateUserBasics(req.body)
    .then(function(user) {
      res.send(user);
    });
  }
};

