var mailer = require('../config/mailer.js');

module.exports = {
  signupConfirm: function(req,res) {
    var mailOptions = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: req.cookies['user-profile'].email,
      subject: 'Hello from MatchJS!',
      // text: 'Hello World!',
      html: 'Hello '+req.cookies['user-profile'].displayName+',<br><br>'
      +'Welcome to <b>MatchJS</b>!<br> Your username is: '
      +req.cookies['user-profile'].username+'.<br><br>'+'<a href="http://matchjs.herokuapp.com/#/connect">Login</a> now to meet your future Mentor or Mentee!'
    };
    // res.send(console.log(req.cookies['user-profile']));
    // res.send(mailer(mailOptions));
    mailer(mailOptions);
    res.redirect('/#/connect');
  },

  sentMessage: function(req,res) {
    console.log(req.cookies['user-profile'].username, ':', req.params);
    res.send('Success@');
  },

  newPadawan: function(userData) {

  },

  newInvitation: function(inviteData) {

  },

  inviteHasBeenUpdated: function(inviteData) {

  },

  inviteHasBeenDeclined: function(inviteData) {

  },

  dayOfMeetingReminder: function(inviteData) {

  },

  receivedNewMessage: function(data) {

  }
};