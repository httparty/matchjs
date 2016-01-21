var usersHandler = require('./usersHandler.js');

module.exports = function(app) {
	app.get('/getAllUsers', usersHandler.getAllUsers);
};