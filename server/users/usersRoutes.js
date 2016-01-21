var usersHandler = require('./usersHandler.js');

module.exports = function(app) {
	app.get('/getAllUsers', usersHandler.getAllUsers);
	app.get('/userProfile/:username', usersHandler.getUserProfileData);
	app.post('/profileSkills', usersHandler.updateProfileSkills);
	app.post('/profileBasics', usersHandler.updateProfileBasics);
};
