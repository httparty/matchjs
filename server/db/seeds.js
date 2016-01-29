var db = require('./config.js');
var async = require('async');
var _ = require('underscore');

var seedUsers = function() {

  var skills = ['Angular','HTML', 'MongoDB', 
                'Grunt', 'PostgreSQL', 'Express', 
                'Node', 'React', 'Backbone',
                'Ember', 'Neo4j', 'AWS', 'Redis'];

  var locations = ['San Francisco', 'Boston', 'New York'];

  var array = _.range(1, 11);

  async.each(array, function(i, next) {
        
      db.User.create({
        username: 'user'+i,
        password: 'password'+i,
        email: 'user'+i+'@email.com',
        name: 'user'+i,
        location: _.sample(locations, 1)[0],
        karmaPoints: Math.floor(Math.random() * 6),
        toLearn: _.sample(skills, 5),
        toTeach: _.sample(skills, 5)
      }).then(function() {
        console.log('User successfully created');
        next();
      });

  }, function(err) {
    if (err) {
      console.log('An item failed to process');

    } else {
      console.log('successfully seeded all users');
    }
  });
};

var seedInvitations = function() {

};

// seedUsers();