var passport = require('passport');
var helpers = require('../db/helpers.js');

module.exports = {
  initialLogin: passport.authenticate('github'),
  redirect:  passport.authenticate('github', {failureRedirect: '/failure'}),
  // if user doesn't exist, create
  // if user exists, save them in the db

  success: function(req, res) {
  
  console.log("USER PROFILE", req.user);

  // return user if found
  //in database
  helpers.signupUser(req.user)
  .then(function(user) {

    //if user found, set cookie information
    if (user) {

    //set cookie information
    var profile = {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName,
      email: req.user._json.email,
      avatar: req.user._json.avatar_url,
      location: req.user._json.location,
      github : req.user.profileUrl
    };
    res.cookie('user-profile', profile, { maxAge: 2592000000 });  // Expires in one month
    // Successful authentication, redirect home.
    // res.redirect('/#/connect');
    res.redirect('/api/email/signupConfirm');
    });
      
    } else {
      //if user not found and email is available


      //if user not found and email is not available
      //send to auth/getemail route

      
    }
  }
};