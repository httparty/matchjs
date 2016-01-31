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

  invitationConfirm: function(req, res){
    var mailOptions1 = {
      from: 'MatchJS <matchjsteam@gmail.com>',
      // to: req.body.mentorEmail,
      to: 'sergeypiterman@gmail.com',
      subject: 'You have an invitation!',
      html: '<h1>Hello World!<h1>'
    };

    // var mailOptions2 = {
    //   from: 'MatchJS <matchjsteam@gmail.com>',
    //   to: req.body.menteeEmail,
    //   subject: 'You have an invitation!',
    //   html: '<h1>Hello World!<h1>'
    // };

    mailer(mailOptions1);
    // mailer(mailOptions2);

  }
};
