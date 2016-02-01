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

  newPadawan: function(mentorData) {
    var mailOptions = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: mentorData.email,
      subject: 'You have a new follower on MatchJS!',
      html: 'Hello '+ mentorData.username +',<br><br>'
      + mentorData.padawan + ' is now following you on MatchJS! <a href="http://matchjs.herokuapp.com/#/profile/'+ mentorData.padawan +'">View their profile</a> and <a href="http://matchjs.herokuapp.com/#/invitations/'+ mentorData.padawan +'"> set up a mentorship session</a>.<br><br> Have a great Day!<br><br> - The MatchJS Team'
    };
    mailer(mailOptions);
    return;
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