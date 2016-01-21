var helpers = require('../db/helpers.js');
var db = require('../db/config.js');

module.exports = {
	getAllUsers: function(req,res) {
		// return helpers.getAllUsers;
		// var users = helpers.getAllUsers;
		// res.end(users);
		return db.User.findAll()
		.then(function(usersArray) {
			console.log('HERE ARE ALL USERS', usersArray);
			// return usersArray;
			res.send(usersArray);
		})
	},

	getUserProfileData: function(req, res) {
		//var username = req.params.username
	},

	updateProfileSkills: function(req, res) {

	},

	updateProfileBasics: function(req, res) {
		// console.log("HERE IS REQ.BODY!", req.body);
		helpers.updateUserBasics(req.body)
			.then(function(user) {
				res.send();
			});
	}

};

