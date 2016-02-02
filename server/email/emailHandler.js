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
    mailer(mailOptions);
    res.redirect('/#/connect');
  },

  sentMessage: function(req,res) {
    // console.log(req.cookies['user-profile'].username, ':', req.body);
    var mailOptions = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: req.body.email,
      subject: 'New Message Received on MatchJS!',
      html: 'Hello '+req.body.name+',<br><br>'
      +'You\'ve received a new message from '+req.cookies['user-profile'].displayName+'.'
      +'<br><br>'+'<a href="http://matchjs.herokuapp.com/#/connect">Login</a> now to read it!'
    };
    mailer(mailOptions);
    res.send('Mesage sent!');
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
    var mentorEmail = inviteData.mentorEmail;
    var menteeEmail = inviteData.menteeEmail;

    var mailOptionsMentor = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: mentorEmail,
      subject: 'Your upcoming mentorship session has been updated.',
      html: 'Hello,<br><br>'+
      'You\'ve recently updated the details of your mentorship session with ' + inviteData.recipientName + '. Your new meeting details are as follows: <br><br>' + 'Time & Date: ' + inviteData.when + '<br> Location: ' + inviteData.location + '<br><br> If you need to send a message directly to your mentee, log in to MatchJS.<br><br>Have a great mentorship session!<br><br> - The MatchJS Team'
    };
    var mailOptionsMentee = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: menteeEmail,
      subject: 'Please note: Your upcoming mentorship session has been modified.',
      html: 'Hello,<br><br>'+
      'Your mentorship session with ' + inviteData.senderName + ' has been updated. Your new meeting details are as follows: <br><br>' + 'Time & Date: ' + inviteData.when + '<br> Location: ' + inviteData.location + '<br><br> If you need to send a message to your mentor directly, log in to MatchJS.<br><br>Have a great mentorship session!<br><br> - The MatchJS Team'
    };
    mailer(mailOptionsMentor);
    mailer(mailOptionsMentee);
    return;
  },

  inviteHasBeenDeclined: function(inviteData) {
    var mentorEmail = inviteData.mentor.email;
    var menteeEmail = inviteData.mentee.email;

    var mailOptionsMentor = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: mentorEmail,
      subject: 'Your upcoming mentorship session has been cancelled.',
      html: 'Hello ' + inviteData.mentor.name + ',<br><br>'+
      'You\'ve recently cancelled your mentorship session with ' + inviteData.mentee.name + ' on ' + inviteData.when + ' at ' + inviteData.location + '.<br><br> To reschedule your mentorship meeting or to send a message directly to your mentee, log in to MatchJS.<br><br>Thanks for being a member of the MatchJS community!<br><br> - The MatchJS Team'
    };
    var mailOptionsMentee = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: menteeEmail,
      subject: 'Please note: Your upcoming mentorship session has been cancelled.',
      html: 'Hello ' + inviteData.mentee.name + ',<br><br>'+
      'Your mentorship session on ' + inviteData.when + ' at ' + inviteData.location + ' with '+ inviteData.mentor.name + ' has been cancelled.<br><br>To send a message to your mentor or find another mentor to pair with, log in to MatchJS.<br><br>Thanks for being a member of the MatchJS community!<br><br> - The MatchJS Team'
    };
    mailer(mailOptionsMentor);
    mailer(mailOptionsMentee);
    return;
  },

  dayOfMeetingReminder: function(inviteData) {

  },

  receivedNewMessage: function(data) {

  }
};