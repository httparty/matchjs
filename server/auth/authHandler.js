var passport = require('passport');
var helpers = require('../db/helpers.js');

var setCookieProfile = function(userObj) {
  var profile = {
    id: userObj.id,
    username: userObj.username,
    displayName: userObj.displayName,
    email: userObj._json.email,
    avatar: userObj._json.avatar_url,
    location: userObj._json.location,
    github : userObj.profileUrl
  }
  return profile;
};

module.exports = {
  initialLogin: passport.authenticate('github'),

  redirect:  passport.authenticate('github', {failureRedirect: '/failure'}),

  success: function(req, res) {
  
    helpers.signInUser(req.user)
    .then(function(user) {

      //if user found, set cookie information
      if (user) {
        var cookie = setCookieProfile(req.user);
        res.cookie('user-profile', cookie, { maxAge: 2592000000 });  // Expires in one month
        res.redirect('/api/email/signupConfirm');
      } else {

        //if user not found and email is available
        if (req.user._json.email) {
          //add user to DB and set cookie profile
          helpers.addUser(req.user)
          .then(function(user) {

            var cookie = setCookieProfile(req.user);
            res.cookie('user-profile', cookie, { maxAge: 2592000000 });  // Expires in one month
            res.redirect('/api/email/signupConfirm');
          });

        } else {

          //if user not found and email is not available
          res.redirect('/#/auth');
        }
      }
    });
  },

  addEmail: function(req, res) {

    //set email and add user to database
    req.user._json.email = req.params.email;

    helpers.addUser(req.user)
    .then(function(user) {

      var cookie = setCookieProfile(req.user);
      res.cookie('user-profile', cookie, { maxAge: 2592000000 });  // Expires in one month
      res.redirect('/api/email/signupConfirm');
    });
  }
};