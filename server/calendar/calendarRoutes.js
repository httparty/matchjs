var calendarHandler = require('./calendarHandler.js');

module.exports = function(app) {
  app.get('/export', calendarHandler.exportGoogleCalendar);
};