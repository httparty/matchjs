var helpers = require('../db/helpers.js');
var db = require('../db/config.js');

module.exports = {
	getAllUsers: function(req,res) {
		return db.User.findAll()
		.then(function(usersArray) {
			console.log('HERE ARE ALL USERS', usersArray);
			// return usersArray;
			res.send(usersArray);
		});
	},

	getUserProfileData: function(req, res) {
		// console.log('inside getUserProfileData');
		// console.log("HERES PARAMS FROM GETPROFILE FN in userhandler", req.params);
		helpers.getUserByUserName(req.params)
			.then(function(user) {
				console.log("HERE IS USER AFTER GETTING DATA", user);
				res.send(user);
			});
	},

	updateProfileBasics: function(req, res) {
		// console.log("HERE IS REQ.BODY!", req.body);
		helpers.updateUserBasics(req.body)
			.then(function(user) {
				res.send(user);
			});
	}

};

