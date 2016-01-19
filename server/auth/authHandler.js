var passport = require('passport');

module.exports = {
	initialLogin: passport.authenticate('github'),
	redirect:  passport.authenticate('github'),

	success: function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
};