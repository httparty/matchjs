var usersHandler = require('./usersHandler.js');

module.exports = function(app) {
  app.get('/getAllUsersRec/:username', usersHandler.getAllUsersRec);
  app.get('/getAllUsers', usersHandler.getAllUsers);
  app.get('/userProfile/:username', usersHandler.getUserProfileData);
  app.post('/profile', usersHandler.updateProfile);
};
