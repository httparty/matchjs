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
    // console.log(req.cookies['user-profile'].username, ':', req.body);
    var mailOptions = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: req.body.email,
      subject: 'New Message Received on MatchJS!',
      // text: 'Hello World!',
      html: 'Hello '+req.body.name+',<br><br>'
      +'You\'ve received a new message from '+req.cookies['user-profile'].displayName+'.'
      +'<br><br>'+'<a href="http://matchjs.herokuapp.com/#/connect">Login</a> now to read it!'
    };
    mailer(mailOptions);
    res.send('Mesage sent!');
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