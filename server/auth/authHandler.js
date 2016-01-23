var passport = require('passport');
var helpers = require('../db/helpers.js');

module.exports = {
	initialLogin: passport.authenticate('github'),
	redirect:  passport.authenticate('github', {failureRedirect: '/failure'}),
	// if user doesn't exist, create
	// if user exists, save them in the db

	success: function(req, res) {
	// add user to database
		console.log('here is req.body before it goes into the helper', req.user);
		helpers.addUserToDb(req.user)
			.then(function(user) {
			console.log('HERE IS REQ USER IN AUTH! AFTER HELPER SUCCES', user);
		
			var profile = {
				id: req.user.id,
				username: req.user.username,
				displayName: req.user.displayName,
				avatar: req.user._json.avatar_url,
				location: req.user._json.location,
				github : req.user.profileUrl
			};
			res.cookie('user-profile', profile, { maxAge: 2592000000 });  // Expires in one month
			// Successful authentication, redirect home.
			res.redirect('/#/connect');
		});
	}
};