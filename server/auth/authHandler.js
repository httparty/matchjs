var passport = require('passport');

module.exports = {
	initialLogin: passport.authenticate('github'),
	redirect:  passport.authenticate('github', {failureRedirect: '/failure'}),

	success: function(req, res) {

    var profile = {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName,
      avatar: req.user._json.avatar_url,
      location: req.user._json.location
    };

    res.cookie('user-profile', profile, { maxAge: 2592000000 });  // Expires in one month

    // Successful authentication, redirect home.
    res.redirect('/');
  }
};