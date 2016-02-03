var db = require('./config.js');
var async = require('async');
var _ = require('underscore');

var seedUsers = function() {

  var skills = ['AngularJS', 'Express', 'JavaScript', 'Backbone', 'Node.js', 'ReactJS'];
  var locations = ['San Francisco', 'Boston', 'New York'];

  var array = _.range(1, 11);

  var randomUser = function() {
    var num = 1 + Math.floor(Math.random() * (11 - 1));
    return 'user' + num;
  };

  async.each(array, function(i, next) {
      var nextUser = 'user' + (i+1);
      db.User.create({
        username: 'user'+i,
        email: 'user'+i+'@email.com',
        name: 'user'+i,
        location: _.sample(locations, 1)[0],
        toLearn: _.sample(skills, 5),
        toTeach: _.sample(skills, 5)
      }).then(function() {
        console.log('User successfully created');
        db.Padawan.create({
          mentorUsername: 'user'+i,
          padawanUsername: 'user' + (i+1)
        }).then(function() {
          db.Padawan.create({
            mentorUsername: 'dearamerican',
            padawanUsername: 'user' + (i+1)
          }).then(function() {
            db.Padawan.create({
              mentorUsername: 'user' + (i+1),
              padawanUsername: 'dearamerican'
            }).then(function() {
              next();
            });
          });
        });
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
