var passport = require('passport');

module.exports = {
	initialLogin: passport.authenticate('github'),
	redirect:  passport.authenticate('github', {failureRedirect: '/failure'}),

	success: function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
};