'use strict';

var calendarHandler = require('./calendarHandler.js');

module.exports = function(app) {
  app.get('/export', calendarHandler.exportGoogleCalendar);
  app.get('/auth/google', calendarHandler.initialAuthorization);
  app.get('/auth/google/callback', calendarHandler.redirect, calendarHandler.success);
};