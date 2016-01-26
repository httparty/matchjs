var db = require('./config.js');
var async = require('async');
var _ = require('underscore');

var seedDatabase = function() {

  var array = [1,2,3,4,5,6,7,8,9,10];

  async.each(array, function(i, next) {
    
      //query right here
      db.User.create({
        username: 'user'+i,
        password: 'password'+i,
        email: 'user'+i+'@email.com',
        name: 'user'+i,
        karmaPoints: Math.floor(Math.random() * 6)
        // toLearn: [],
        // toTeach: []
      }).then(function() {
        console.log('User successfully created');
        next();
      });

  }, function(err) {
    if (err) {
      console.log('An item failed to process');

    } else {
      console.log('successfully went through all of them');
    }
  });
};

//seedDatabase();