var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_CALLBACK);

/*************************************************************
Upon requesting to export to Google calendar,
user is authenticated with Passport Google strategy
to attain OAuth2 credentials
**************************************************************/

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      var user = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile
      };        
      return done(null, user);
    });
  }
));

module.exports = {

  initialAuthorization: passport.authenticate('google', {scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']}),

  redirect:  passport.authenticate('google'),

  success: function(req, res) {
    //complete event export upon
    //successful authorization
    res.redirect('/api/calendar/export');
  },

  exportGoogleCalendar: function(req, res) {

    //check to see if authorized with Google
    //if not authorized, go to authorization route
    //and set event info in session
    if (!req.user || !req.user.accessToken) {

      var mentorshipEvent = {
        summary: req.query.summary,
        description: req.query.description,
        start: req.query.start,
        end: req.query.end
      };

      req.session.mentorshipEvent = mentorshipEvent;
      res.redirect('/api/calendar/auth/google');

    //if user is authorized with Google
    } else {

      oauth2Client.setCredentials({
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken
      });

      //Set up Calendar event
      var summary = req.query.summary || req.session.mentorshipEvent.summary;
      var description = req.query.description || req.session.mentorshipEvent.description;
      var start = req.query.start || req.session.mentorshipEvent.start;
      var end = req.query.end || req.session.mentorshipEvent.end;

      var event = {
        'summary': summary,
        'description': description,
        'start': {
          'dateTime': start,
        },
        'end': {
          'dateTime': end,
        }
      };

      var calendar = google.calendar('v3');

      calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Google Calendar service: ' + err);
          return;
        }
        
        //redirect to newly exported event
        res.redirect(event.htmlLink);
      });
    }
  } 
};  