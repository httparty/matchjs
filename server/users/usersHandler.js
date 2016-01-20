var User = require('./models/users.js');
var helpers = require('./db/helpers');

module.exports = {
	getAllUsers: function() {
		return helpers.getAllUsers();
	}
};