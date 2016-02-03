var usersHandler = require('./usersHandler.js');

module.exports = function(app) {
  app.get('/getAllUsersRec/:username', usersHandler.getAllUsersRec);
  app.get('/getAllUsers', usersHandler.getAllUsers);
  app.get('/userProfile/:username', usersHandler.getUserProfileData);
  app.get('/location/:cityname', usersHandler.getUsersByLocation);
  app.get('/search', usersHandler.getUsersByQuery);
  app.post('/profile', usersHandler.updateProfile);
  app.post('/addPadawan/:username', usersHandler.addPadawan);
  app.get('/getPadawans/:username', usersHandler.getPadawans);
  app.delete('/padawan/:mentor/:padawan', usersHandler.deletePadawan);
  app.delete('/settings/deleteAccount/:username', usersHandler.deleteAccount);
  // app.get('/settings', usersHandler.getUserPreferences);
  app.post('/settings', usersHandler.saveUserPreferences);
  app.get('/getMentors/:username', usersHandler.getMentors);
};
