var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  //not sure if this callback url is necessary
  "http://127.0.0.1:5000/auth/google/callback");

module.exports = {

  //POST request that sends event to 
  //Google Calendar
  exportGoogleCalendar: function(req, res) {

    //current do not know how I'm going to set credentials
    // oauth2Client.setCredentials({
    //   access_token: req.user.accessToken,
    //   refresh_token: req.user.refreshToken
    // });

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
    // var calendar = google.calendar('v3');

    // calendar.events.insert({
    //   auth: oauth2Client,
    //   calendarId: 'primary',
    //   resource: event,
    // }, function(err, event) {
    //   if (err) {
    //     console.log('There was an error contacting the Calendar service: ' + err);
    //     return;
    //   }

    //   var email = req.user.profile.emails[0].value;

    //   mailer.sendMail(email, event.htmlLink);

    //   res.json(event.htmlLink);
    // });

    res.send('Okay');
  } 

};  