var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  //not sure if this callback url is necessary
  "http://127.0.0.1:5000/api/calendar/google/callback");

//in order to set credentials
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var callback = "http://127.0.0.1:5000/api/calendar/google/callback";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callback
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

  initialLogin: passport.authenticate('google', {scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar']}),

  redirect:  passport.authenticate('google'),

  success: function(req, res) {
    // Successful authentication with google, do something here
    console.log("THERE WAS SUCCESSFUL AUTHENTICATION");
    console.log("ACCESS", req.user.accessToken);
    console.log("REFRESH", req.user.refreshToken);

    // res.cookie('google-calendar', profile, { maxAge: 2592000000 });  // Expires in one month
    res.redirect('/');
  },

  //POST request that sends event to 
  //Google Calendar
  exportGoogleCalendar: function(req, res) {

    //current do not know how I'm going to set credentials
    oauth2Client.setCredentials({
      access_token: req.user.accessToken,
      refresh_token: req.user.refreshToken
    });

    var event = {
      'summary': "Meetup at my apt",
      'description': "Watch Borat",
      'start': {
        'dateTime': new Date(),
      },
      'end': {
        'dateTime': new Date(),
      }
    };

    //POST to google calendar
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

      res.json(event.htmlLink);
    });

    // res.send('Okay');
  } 

};  