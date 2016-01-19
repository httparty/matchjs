require('dotenv').load();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var GitHubStrategy = require('passport-github').Strategy;

var github_client_id = process.env.GITHUB_CLIENT_ID;
var github_client_secret = process.env.GITHUB_CLIENT_SECRET;

module.exports.restrict = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
  	}
    res.redirect('/failure');
};

module.exports.initialize = function(app) {
	app.use(cookieParser());

	app.use(session({
	    secret: 'SECRET',
	    resave: false,
	    saveUninitialized: true,
	    cookie: {
	      httpOnly: false,
	      maxAge: 3600000 //1 Hour
	    }
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	var callback = process.env.CALLBACK || "http://localhost:5000/auth/github/callback";

	passport.use(new GitHubStrategy({
	      clientID: github_client_id,
	      clientSecret: github_client_secret,
	      callbackURL: callback
	},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {
				return done(null, profile);
		});
	}
	)); 
};