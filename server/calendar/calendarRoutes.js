var calendarHandler = require('./calendarHandler.js');

module.exports = function(app) {
  app.get('/export', calendarHandler.exportGoogleCalendar);
  //handle google auth for exporting to google calendar
  app.get('/google', calendarHandler.initialLogin);
  app.get('/google/callback', calendarHandler.redirect, calendarHandler.success);
};