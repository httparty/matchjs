require('dotenv').load();
var nodemailer = require('nodemailer');

module.exports = function() {
  var transporter = nodemailer.createTransport(process.env.GMAIL_URL);
  var mailOptions = {
    from: 'MatchJS <matchjsteam@gmail.com>',
    to: 'anthonybibbs@gmail.com',
    subject: 'Hi there!',
    text: 'Hello World!',
    html: '<b>Hello World 2.0</b>'
  };
  return transporter.sendMail(mailOptions, function(error,info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
};