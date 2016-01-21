// var helpers = require('../db/helpers.js');
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
	}
};