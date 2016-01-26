var usersHandler = require('./usersHandler.js');

module.exports = function(app) {
  app.get('/getAllUsers/:username', usersHandler.getAllUsers);
  app.get('/userProfile/:username', usersHandler.getUserProfileData);
  app.post('/profile', usersHandler.updateProfile);
};
