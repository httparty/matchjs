'use strict';

require('dotenv').load();
var nodemailer = require('nodemailer');

module.exports = function(mailOptions) {
  var transporter = nodemailer.createTransport(process.env.GMAIL_URL);

  return transporter.sendMail(mailOptions, function(error,info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
};