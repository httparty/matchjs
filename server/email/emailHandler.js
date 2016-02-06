'use strict';

var mailer = require('../config/mailer.js');
var moment = require('moment');
var helpers = require('../db/helpers');

module.exports = {
  sentMessage: function(req, res) {

    var recipientUsername = req.body.username;

    helpers.getUserByUserName({username: req.body.username})
    .then(function(user){
      var mailOptions = {
        from: 'MatchJS <matchjsteam@gmail.com>',
        to: req.body.email,
        subject: 'New Message Received on MatchJS!',
        html: '<h3>Hello '+req.body.name+', </h3><br><br>'
        + 'You\'ve received a new message from '+req.cookies['user-profile'].displayName+'.'
        + '<br>' + '<p>' + req.body.message  + '</p>'
        + '<br>' + '<a href="http://matchjs.herokuapp.com/#/connect">Login</a> now to reply!'
      };

      if(user.wantChatEmails){
        mailer(mailOptions);
      }
      res.send('Mesage sent!');
    });
  },

  newPadawan: function(mentorData) {
    var mailOptions = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: mentorData.email,
      subject: 'You have a new follower on MatchJS!',
      html: 'Hello '+ mentorData.username +',<br><br>'
      + mentorData.padawan + ' is now following you on MatchJS! <a href="http://matchjs.herokuapp.com/#/profile/'+ mentorData.padawan +'">View their profile</a> and <a href="http://matchjs.herokuapp.com/#/invitations/'+ mentorData.padawan +'"> set up a mentorship session</a>.<br><br> Have a great Day!<br><br> - The MatchJS Team'
    };
    if(mentorData.wantFollowerEmails){
      mailer(mailOptions);
    }
    return;
  },

  inviteHasBeenUpdated: function(inviteData) {
    var mentorEmail = inviteData.mentorEmail;
    var menteeEmail = inviteData.menteeEmail;
    var mentorInvitationEmailPreferences = inviteData.mentorInvitationEmailPreferences;
    var menteeInvitationEmailPreferences = inviteData.menteeInvitationEmailPreferences;

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
    if(mentorInvitationEmailPreferences){
      mailer(mailOptionsMentor);
    }
    if(menteeInvitationEmailPreferences){
      mailer(mailOptionsMentee);
    }
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
    if(inviteData.mentorInvitationEmailPreferences){
      mailer(mailOptionsMentor);
    };
    if(inviteData.menteeInvitationEmailPreferences){
      mailer(mailOptionsMentee);
    };
    return;
  },

  invitationConfirm: function(inviteObj){

    var appointment = moment(inviteObj.sessionInfo.when);

    var mailOptionsMentor = {
      from: "MatchJS <matchjsteam@gmail.com>",
      to: inviteObj.mentorEmail,
      subject: "Your invitation has been sent!",
      html: "<h1>Your mentorship session has been scheduled!<h1><h3>Here are the details:</h3>" +
      "<h5>When:</h5>" + "<p>" + appointment.format("dddd MMMM Do, YYYY @ h:mmA") + "</p>"+
      "<h5>Where:</h5>" + "<p>" + inviteObj.sessionInfo.where + "</p>" +
      "<h5>Who:</h5>" + "<p>" + inviteObj.mentee + "</p>" +
      "<h5>Summary:</h5>" + "<p>" + inviteObj.sessionInfo.summary + "</p>" +
      "<h5>Link to Google Cal:</h5>" + "<p>" + "<a href='https://matchjs.herokuapp.com/api/calendar/export?summary=Mentorship meeting with " + inviteObj.mentee + "&description=" +  inviteObj.sessionInfo.summary  + "&start=" + appointment.format() + "&end=" + appointment.add(1, 'h').format() + "'>Submit request to export to Google Calendar Event</a>" + "</p>" +
      "<h2>Enjoy your meeting!</h2>"
    };

    var mailOptionsMentee = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      to: inviteObj.menteeEmail,
      subject: 'You have an invitation!',
      html: "<h1>You have an invitation from a mentor!<h1><h3>Here are the details:</h3>" +
      "<h5>When:</h5>" + "<p>" + appointment.format("dddd MMMM Do, YYYY @ h:mmA") + "</p>"+
      "<h5>Location:</h5>" + "<p>" + inviteObj.sessionInfo.where + "</p>" +
      "<h5>Who:</h5>" + "<p>" + inviteObj.mentor + "</p>" +
      "<h5>Summary:</h5>" + "<p>" + inviteObj.sessionInfo.summary + "</p>" +
      "<h5>Link to Google Cal:</h5>" + "<p>" + "<a href='https://matchjs.herokuapp.com/api/calendar/export?summary=Mentorship meeting with " + inviteObj.mentor + "&description=" +  inviteObj.sessionInfo.summary  + "&start=" + appointment.format() + "&end=" + appointment.add(1, 'h').format() + "'>Submit request to export to Google Calendar Event</a>" + "</p>" +
      "<h2>Enjoy your meeting!</h2>"
    };

    if(inviteObj.mentorEmailPreferences){
      mailer(mailOptionsMentor);
      console.log('Mentor Email Sent');
    };
    if(inviteObj.menteeEmailPreferences){
      mailer(mailOptionsMentee);
      console.log('Mentee Email Sent');
    };
    return;
  }
};